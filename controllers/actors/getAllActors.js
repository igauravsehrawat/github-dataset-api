const Sequelize = require('sequelize');
const Actor = require('../../models/Actor');
const Event = require('../../models/Event');

const getAllActors = async (req, res) => {
  const actors = await Actor.findAll({
    attributes: {
      include: [
        'id',
        'login',
        'avatar_url',
        [Sequelize.fn('COUNT', Sequelize.col('events.actorId')), 'eventCount'],
        [Sequelize.fn('max', Sequelize.col('events.created_at')), 'latestEvent'],
      ],
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [{
      model: Event, attributes: [],
    }],
    group: ['events.actorId'],
    order: [
      [Sequelize.literal('eventCount'), 'DESC'],
      [Sequelize.literal('latestEvent'), 'DESC'],
      ['login', 'DESC'],
    ],
  });
  const modifiedActors = actors.map(actor => ({
    id: actor.id,
    login: actor.login,
    avatar_url: actor.avatar_url,
  }));
  return res.status(200).send(modifiedActors);
};

module.exports = getAllActors;
