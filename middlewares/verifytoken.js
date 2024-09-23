const jwt = require('jsonwebtoken');




// middleware to verify token before accessing routes
function verifyToken(req, res, next) {

    const token = req.headers.token;

    if(token){

        try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        req.user = decoded;
        next(); 

        }catch(error){
            res.status(401).json({message: 'invalid token'});  //403 forbidden access
        }
    }else{
        res.status(401).json({message: 'No token provided'});  //401 not authorized user
    }

 
}


// verify token and authorization user
 function verifytokenAndAuthorization(req,res,next){

    verifyToken(req,res, ()=>{

        if(req.user.id === req.params.id || req.user.isAdmin){

            next();

        }else{

            return res.status(403).json({ message:"you are not allowed to access this"})
        }


    });
 }

// verify token and admin


 function verifytokenAndAdmin(req,res,next){
    verifyToken(req,res, ()=>{


        if(req.user.isAdmin){
            next();
        }else{

            return res.status(403).json({ message:"you are not allowed, only admins can access this"})

        }



    });
 }





// export the middleware function
module.exports ={
        verifyToken,
        verifytokenAndAuthorization,
        verifytokenAndAdmin
         
    } 