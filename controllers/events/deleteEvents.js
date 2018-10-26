const Event = require('../../models/Event');
const Actor = require('../../models/Actor');
const Repo = require('../../models/Repo');

const deleteEvents = async (req, res) => {
  // await Event.destroy({
  //   where: {},
  //   // i think truncate would be fine?
  //   // removes the memory allocation
  //   truncate: true,
  // });
  await Promise.all([
    Event.destroy({
      where: {},
      truncate: true,
    }),
    Actor.destroy({
      where: {},
      truncate: true,
    }),
    Repo.destroy({
      where: {},
      truncate: true,
    }),
  ]);

  return res.status(200).send({});
};

module.exports = deleteEvents;
