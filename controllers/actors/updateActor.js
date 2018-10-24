const Actor = require('../../models/Actor');

const updateActor = async (req, res) => {
  const { avatar_url, id, login } = req.body;
  const actorInDB = await Actor.findByPk(id);
  if (!actorInDB) {
    return res.status(404).send({});
  }
  if (login !== actorInDB.login) {
    return res.status(400).send({});
  }
  await Actor.update({
    avatar_url,
  }, {
    where: {
      id,
    },
  });
  return res.status(200).send({});
};

module.exports = updateActor;
