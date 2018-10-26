const moment = require('moment');
const _ = require('lodash');
const Actor = require('../../models/Actor');
const Event = require('../../models/Event');

const getStreakInfo = (allEvents) => {
  const streakInfo = {};
  allEvents.forEach((event) => {
    const { actorId, created_at } = event;
    if (streakInfo[actorId]) {
      //
      const actorStreak = streakInfo[actorId];
      const lastEvent = moment(actorStreak.lastEvent, 'YYYY-MM-DD');
      const currentEvent = moment(created_at, 'YYYY-MM-DD');
      const daysDifference = lastEvent.diff(currentEvent, 'days');
      if (daysDifference === 1) {
        // increment streak
        actorStreak.currentStreak += 1;
        if (actorStreak.currentStreak > actorStreak.highestStreak) {
          actorStreak.highestStreak = actorStreak.currentStreak;
          // actorStreak.hightestStreak += 1; // thoughts?
        } else {
          // do nothing
        }
      } else if (daysDifference > 1) {
        // reset streak
        actorStreak.currentStreak = 0;
      } else {
        // do nothing
      }
      actorStreak.lastEvent = created_at;
    } else {
      streakInfo[actorId] = {
        currentStreak: 0,
        highestStreak: 0,
        lastEvent: created_at,
        login: event.actor.login,
      };
    }
    // latestEvent will be lastEvent
  });
  return streakInfo;
};

const getStreakInfoArray = streakInfo => Object.keys(streakInfo).map(actorId => ({
  actorId,
  highestStreak: streakInfo[actorId].highestStreak,
  lastEvent: streakInfo[actorId].lastEvent,
  login: streakInfo[actorId].login,
}));

const getActorsIdByStreak = sortedStreakInfo => sortedStreakInfo.map(info => Number(info.actorId));

const getStreak = async (req, res) => {
  const allEvents = await Event.findAll({
    include: [Actor],
    order: [
      ['actorId'],
      ['created_at', 'DESC'],
    ],
  });
  const streakInfo = getStreakInfo(allEvents);
  const streakInfoArray = getStreakInfoArray(streakInfo);
  const sortedStreakInfo = _.orderBy(
    streakInfoArray,
    ['highestStreak', 'lastEvent', 'login'],
    ['desc', 'desc', 'asc'],
  );
  const actorsIdByStreak = getActorsIdByStreak(sortedStreakInfo);
  const actorsInOrder = await Promise.all(actorsIdByStreak.map(actorId => Actor.findOne({
    where: {
      id: actorId,
    },
    attributes: {
      include: ['id', 'login', 'avatar_url'],
      exclude: ['createdAt', 'updatedAt'],
    },
  })));
  return res.status(200).send(actorsInOrder);
};

module.exports = getStreak;
