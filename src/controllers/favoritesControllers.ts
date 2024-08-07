import { StatusCodes } from "http-status-codes"
import { Request, Response } from "express"
import messages from "../utils/messages"
import jwt from 'jsonwebtoken'
import { ENV } from "../configs/server-config"
import { UsersModel } from "../models/userModel"

export const getFavorites = async(req: Request, res: Response) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]
        // console.log(token)

        const decodedToken = JSON.parse(JSON.stringify(jwt.verify(token!, ENV.JWT_SECRET_KEY)))
        const userID = decodedToken.id

        if(!userID){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: messages.TOKEN_EXPIRED,
                error: messages.TOKEN_EXPIRED,
                data: {}
            })
        }

        const user = await UsersModel.findOne({_id: userID})
        
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: messages.USER_NOT_FOUND,
                error: messages.USER_NOT_FOUND,
                data: {}
            })
        }

        const favorites = user?.favorites

        return res.status(StatusCodes.OK).json({
            success: true,
            message: messages.FETCH_SUCCESS,
            error: {},
            data: {favorites}
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

export const addFavorites = async(req: Request, res: Response) => {
    try {
        const {imdbID} = req.query
        const token = req.headers['authorization']?.split(' ')[1]
        // const {token} = req.cookies

        const decodedToken = JSON.parse(JSON.stringify(jwt.verify(token!, ENV.JWT_SECRET_KEY)))
        const userID = decodedToken.id

        if(!userID){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: messages.TOKEN_EXPIRED,
                error: messages.TOKEN_EXPIRED,
                data: {}
            })
        }

        const user = await UsersModel.findOne({_id: userID})
        
        const favMovie = user?.favorites.find((i)=>i === imdbID)

        if(favMovie){
            return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                message: messages.EXIST_IN_FAVORITES,
                error: messages.EXIST_IN_FAVORITES,
                data: {}
            })
        }

        user?.favorites.push(imdbID?.toString()!)
        const temp = await user?.save()

        return res.status(StatusCodes.OK).json({
            success: true,
            message: messages.FAVORITES_ADDED,
            error: {},
            data: {temp}
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: messages.ADD_FAVORITES_ERR,
            error: error,
            data: {}
        })
    }
}

export const removeFavorites = async(req: Request, res: Response) => {
    try {
        const {imdbID} = req.query
        const token = req.headers['authorization']?.split(' ')[1]
        // const {token} = req.cookies

        const decodedToken = JSON.parse(JSON.stringify(jwt.verify(token!, ENV.JWT_SECRET_KEY)))
        const userID = decodedToken.id

        if(!userID){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: messages.TOKEN_EXPIRED,
                error: messages.TOKEN_EXPIRED,
                data: {}
            })
        }

        const user = await UsersModel.findOne({_id: userID})

        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: messages.USER_NOT_FOUND,
                error: messages.USER_NOT_FOUND,
                data: {}
            })
        }

        const favMovie = user?.favorites.find((i)=>i === imdbID)

        if(!favMovie){
            return res.status(StatusCodes.FORBIDDEN).json({
                success: false,
                message: messages.NOT_IN_FAVORITES,
                error: messages.NOT_IN_FAVORITES,
                data: {}
            })
        }

        user.favorites = user?.favorites.filter((i)=>i != imdbID?.toString()!)!
        const temp = await user?.save()

        return res.status(StatusCodes.OK).json({
            success: true,
            message: messages.REMOVED,
            error: {},
            data: {temp}
        })
        
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: messages.REMOVE_FAVORITES_ERR,
            error: error,
            data: {}
        })
    }
}