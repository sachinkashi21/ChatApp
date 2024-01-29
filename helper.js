

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        if(req.method=="GET"){
            req.session.redirectUrl=req.originalUrl;
        }
        return res.redirect("/login");
    }
    next();
}


module.exports.asyncWrap=(fn)=>{
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{
            next(err);
        });
    };
}