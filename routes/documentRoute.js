const express = require("express");
const documentController = require("../controllers/documentController");
const  jwtAuth  = require("../middlewares/jwtAuth");
const router = express.Router();

router.post("/create", documentController.createDocument);
router.get("/getAllDoc", documentController.getAllDocument);
router.get("/getDocById/:id", documentController.getDocumentByID);


module.exports = router;
