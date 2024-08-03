import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express"
import messages from "../utils/messages"
import jwt, {JwtPayload} from 'jsonwebtoken'
import { ENV } from "../configs/server-config"
import { CommentsRatingsModel } from "../models/commentRatingModel"

export const getCommentsAndRatings = async(req: Request, res: Response) => {
    try {
        const {imdbID} = req.query
        const {token} = req.cookies

        if(!token){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: messages.TOKEN_EXPIRED,
                error: messages.TOKEN_EXPIRED,
                data: {}
            })
        }

        const decodedToken = JSON.parse(JSON.stringify(jwt.verify(token, ENV.JWT_SECRET_KEY)))
        const userID = decodedToken.id

        const comsRatsData = await CommentsRatingsModel.find({imdbID})

        return res.status(StatusCodes.OK).json({
            success: true,
            message: messages.FETCH_SUCCESS,
            error: {},
            data: comsRatsData
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: messages.PROBLEM_IN_FETCH,
            error: error,
            data: {}
        })
    }
}

export const addCommentsAndRatings = async(req: Request, res: Response) => {
    try {
        const {imdbID} = req.query
        const {comments, ratings} = req.body
        const {token} = req.cookies

        if(!token){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: messages.TOKEN_EXPIRED,
                error: messages.TOKEN_EXPIRED,
                data: {}
            })
        }

        const decodedToken = JSON.parse(JSON.stringify(jwt.verify(token, ENV.JWT_SECRET_KEY)))
        const userID = decodedToken.id
        
        const newComment = new CommentsRatingsModel({
            imdbID,
            userID,
            comments,
            ratings
        })
        
        await newComment.save()
        const updatedUserRatings = await CommentsRatingsModel.updateMany({userID, imdbID},{$set: {ratings}})
        // const dbComments = await CommentsRatingsModel.find({})
        // console.log(dbComments)

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: messages.COMMENTS_ADDED,
            error: {},
            data: {}
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: messages.ADD_COMMENTS_ERR,
            error: error,
            data: {}
        })
    }
}