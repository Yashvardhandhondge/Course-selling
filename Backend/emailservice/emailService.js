const transporter = require('./emailConfig');
const {notificationModel} = require('../db');
const { text } = require('express');

const sendWelcomeEmail = (email,name)=>{
    const mailOptions ={
        from:process.env.EMAIL_USER,
        to:email,
        subject:'Welcome to Our Platfrom',
        text:`Hi ${name},wlecome to our platform! We're glad to have you here`,
    };
    return transporter.sendMail(mailOptions);
};

const sendPurchaseEmail =(email,courseName)=>{
    const mailOptions ={
        from:process.env.EMAIL_USER,
        to:email,
        subject:'Purchase Confirmation',
        text:`Thank you for purchasing ${courseName}!We hope you enjoy the course`,
    }
    return transporter.sendMail(mailOptions);
}

const createNotification = async (userId,message)=>{
    const notification = new notificationModel({userId,message});
    await notification.save()
}

module.exports ={
    sendWelcomeEmail,
    sendPurchaseEmail,
    createNotification,
}