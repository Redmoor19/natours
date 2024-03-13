const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchhema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can't be empty"],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to the tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Reivew must belong to the user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchhema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

reviewSchhema.statics.calcAverageRaitings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nrRaitings: { $sum: 1 },
        avgRaiting: { $avg: '$rating' },
      },
    },
  ]);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nrRaitings,
      ratingsAverage: stats[0].avgRaiting,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

reviewSchhema.index({ tour: 1, user: 1 }, { unique: true });

reviewSchhema.post('save', function () {
  this.constructor.calcAverageRaitings(this.tour);
});

reviewSchhema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.clone().findOne();
  next();
});

reviewSchhema.post(/^findOneAnd/, async function () {
  await this.r.constructor.calcAverageRaitings(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchhema);
module.exports = Review;
