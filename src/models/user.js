const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
    },
    contraseña: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("contraseña") || this.isNew) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.contraseña = await bcrypt.hash(this.contraseña, salt);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        return next();
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
