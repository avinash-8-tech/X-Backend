import { auth } from '../config/auth.js'

const verifyToken = async(req, res, next) => {
    try {
        const session = await auth.api.getSession({
            headers: req.headers
        })
        if(!session){
            return res.status(401).json({success: false, message: "Unauthorized - Please login first"})
        }

        req.user = session.user
        next()

    } catch (error) {
        return res.status(401).json({success: false, message: "Invalid token"})
    }
}

export default verifyToken