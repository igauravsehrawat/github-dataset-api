const Event = require('../../models/Event');
const Actor = require('../../models/Actor');
const Repo = require('../../models/Repo');

const createEvent = async (event) => {
  const {
    id, type, actor, repo, created_at,
  } = event;
  await Event.create({
    id,
    type,
    created_at,
    actorId: actor.id,
    repoId: repo.id,
  });
};

const createActor = async (actor) => {
  const { id, login, avatar_url } = actor;
  await Actor.create({
    id,
    login,
    avatar_url,
  });
};

const createRepo = async (repo) => {
  const { id, name, url } = repo;
  await Repo.create({
    id,
    name,
    url,
  });
};

const addEvent = async (req, res, next) => {
  // basic same id check, if present return 400
  // else insert
  const {
    id, actor, repo,
  } = req.body;
  const eventInDB = await Event.findById(id);
  if (eventInDB) {
    return res.status(400).send({});
  }
  // check this event
  await createActor(actor);
  await createRepo(repo);
  await createEvent(req.body);
  return res.status(201).send({});
};

module.exports = addEvent;
