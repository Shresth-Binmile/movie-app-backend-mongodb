import {Router} from 'express'
import { loginHandler, registerHandler } from '../../controllers/userControllers'
import { addFavorites, getFavorites, removeFavorites } from '../../controllers/favoritesControllers'
import { addCommentsAndRatings, getCommentsAndRatings } from '../../controllers/comments&RatingsControllers'
import { signinValidation, signupValidation } from '../../utils/validation'

const router = Router()

// users apis
router.post('/register', signupValidation, registerHandler)
router.post('/login', signinValidation, loginHandler)

// favorites apis
router.get('/getFavorites', getFavorites)
router.post('/addFavorites', addFavorites)
router.post('/removeFavorites', removeFavorites)

// comments & ratings apis
router.get('/getCommmentsAndRatings', getCommentsAndRatings)
router.post('/addCommmentsAndRatings', addCommentsAndRatings)

export default router