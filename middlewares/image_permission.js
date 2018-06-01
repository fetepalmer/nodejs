var Imagen = require("../models/imagenes"); // Importo el modelo

module.exports = function(image,req,res){
   // True = Tiene permisos
   // False = SI no tienes permisos
   if(req.method === "GET" && req.path.indexOf("edit") < 0){
     //Ver la imagen
     return true;
   }
   if(typeof image.creator == "undefined") return false;

   console.log(image.creator);
   console.log(image.creator.ObjectId);
   if(image.creator._id == res.locals.user._id){
     console.log("FUNCIONOOOO!");
     //Esta imagen yo la subi
     return true;
   }
   return false;
}
