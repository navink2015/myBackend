 const jwt=require("jwt-simple")
 var authentication = (req, res, next) => {
    console.log("authentication");
    var token = req.headers.authentication;
    let decodeingObject;
    try {
      decodeingObject = jwt.decode(token, "ss");
    } catch (err) {
      return res.status(401).send(err.message);
    }
    // console.log(decodeingObject);
    if (new Date().getTime() > decodeingObject.expiresAt) {
      console.log("expired");
      return res.status(401).send("Expired");
    } else {
      // delete decodeingObject.expiresAt;
      console.log(decodeingObject)
      req.user = decodeingObject;
     
      next();
    }
    // }
    // var decode = new Promise(() => {
    //   jwt.decode(token, "ss");
    //   console.log("promise")
    //   // console.log(decodeObject);
    // });
    // decode
    //   .then(() => {
    //     res.status(200)
    //     // res.send("ok")
    //     console.log("something");
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //     res.status(401).send(err.message);
    //   });
    //   console.log(decode)
    // next()
  };
  
  const print=()=>{
      return console.log("print")
  }

//   export module=authentication`
// module.exports=authentication
// exports.authentication=authentication
module.exports= {authentication,print}
// console.log(module)