import jwt from 'jsonwebtoken';
import config from '../config/config';
import apiResponse from '../config/utils';

const jwtKey = config.JWT_KEY;

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if(token){
        jwt.verify(token, jwtKey, (err, decoded) => {
            if(err){
                apiResponse(res, 403, 'accès interdit : token invalide');
            }
            else{
                next();
            }
        });
    }
    else{
        apiResponse(res, 401, 'accès interdit : token manquant');
    }
}

