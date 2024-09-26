const express = require('express');
const jwt = require('jsonwebtoken');
const {Jwt_user_secrte} = require('../config');

function usermiddleware(req,res,next){
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({
            message:"No token provided"
        })
    }

    try{
        const decode = jwt.verify(token,Jwt_user_secrte);
        if(decode){
            req.userId = decode.id;
            next();
        }else{
            res.status(401).json({
                message:"Unauthorized"
            })
        }
    }catch(e){
        res.status(403).json({
            message:"invalid token"
        })
    }
}
module.exports = {
    usermiddleware,
    Jwt_user_secrte
}