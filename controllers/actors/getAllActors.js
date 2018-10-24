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
      ],
      exclude: ['createdAt', 'updatedAt'],
    },
  });
  return res.status(200).send(actors);
};

module.exports = getAllActors;
