var express = require('express');
var router = express.Router();
const {Users,Profile} = require("../../models");
var jwt=require('jwt-simple')
var Op=require("sequelize").Op

router.post('/', (req, res) => {
    let time = new Date().getTime() + 30 * 60 * 1000;
    console.log(req.body)
    let ID=req.body.id
    let password=req.body.password
    // console.log(models);
    // models.UserModel.findAll().then((users) => {   console.log(users);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  //   console.log("user start")
  //   Users.findAll({where:{username:'navin'}}).then(res=>console.log(res)).catch(err=>console.log(err))
  // console.log(Users)
  // console.log("user end")
  let currentUserDetails
  let currentUser=Users.findOne({where:{
    [Op.or]:  [
      {
        mobile: {
          [Op.eq]: ID,
      },
      }, {
        email: {
          [Op.eq]: ID,
      },
      }, {
        username: {
          [Op.eq]: ID,
      },
      }
    // {username:ID,mobile:ID,email:ID}
    ]
  }
    })
  currentUser.then(result=>{
    // console.log(result)
    if(result!=null){ 
    currentUserDetails=result.dataValues
    currentUserDetails.expireAt=time
    console.log(currentUserDetails.password)
    if(currentUserDetails.password===password){
      console.log(currentUserDetails)
      // var token=jwt.encode(currentUserDetails,"ss")
      Profile.findOne({where:{profileId:currentUserDetails.id}}).then(result=>{
        // console.log(result.dataValues)
        let profileDetails=result.dataValues
        currentUserDetails.profileDetails=profileDetails
        var token=jwt.encode(currentUserDetails,"ss")
        res.send(token)
      }).catch(err=>console.log(err))
      console.log(profileDetails)

      // res.send(token)
    }
    else{
      res.json({message:"Password Does not match"})
    }
  }
  else{
      res.json({message:"User Does not match"})
    }
    
  }).catch(err=>console.log(err))
  // console.log(currentUser)
    var payload = { ID: 1, userId: req.body.id, expiresAt: time };
  //   console.log(payload);
  //   var token = jwt.encode(payload, "ss");
  //   console.log(token);
  //   console.log(req.body);
  
  //   res.status(200).send(token);
  })

module.exports=router

