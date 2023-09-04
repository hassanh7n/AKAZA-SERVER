const User = require('../model/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {  
    attachCookiesToResponse,
    createTokenUser,
    sendVerificationEmail,
    sendResetPasswordEmail,
    hashString
} = require('../utils');






const register = async(req, res) => {
    const {name, email, password} = req.body
    const isEmailAlreadyExisted = await User.findOne({email : email});
    if(isEmailAlreadyExisted){
        throw new CustomError.BadRequestError('Email already existed')
    };
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const user = await User.create({name, email,  password, role});

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({   res, user : tokenUser  });
    res.status(StatusCodes.CREATED).json({
        user : tokenUser
    });
};


const logIn = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new CustomError.BadRequestError('Plaese provide email and password')
    };

    const user = await User.findOne({email});
    
    if(!user){
        throw new CustomError.UnAuthorizeError("inavlid Credentials")
    };

    const isPasswordCorrect = await user.comparePassword(password);

    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Inavlid Credentials');
    };

    const tokenUser = await createTokenUser(user);
    attachCookiesToResponse({res, user : tokenUser});

    res.status(StatusCodes.OK).json({
        user : tokenUser
    })

    res.status(200).json({
        mag : "logIn user"
    });
};



const logOut = async(req, res) => {
    res.cookie('accessToken','logout', {
        httpOnly : true,
        expires : new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({
        msg : "LogOut Successfuly"
    })
}


module.exports = {
    register,
    logIn,
    logOut
}