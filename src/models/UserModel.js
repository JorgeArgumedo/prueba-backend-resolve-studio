import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Se ejecuta antes de guardar el modelo, en este caso para cifrar la contraseña
UserSchema.pre("save", async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    // Al terminar pasamos al siguiente middleware
    next();
});

// Le damos al Schema la capacidad de evaluar si una contraseña suministrada corresponde a la que tiene el modelo actual
UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
};

const UserModel = model("user", UserSchema);

export default UserModel;
