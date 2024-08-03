import mongoose from "mongoose";

export interface coms_Rats {
    imdbID: string,
    userID: mongoose.Schema.Types.ObjectId,
    comments: string,
    ratings: string
}