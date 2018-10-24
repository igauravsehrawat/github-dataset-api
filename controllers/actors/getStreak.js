const Actor = require('../../models/Actor');

const getStreak = async (req, res) => {
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

module.exports = getStreak;
