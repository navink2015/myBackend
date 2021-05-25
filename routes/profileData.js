var express = require('express');
var router = express.Router();
var authentication = require('../middlewares/authentication')
const {Profile} = require("../models")

router.post('/',authentication.authentication,(req, res, next) => {
  var profileId=req.user.userDetails.id
  const {firstName,lastName,age,address,linkedIn,githuab}=req.user

  console.log(profileId)
  // Profile.findOne({where:{profileId:profileId}})
  // .then(res=>{
  //   console.log(res)
  //   }).catch(err=>console.log(err))
    Profile.update({
      name:firstName,
      lastName:lastName,
      age:age,
      linkedInId:linkedIn,
      gitHubId:githuab,
      address:address,
    },{where:{
      profileId:profileId
    }}).then(res=>console.log(res)).catch(err=>console.log(err))
 

  console.log("next")
  console.log(req.user)
    res.send(req.user);
    // profile


  })


module.exports=router