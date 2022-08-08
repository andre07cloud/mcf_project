const model = require('../../models/users');

const jwt = require('jsonwebtoken');

exports.forgotedPassword = (req, res) => {
    const {email} = req.body;

    model.User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({error: "user with this email doesn't exist!"});
        }

        const token = jwt.sign(
            {
                id:user._id,
                role:user.role,
            },
            process.env.RESET_PASSWORD_KEY,
            {expiresIn: "2m"},
        );
        const data = {
            from: 'noreply@hello.com',
            to: email,
            subject: 'Account Activation Link',
            html: `
                <h2>Please click on given link to activate your account</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
            `
        }
    });
};