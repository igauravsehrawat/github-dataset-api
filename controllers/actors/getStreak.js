import { create } from 'domain';

const moment = require('moment');
const _ = require('lodash');
const Actor = require('../../models/Actor');
const Event = require('../../models/Event');

const getStreakInfo = (allEvents) => {
  const streakInfo = {};
  /**
   * actorId: {
   *  streak: 0,
   *  latestEvent: '',
   *  lastEvent: '',
   * }
   */
  allEvents.forEach((event) => {
    const { actorId, created_at } = event;
    if (streakInfo[actorId]) {
      //
      const actorStreak = streakInfo[actorId];
      const lastEvent = moment(actorStreak.lastEvent);
      const thisEvent = moment(created_at);
      const daysDifference = thisEvent.diff(lastEvent, 'days');
      if (daysDifference === 1) {
        // increment streak
        actorStreak.currentStreak += 1;
        if (actorStreak.currentStreak > actorStreak.highestStreak) {
          actorStreak.highestStreak = actorStreak.currentStreak;
          // actorStreak.hightestStreak += 1; // thoughts?
        }
      } else {
        // reset streak
        actorStreak.currentStreak = 0;
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
  lastEvent: streakInfo.lastEvent,
  // actor login
}));

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
  const actorsStreak = _.orderBy(
    streakInfoArray,
    ['highestStreak', 'lastEvent', 'login'],
    ['desc', 'desc', 'asc'],
  );
  const actors = await Actor.findAll({
    where: {
      actorsStreak,
    },
  });
  return res.status(200).send(actors);
};

module.exports = getStreak;
