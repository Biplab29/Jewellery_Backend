export const sendToken = async( user, statusCode, message, res) =>{
    const token = user.generateToken();
    console.log("Generate Token:", token);
    res.status(statusCode).cookie("token", token, {
        expires: new Date(Date.now() + 3600000), // 1 hour expiration
        httpOnly: true
    }).json({
        success: true,
        user,
        message,
        token,
    });  
};