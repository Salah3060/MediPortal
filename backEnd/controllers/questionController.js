import {
  AppError,
  catchAsyncError,
  filterQueryHandler,
  fieldsQueryHandler,
  orderQueryHandler,
  formatString,
} from "../utilities.js";
import {
  retrieveAllQuestions,
  createQuestion,
  answerQuestionDb,
} from "../databases/questionDatabase.js";
import validator from "validator";

const validAttributes = ["questionId", "patientId", "speciality", "doctorId"];

const getAllQuestion = catchAsyncError(async (req, res, next) => {
  let fields;
  if (req.query.fields) {
    fields = fieldsQueryHandler(req.query, validAttributes);
    if (!fields) return next(new AppError("Invalid query atrributes", 400));
    if (fields.length == 0) fields = undefined;
  }
  delete req.query.fields;

  let orders;

  if (req.query.order) {
    orders = orderQueryHandler(req.query, validAttributes);
    console.log(orders);
    if (!orders) return next(new AppError("Invalid query atrributes", 400));
    if (orders.length == 0) orders = undefined;
  }
  delete req.query.order;

  let limit = req.query.limit || 50;
  let page = req.query.page || 1;

  delete req.query.limit;
  delete req.query.page;

  let filters;
  if (req.query) {
    filters = filterQueryHandler(req.query, validAttributes);
    if (!filters) return next(new AppError("Invalid query atrributes", 400));
    if (filters.length == 0) filters = undefined;
  }

  const Question = await retrieveAllQuestions(
    fields,
    filters,
    orders,
    limit,
    page
  );
  res.status(200).json({
    status: "succes",
    ok: true,
    data: { Question },
  });
});

const askQuestion = catchAsyncError(async (req, res, next) => {
  try {
    let { speciality, question, gender, age } = req.body;
    const { user } = req;
    if (!speciality || !question || !gender || !age) {
      return next(new AppError("Missing data", 400));
    }
    if (!user) {
      return next(new AppError("Please login to proceed", 401));
    }
    speciality = formatString(speciality);
    gender = formatString(gender);
    if (!validator.isNumeric(age)) {
      return next(new AppError("The age must be a number", 400));
    }
    let attributes = [
      user.userid,
      speciality,
      question,
      Date.now(),
      age,
      gender,
    ];
    const questionRes = await createQuestion(attributes);
    if (questionRes.serverity === "ERROR")
      return next(new AppError("Something went wrong", 400));
    res.status(200).json({
      status: "successful",
      data: {
        questionRes,
      },
    });
  } catch (error) {
    console.log(error);
  }
});
const answerQuestion = catchAsyncError(async (req, res, next) => {
  const { answer } = req.body;
  const { user } = req;
  const questionId = req.params.id;
  if (!answer) {
    return next(new AppError("Missing data", 400));
  }
  if (!user) {
    return next(new AppError("Please login to proceed", 401));
  }
  let attributes = [answer, Date.now(), questionId, user.userid];
  const answerRes = await answerQuestionDb(attributes);
  if (answerRes.severity === "ERROR") {
    return next(new AppError("Something went wrong", 400));
  }
  res.status(200).json({
    status: "successful",
    data: {
      answerRes,
    },
  });
});

export { getAllQuestion, askQuestion, answerQuestion };
