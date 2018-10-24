const Event = require('../../models/Event');
const Actor = require('../../models/Actor');
const Repo = require('../../models/Repo');

const getAllEvents = async (req, res) => {
  const events = await Event.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'actorId', 'repoId'],
    },
    include: [
      {
        model: Actor,
        attributes: ['id', 'login', 'avatar_url'],
      },
      {
        model: Repo,
        attributes: ['id', 'name', 'url'],
      },
    ],
  });
  return res.status(200).send(events);
};

module.exports = getAllEvents;
