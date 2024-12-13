import { createReview, updateReview } from "../databases/reviewDatabase.js";
import { AppError, catchAsyncError } from "../utilities.js";

const makeReview = catchAsyncError(async (req, res, next) => {
  let { rate, review, waitingTime } = req.body;
  const doctorId = req.params.id;
  const { user } = req;
  if (!rate || !waitingTime) {
    return next(new AppError("Missing data", 400));
  }
  review = review ? review : "";
  // waitingTime = waitingTime ? waitingTime : null;
  let attributes = [
    doctorId,
    user.userid,
    rate,
    review,
    waitingTime,
    Date.now(),
  ];
  const reviewRes = await createReview(attributes);
  if (reviewRes.status === "fail" || reviewRes.severity === "ERROR") {
    return next(new AppError(reviewRes.message || "something went wrong"));
  }
  res.status(200).json({
    status: "successful",
    data: {
      reviewRes,
    },
  });
});

const editReview = catchAsyncError(async (req, res, next) => {
  let { rate, review, waitingTime } = req.body;
  const { user } = req;
  const doctorId = req.params.id;

  let toBeEdited = {};
  toBeEdited.rate = rate;
  toBeEdited.review = review;
  toBeEdited.waitingTime = waitingTime;

  if (!Object.values(toBeEdited).filter((v) => v).length)
    return next(new AppError("Specify at least one attribute to update"));

  const updatedReview = await updateReview(toBeEdited, doctorId, user.userid);
  if (updatedReview.status === "fail" || updatedReview.severity === "ERROR") {
    return next(new AppError(updatedReview.message || "something went wrong"));
  }
  res.status(200).json({
    status: "successful",
    data: {
      updatedReview,
    },
  });
});
export { makeReview, editReview };
