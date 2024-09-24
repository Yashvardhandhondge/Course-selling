require('dotenv').config();
const Jwt_admin_secrte = process.env.JWT_SECRETE_ADMIN;
const Jwt_user_secrte = process.env.JWT_SECRETE_USER

module.exports = {
    Jwt_admin_secrte: Jwt_admin_secrte,
    Jwt_user_secrte:Jwt_user_secrte
}