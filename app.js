var express = require("express");
var bodyParser = require("body-parser");
var User = require("./models/user").User;//Indexo el objeto que quiera del modelo user
var cookieSession = require("cookie-session");
var router_app = require("./routes_app");
var session_middleware = require("./middlewares/session");
var methodOverride = require("method-override");

var app = express();


//pongo el dominio GN
//app.use("/GN",express.static('public'));
app.use(express.static('public')); //pone los archivos estaticos en la carpeta public los pone a nivel raiz.
app.use(bodyParser.json()); // leer peticiones json
app.use(bodyParser.urlencoded({extended: true})); //

app.use(methodOverride("_method"));
/*
app.use(session({
  secret: "123by123211221u",
  resave:false,
  saveUninitialized: false
}));*/
app.use(cookieSession({
  name: "session",
  keys:["Llave-1","Llave-2"]
  }));

app.set("view engine","jade");//motor de vista mas popular

app.get("/",function(req,res){
  console.log(req.session.user_id);
  res.render("index");
});

app.get("/signup",function(req,res){
    User.find(function(err,doc){
      console.log(doc);
      res.render("signup");
    });
});

app.get("/login",function(req,res){
    res.render("login");
});

app.post("/users",function(req,res){
var user = new User({
                       email:req.body.email,
                       password:req.body.password,
                       password_confirmation:req.body.password_confirmation,
                       username:req.body.username});
 user.save().then(function(us){
   res.send("Guardamos el usuario exitosamente");
   },function(err){
         console.log(String(err));
         res.send("Hubo un error al guardar el usuario");
   });
});

app.post("/sessions",function(req,res){
    User.findOne({email:req.body.email,password:req.body.password},"username email",function(err,user){
        req.session.user_id = null;
        if(user!= null) req.session.user_id = user._id;
        res.redirect("/app");
    });
});

/* /app es la ruta del sitio */
/* localhost:8080/app/home*/
app.use("/app",session_middleware);
app.use("/app",router_app);

app.listen(8080);
