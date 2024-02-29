const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    
    const {body} = req;
    const { firstname, lastname, email, password } = body;
    
    const newUser = User({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: bcrypt.hashSync(password, 10)
    });
    
    try {
        newUser.save();

        return res.status(200).json({ data: "registerd successfully" });
    } 
    
    catch (error) {
        res.status(400).json({message : "Probleme while adding the user ..."});
    }

};

exports.signin = async (req, res) =>{

    const {email, password} = req.body;

    const user = await User.findOne({email : email});

    if (!user){
        return res.status(400).json({message: "Email invalid ..."})
    }

    bcrypt.compare(password, user.password).then(
        (isMatch) => {
            if(isMatch == false) {
                return res.status(400).json({message: "Wrong password ..."})
            }else {
                const token = jwt.sign(
                    {
                        data: {id : user._id, role : user.role}},
                        process.env.CLE,
                        {expiresIn : '1h'}
                )

                return res.status(200).json(
                    {
                        message : "success ...",
                        token : token,
                        user : user
                    })

            }
        })
    


}