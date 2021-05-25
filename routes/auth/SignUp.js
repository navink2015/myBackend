var express = require('express');
var router = express.Router();
const { Users,Profile } = require("../../models")
// import { Op } from 'sequelize';
const Op = require('sequelize').Op;

router.post('/', async (req, res) => {
    let { Name, Phone, Email, Password } = req.body
    // console.log(Name)
    // console.log(Password)
    // Users.create({username:"navin",password:"abcd"}).catch(err=>console.log(err))

    let currentUser = Users.findOne({
        where: {
            [Op.or]: [
                // {
                //     username: {
                //         [Op.eq]: Name
                //     },
                // },
                {
                    mobile: {
                        [Op.eq]: Phone,
                    },
                }, {
                    email: {
                        [Op.eq]: Email
                    }
                }
            ]
        }
    })
    // console.log("current user")
    // console.log(currentUser.dataValues)
    currentUser.then(result => {
        console.log("result of findOne query")
        
        // console.log(result.length)
        if (result != null) {
            console.log(result.dataValues)
            console.log("not equal null")

            // const doesEmailExist = await Users.findOne({
            //     where:{
            //         email: Email
            //     }
            // });
            // console.log(doesEmailExist);
            // if (doesEmailExist) {
            //     return res.json({
            //         message:"User account with this email already exists"
            //     })
            // }
            // const doesPhoneExist = await 
            if (result.dataValues.email === Email) {
                console.log("email")
                return res.json({
                    message: "User account with this email already exists"
                })
            }
            else if (result.dataValues.Phone === Phone){
                console.log("mobile")
        return res.json({
            message: "User account with this email already exists"
        })
    }
     else {return res.json({
        message: "The User details are already existing. Please use a different email/phone combination."
    })}
}
        else {
        Users.create({ username: Name, mobile: Phone, email: Email, password: Password })
        .then(response=>{
            console.log(response.dataValues)
            Profile.create({profileId:response.dataValues.id}).then(respone=>console.log(respone)).catch(error=>console.log(error))
        })
        .catch(err => console.log(err))
        // Users.findOne({where:{username:Name}}).then(res=>{
        //     // console.log(res)
        //     let userId=res.dataValues.id
        //     Profile.create({profileId:userId})
        // })
            console.log("response is sent")
            return res.json({
            message: "User is created"
        })
        // let userId;
       

        // Profile.create({profileId:})
    }

    }).catch(error => console.log(error))



// Users.findAll({where:{mobile:Phone}}).then(result=>{
//     console.log(result.length)
//     if(result.length>=1){
//        return res.status(200).send("usern mobile Number already exit")
//     }
// }).catch(error=>console.log(error))

// Users.findAll({where:{email:Email}}).then(result=>{
//     console.log(result.length)
//     if(result.length>=1){
//        return res.status(200).send("usern Email  already exit")
//     }
// }).catch(error=>console.log(error))



// res.sendStatus(200);
console.log("Requested from signup");
})

module.exports = router