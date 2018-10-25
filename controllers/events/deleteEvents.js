const Event = require('../../models/Event');

const deleteEvents = async (req, res) => {
  await Event.destroy({
    where: {},
    // i think truncate would be fine?
    // removes the memory allocation
    truncate: true,
  });
  return res.status(200).send({});
};

module.exports = deleteEvents;
