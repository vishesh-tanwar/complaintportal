// // update today
 const jwt=require('jsonwebtoken');
 const User=require('../model/userschema'); 

const authenticate=async(req,res,next)=>{
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({message : "token not provided"}) ;
    }
    const jwttoken = token.replace("Bearer", "").trim(); 
    console.log("token",jwttoken) ; 
    try{
        const isverified = jwt.verify(jwttoken, "thisismybvicamjwtokenforthelogin");  
        console.log("deploy :",isverified);
        //const userData = await User.findOne({enrollment_no:isverified.enrollment_no}) ;    // error in this line 

        //console.log(userData) ; 

        //console.log(userData) ;
        
        req.isverified=isverified;
        req.token=token 

        next();
    } 
    catch(e){
        return res.status(401).json({message : "token not verified "}) ;
    }
};

module.exports=authenticate;

