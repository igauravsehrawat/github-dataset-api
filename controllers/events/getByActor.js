const Event = require('../../models/Event');
const Actor = require('../../models/Actor');
const Repo = require('../../models/Repo');


const getByActor = async (req, res) => {
  // 404 if actor does not exist
  // return all the events
  const { id } = req.params;
  const events = await Event.findAll({
    where: {
      actorId: id,
    },
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
    order: [['id']],
  });
  return res.status(200).send(events);
};

module.exports = getByActor;
