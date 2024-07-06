const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema(
    {
        archivo: {
            type: String,
            required: true,
        },
        nombre: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        telefono: {
            type: String,
            required: true,
        },
        comprador: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Audio = mongoose.model("Audio", audioSchema);

module.exports = Audio;
