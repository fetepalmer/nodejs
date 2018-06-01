var express = require("express")
var Imagen = require("./models/imagenes");
var User = require("./models/user").User;
var router = express.Router();

var image_finder_middleware = require("./middlewares/find_image");
/* acceden a localhost:8080/app solo los usuarios que iniciaron sesion*/
router.get("/",function(req,res){
  //Buscar el usuario
  res.render("app/home")
});

//Todas estas rutas estan sobre /APP
/* arquitectura REST*/
router.get("/imagenes/new",function(req,res){
  res.render("app/imagenes/new");
});

router.all("/imagenes/:id*",image_finder_middleware);

router.get("/imagenes/:id/edit",function(req,res){
  res.render("app/imagenes/edit");
//***  Imagen.findById(req.params.id,function(err,imagen){
//***    res.render("app/imagenes/edit",{imagen:imagen});
//***  });
});


//Imagen individual. parametros de la url :id
router.route("/imagenes/:id")
  .get(function(req,res){
    res.render("app/imagenes/show");
//***    Imagen.findById(req.params.id,function(err,imagen){
//***      res.render("app/imagenes/show",{imagen:imagen});
//***    });
  })
  .put(function(req,res){
    //***Imagen.findById(req.params.id,function(err,imagen){
    //***imagen.title= req.body.title;
    //***  imagen.save(function(err){
    res.locals.imagen.title = req.body.title;
    res.locals.imagen.save(function(err){
        if(!err){
    //*** res.render("app/imagenes/show",{imagen:imagen});
          res.render("app/imagenes/show");
        }else{
    //*** res.render("app/imagenes/"+imagen.id+"/edit",{imagen:imagen});
          res.render("app/imagenes/"+req.params.id+"/edit");
        }
      })
    //***});

  })
  .delete(function(req,res){
    //Eliminar las imagenes
    //Imagen.finById(req.params.id},function(err){
      //Imagen.remove();
    //}
    Imagen.findOneAndRemove({_id: req.params.id},function(err){
      if(!err){
        res.redirect("/app/imagenes");
      }else{
        console.log(err);
        res.redirect("/app/imagenes"+req.params.id);
      }
    });
  });

//  Athlete.find({ 'sport': 'Tennis' }, 'name age', function (err, athletes) {
//    if (err) return handleError(err);
//  })

//Coleccion de Imagen
router.route("/imagenes/")
    .get(function(req,res){
      //filtro las imagenes por el usuario, {creator:res.locals.user._id}
      Imagen.find({},function(err,imagenes){
        if(err){res.redirect("/app");return;}
          res.render("app/imagenes/index",{imagenes:imagenes});
          return;
      });
    })
    .post(function(req,res){
      console.log(res.locals.user._id);
      var data = {
        title: req.body.title,
        creator: res.locals.user._id
      }
      //Solo guardamos el titulo de la imagen en el json por ahora
      var imagen = new Imagen(data);
      imagen.save(function(err){
        if(!err){
          res.redirect("/app/imagenes/"+imagen._id);
        }else{
          console.log(imagen);
          res.render(err);
        }
      });

    });
module.exports = router;
