import mongoose from "mongoose";
import { UserType } from "../interfaces/userInterface";

const userSchema = new mongoose.Schema<UserType>({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    favorites: {
        type: [String],
        default: [],
        required: true
    }
})

export const UsersModel = mongoose.model<UserType>('Users', userSchema)