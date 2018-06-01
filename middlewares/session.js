var User = require("../models/user").User;

module.exports = function(req,res,next){
  //validamos si esta el usuario
  if(!req.session.user_id){
      console.log("El usuario no esta");
      res.redirect("/login");
  }else{
  //sino los buscamos
    User.findById(req.session.user_id,function(err,user){
      if(err){
        console.log(err);
        res.redirect("/login");
      }else{
        res.locals = {user: user};
        next();
      }
    })
  }
}
