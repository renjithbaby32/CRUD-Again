import User from '../models/userModel.js'
import { generateToken } from '../util/generateToken.js'
import asyncHandler from 'express-async-handler'

const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid credentials')
    }
})

const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        throw new Error('Invalid credentials')
    }


})

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        res.json(error)
    }

})

const deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    await user.remove()
    res.status(204).json({})
})

const editUser = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const user = await User.findByIdAndUpdate(id, req.body)
    res.status(200).json({
        success: true
    })
})

const getUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id)
    res.json(user)
})

const editUserDetails = asyncHandler(async (req, res, next) => {
    const id = req.params.id
    const user = await User.findByIdAndUpdate(id, req.body)
    res.status(200).json(user)

})

export {
    registerUser,
    authUser,
    getAllUsers,
    deleteUser,
    editUser,
    getUser,
    editUserDetails
}