import jwt from 'jsonwebtoken'
const generateToken = (id)=>{
return jwt.sign({id},'abc',{expiresIn:"30d"})
}


export {
    generateToken
}