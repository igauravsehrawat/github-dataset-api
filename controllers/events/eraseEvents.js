const Event = require('../../models/Event');

const eraseEvents = async (req, res) => {
  await Event.destroy({
    where: {},
    truncate: true,
  });
  return res.status(200).send({});
};

module.exports = eraseEvents;
