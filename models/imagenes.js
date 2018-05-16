var mongoose = require("mongoose");

var img_schema = new mongoose.Schema({
  title:{type:String,required:true}
  creator:{type:Schema.Types.ObjectId}
});

var Imagen = mongoose.model("Imagen",img_schema);

module.exports = Imagen;
//module.exports.Imagen = Imagen;
