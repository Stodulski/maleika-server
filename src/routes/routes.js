const express = require("express");

const router = express.Router();

const {
    createAudio,
    getAudios,
    editAudioCode,
    deleteAudio,
} = require("../controllers/audioControllers");
const { verifyToken } = require("../controllers/authControllers");

router.post("/create", createAudio);
router.get("/get", verifyToken, getAudios);
router.put("/update/:id", verifyToken, editAudioCode);
router.delete("/delete/:id", verifyToken, deleteAudio);

module.exports = router;
