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
