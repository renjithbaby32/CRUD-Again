import express from "express"
const router = express.Router()
import { getAllUsers, deleteUser, editUser } from '../controllers/userControllers.js'

router.route('/').get(getAllUsers)
router.route("/delete/:id").delete(deleteUser)
router.route("/edit/:id").patch(editUser)

export default router