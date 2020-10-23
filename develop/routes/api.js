const router = require("express").Router();

const Workout = require("../models/workout.js");

router.get("/api/workouts", (req, res) => {
  Workout.find()
  .then(results => {
    res.json(results);
  })
  .catch(err => {
    res.json(err);
  });
});

router.post("api/workouts", ({ body }, res) => {
  Workout.create(body)
  .then(({ _id }) => Workout.findOneAndUpdate({}, { $push: { exercises: _id } }, { new: true }))
  .then(results => {
    res.json(results);
  })
  .catch(err => {
    res.json(err);
  });
});


router.put("api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(params.id, {$push: { exercises: _id } }, { new: true })
  .then(results => {
    res.json(results);
  })
  .catch(err => {
    res.json(err);
  });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(7)
  .sort({ day: -1 })
  .then(results => {
    res.json(results);
  })
  .catch(err => {
    res.json(err);
  });
});

router.delete("/api/workouts", ({ body }, res) => {
  Workout.findByIdAndDelete(body)
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
