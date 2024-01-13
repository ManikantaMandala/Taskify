require('dotenv').config();
const jwtPassword = process.env.jwtPassword;
const {User} = require('./dbConnection');
const jwt = require('jsonwebtoken');

//jwtToken is password in headers of the request
function userMiddleware(req, res, next){
    const token = req.headers['authorization'];
    console.log(token);
    if(!token){
        return res.status(500).json({
            message: 'No authorization token'
        });
    } 
    const [_, jwtToken] = token.split(" ");
    jwt.verify(jwtToken, jwtPassword, async (err, decoded)=>{
        if(err){
            return res.status(402).json({
                message: 'unauthorized1',
                error: err.message
            });
        }
        const id = decoded.id;
        const user = await User.findById(id);
        if(!user){
            return res.status(401).json({
                message: "unauthorized3"
            });
        }
        req.decodedToken = decoded;
        next();
    });

}

module.exports = userMiddleware;
