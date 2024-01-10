const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const simpleTours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    results: simpleTours.length,
    data: {
      tours: simpleTours,
    },
  });
}

function getTour(req, res) {
  const reqId = Number(req.params.id);
  const tour = simpleTours.find((item) => item.id === reqId);
  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
}

function createTour(req, res) {
  const nexId = simpleTours[simpleTours.length - 1].id + 1;
  const newTour = {
    id: nexId,
    ...req.body,
  };

  simpleTours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(simpleTours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
}

function updateTour(req, res) {}
function deleteTour(req, res) {}

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

//////////////////////////

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
