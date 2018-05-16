var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos");

var posibles_valores =["M","F"];

var email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"Coloca un email valido"];

var password_validation = {
validator: function(p){
  this.password_confirmation == p;
  },
  messsage: "Las contraseñas no son iguales"
}

var user_schema= new Schema({
  name: String,
  username: {type:String,required:true,maxlength:[50,"Username muy grande"]},
  password:  {
    type:String,
    required:true,
    minlength:[8,"El password es muy corto"],
    validate: password_validation
  },
  age: {type:Number, min:[5,"La edad no puede ser menor que 5"],max:[100,"La edad no puede ser mayor que 100"]},
  email:{type: String, required: "El correo es obligatorio",match: email_match},
  date_of_birth: Date,
  sex: {type:String, enum: posibles_valores, messsage: "Opción no válida"}

}); //mongoose.Schema()

user_schema.virtual("password_confirmation").get(function(){
  return this.p_conf;
}).set(function(password){
  return this.p_conf=password;
});

user_schema.virtual("full_name").get(function(){
  return this.name + this.last_name;
}).set(function(password){
  var words = full_name.split(" ");
  this.name=words[0];
  this.last_name=words[1];
  return this.full_name=this.name + this.last_name;
});

// Este equivale a una tabla. Crea una colección que se llama "Users"
var User = mongoose.model("User",user_schema);

module.exports.User = User;

/*
String
Number
Date
Buffer
Boolean
Mixed
Objectid
array
*/
