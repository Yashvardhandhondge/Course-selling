const express = require('express');
const jwt = require('jsonwebtoken');
const { Jwt_admin_secrte } = require('../config');

function app(req, res, next) {
    const token = req.headers.token; // Token should come from headers

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, Jwt_admin_secrte); // Verify token

        if (decoded) {
            req.userId = decoded.id; // Attach user ID to request object
            next();
        } else {
            res.status(401).json({
                message: "Unauthorized"
            });
        }
    } catch (err) {
        res.status(403).json({
            message: "Invalid token"
        });
    }
}

module.exports = {
    app,
    Jwt_admin_secrte
};
