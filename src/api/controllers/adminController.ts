import { Request, Response } from "express";
import { Admin } from "../models/adminModel";
import { HttpStatusCode } from "axios";
import apiResponse from "../config/utils";
import config from "../config/config";
import JWT from "jsonwebtoken";

exports.login = (req: Request, res: Response) => {

    Admin.login(req.body.pincode, (err: Error, admin, status: HttpStatusCode) => {
        if(err){
            apiResponse(res, status, err.message);
        }
        else{
            if(admin.pincode == req.body.pincode){
                let adminData: Record<string, number | string> = { pincode : admin.pincode };
                
                JWT.sign(adminData, config.JWT_KEY, {expiresIn: "3h"}, (err, token) => {
                    if(err){
                        console.log(err);
                        
                        apiResponse(res, 500, "Token invalide");
                    }
                    else{
                        apiResponse(res, status, "Admin connecté", {token: token});
                    }
                });
            }
            else{
                apiResponse(res, 401, "Code pin incorrect.");
            }
        }
    });
}

exports.logout = (req: Request, res: Response) => {
    
}
