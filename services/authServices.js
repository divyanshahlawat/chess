import User from "../models/auth.js"

class AuthService{
    async findOne(payload){
        const user = await User.findOne(payload)
        return user
    }
}
export default new AuthService()