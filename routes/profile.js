var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication')
const {Profile} = require("../models")

router.post('/',authentication.authentication,(req, res, next) => {
    console.log(req.user.id)
    var currentProfile=Profile.findOne({where:{profileId:req.user.id}}).then(result=>{
      // console.log(res.dataValues)
    console.log("respone profile")
    req.user.updateUserData=result.dataValues
    console.log(req.user)
    res.send(req.user);
    }).catch(error=>console.log(error))
    console.log(currentProfile)
   
  })

module.exports=router
