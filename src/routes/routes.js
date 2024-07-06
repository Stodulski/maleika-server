const express = require("express");

const router = express.Router();

const audioControllers = require("../controllers/audioControllers");

router.post("/create", audioControllers.createAudio);
router.get("/get", audioControllers.getAudios);

module.exports = router;
