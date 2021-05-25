var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

const models = require("./models");
models.sequelize.sync().then().catch(err=>console.log(err))
const {Users,Profile}=require("./models")
console.log(models.sequelize.models)

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
var jwt = require("jwt-simple");



var port = 4000;
app.use(cors());

var signUp=require("./routes/auth/SignUp")
var signIn=require("./routes/auth/signIn")
var profile=require("./routes/profile");
var profileData=require("./routes/profileData")
// const { authentication } = require("./middlewares/authentication");

app.use("/signUp",signUp);

app.use("/SignIn",signIn);

app.use("/profile", profile );

app.use("/profileData",profileData)

app.get('/',(req,res)=>{
  // Users.create({username:"navin",password:"abcd"}).catch(err=>console.log(err))
  res.send("hello from express server")
  Profile.findAll().then(res=>console.log(res)).catch(err=>console.log(err))

})

// app.post('/profileData',authentication,(req,res)=>{
//   console.log("profile data request")
  
//   // console.log(req.body)
//   // var responseObject=jwt.decode(req.body.message,"ss")
//   // console.log(responseObject)
//   res.send(req.user)
// })


app.listen(port, () => {
  console.log("server started at", port);
});

// try {
//    sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }
