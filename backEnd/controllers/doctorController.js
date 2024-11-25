import { retrieveAllDoctors } from "../databases/doctorDatabse.js";
import { AppError, catchAsyncError } from "../utilities.js";

const getAllDoctors = catchAsyncError(async (req, res, next) => {
  let fields;
  console.log(req.query);
  if (req.query.fields) {
    fields = req.query.fields.split(",");
  }
  delete req.query.fields;
  const filters = Object.entries(req.query).map((el) => {
    if (el[0] === "userId") return `${el[0]} = ${Number(el[1])}`;
    return `${el[0]}='${el[1]}'`;
  });
  console.log(filters);
  const doctors = await retrieveAllDoctors(fields, filters);
  res.status(200).json({
    status: "succes",
    ok: true,
    data: { doctors },
  });
});

export { getAllDoctors };
