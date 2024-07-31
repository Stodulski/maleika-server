const Audio = require("../models/audio");

exports.getAudios = async (req, res) => {
    try {
        const audios = await Audio.find();
        res.json(audios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAudio = async (req, res) => {
    const { archivo, nombre, email, telefono, comprador } = req.body;
    try {
        const newAudio = new Audio({
            archivo,
            nombre,
            email,
            telefono,
            comprador,
        });
        await newAudio.save();
        res.status(201).json(newAudio);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.editAudioCode = async (req, res) => {
    const { id } = req.params;
    const { codigo } = req.body;
    try {
        const audio = await Audio.findByIdAndUpdate(id, { codigo });
        if (!audio) {
            return res.status(404).json({ message: "Audio not found" });
        }
        res.json({ message: "Audio code updated successfully", audio });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

exports.deleteAudio = async (req, res) => {
    const { id } = req.params;
    try {
        const audio = await Audio.findByIdAndDelete(id);
        if (!audio) {
            return res.status(404).json({ message: "Audio not found" });
        }
        res.json({ message: "Audio deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
