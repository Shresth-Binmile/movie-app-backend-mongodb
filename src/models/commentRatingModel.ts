import mongoose from "mongoose";
import { coms_Rats } from "../interfaces/commentRatingInterface";
import { UsersModel } from "./userModel";

const commentRatingSchema = new mongoose.Schema<coms_Rats>({
    imdbID: {
        type: String,
        required: true
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'UsersModel'
    },
    comments: {
        type: String,
        required: true
    },
    ratings: {
        type: String,
        required: true
    }
})

export const CommentsRatingsModel = mongoose.model<coms_Rats>('CommentsRatings', commentRatingSchema)