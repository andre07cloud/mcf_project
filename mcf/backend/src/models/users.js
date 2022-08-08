const mongoose = require('mongoose');
const Role = require('../models/roles');
const Schema = mongoose.Schema;
//mongoose = require('mongoose');


module.exports = UserSchema = new Schema(
    {
        firstName:{
            type: String, maxlength:50,
        },
        lastName:{
            type: String, maxlength:50,
        },
        email:{
            type: String, required: true, unique:true
        },
        username : {
            type: String, required: true, unique: true
        },
        password : {
            type: String, required: true, unique: true
        },
        isAdmin : {
            type: Boolean, default: false
        },
        role:{
            type: String, required:true,
            default: Role.ROLE_SUPER_ADMIN, 
            enum:[Role.ROLE_SUPER_ADMIN, Role.ROLE_ADMIN, Role.ROLE_FORMATEUR, Role.ROLE_STAGIAIRE]
        },
        active: {
            type: Boolean,
            default: false
        },
        _creator: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        courses: {
            type: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Course' }],
            required: false,
            default: [],
          },
        /* For user login */
        // token: {
        //     type: String
        // },
        // expires: {
        //     type: Date
        // },
        /* For reset password */
        resetPasswordToken: {
            type: String
        },
        resetPasswordExpires: {
            type: Date
        },
        
        resetLink: {
            data: String,
            default: ''
        }

    },
    { timestamps: true }
);

module.exports= mongoose.model('User', UserSchema);
