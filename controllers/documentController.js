const catchAsync = require("../middlewares/async");
const Document = require("../models/Document");
const ApiErrors = require("../utils/ApiError");

exports.createDocument = catchAsync(async (req, res) => {
  const { title, details, day, username, category, image } = req.body;
  const document = await Document.create({
    title,
    details,
    username,
    day,
    category,
    image,
  });
  res.status(201).json({
    success: true,
    data: document,
  });
});

exports.getDocumentByID = catchAsync(async (req, res) => {
  const { id } = req.params;
  const document = await Document.findById(id);
  if (!document) {
    throw new ApiErrors(404, "Not Found");
  }
  res.json({
    success: true,
    data: document,
  });
});

exports.getAllDocument = catchAsync(async (req, res) => {
  const document = await Document.find();
  if (!document) {
    throw new ApiErrors(404, "Not Found");
  }
  res.json({
    success: true,
    data: document,
  });
});

exports.deleteDocument = catchAsync(async (req, res) => {
  const { id } = req.params;
  const author = req.user.username;
  await Object.deleteOne({ _id: id, author });
  res.json({
    success: true,
  });
});
