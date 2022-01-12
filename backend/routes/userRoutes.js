import express from "express"
const router = express.Router()
import {authUser, editUserDetails, getUser, registerUser} from '../controllers/userControllers.js'

router.route('/login').post(authUser)
router.route('/').post(registerUser)
router.route('/user/:id').get(getUser).put(editUserDetails)

export default router
