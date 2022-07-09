var express = require('express');
var router = express.Router();
let usersModel = require('../models/users');
let compagnyModel = require('../models/compagnies')

var uid2 = require('uid2');
var cloudinary = require('cloudinary').v2;
var uniqid = require('uniqid');
var fs = require('fs');
const nodemailer = require("nodemailer");

cloudinary.config({
 cloud_name: 'dlwwftewi',
 api_key: '512472239962297',
 api_secret: '1ZTMd435-c8C_-2ohJtXLHSUhJU' 
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signin', async function(req, res, next) {
  let user = await usersModel.findOne({ email: req.body.email });

  if(user && user.password === req.body.password){
    res.json({firstName: user.firstName, id: user.id, avatar: user.avatar});
  } else if(!user) {
    res.json("Email is not exist")
  }else {
    res.json("Password is invalid")
  }
})

router.post('/verifyEmail', async function(req, res, next) {
  let verify = await usersModel.findOne({ email: req.body.email });

  if(verify){
    res.json(verify.email);
  }else {
    let token = uid2(6);
    let isOk = true

    async function main() {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "uwork.infos@gmail.com",
          pass: "LaCapsule2103",
        },
      });
    
      await transporter.sendMail({
        from: 'uwork.infos@gmail.com', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: "Welcome on Uwork 👋🏼", // Subject line
        // text: `${token}`, // plain text body
        html: `<b>Here is your verification token: ${token}<br>Enjoy! 🚀</b>`, // html body
      });
      // console.log("Message sent: %s", info.messageId);
      // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    main().catch(console.error);
    res.json({isOk, token });
  }
})

router.post('/oldAnnonceList', async function(req, res, next) {
  let user = await usersModel.findOne({ _id: req.body.userId})

  res.json(user.oldAnnonceJob)
})

router.post('/uploalProfilePicture', async function(req, res, next) {
  var pictureName = './tmp/'+uniqid()+'.jpg';
  var resultCopy = await req.files.avatar.mv(pictureName)

  if(!resultCopy){
    var resultCloudinary = await cloudinary.uploader.upload(pictureName);
  }
  res.json({resultCloudinary})
  fs.unlinkSync(pictureName);
})

router.post('/createProfile', async function(req, res, next) {
  
  var newUser = new usersModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    avatar: req.body.avatar,
    age: req.body.age,
    city: req.body.city,
    bio: req.body.bio,
    email: req.body.email,
    password: req.body.password,
    token: req.body.token,
  })

  saveUser = await newUser.save()
  res.json({id : saveUser.id, firstName: saveUser.firstName, avatar: saveUser.avatar})
})

router.post('/addTypeJob', async function(req, res, next) {
  let user = await usersModel.findOne({ _id: req.body.id })

  user.jobType.push({
    contract: req.body.contract,
    sector: req.body.sector,
    city: req.body.city,
    distance: req.body.distance,
    regime: req.body.regime,
  })
  await user.save();

  res.json("sending");
})

router.post('/addEducation', async function(req, res, next) {
  let user = await usersModel.findOne({ _id: req.body.id })

  user.education.push({
    school: req.body.school,
    studyfield: req.body.studyfield,
    degree: req.body.degree,
    start: req.body.start,
    end: req.body.end,
    description: req.body.description,
  })
  await user.save();

  res.json("sending");
})

router.post('/addLanguage', async function(req, res, next) {
  let user = await usersModel.findOne({ _id: req.body.id })

  user.language.push({
    name: req.body.name,
    level: req.body.level,
    description: req.body.description,
  })
  await user.save();

  res.json("sending");
})

router.post('/displayLanguage', async function(req, res, next) {
  let user = await usersModel.findOne({ _id: req.body.id })
  res.json(user.language);
})

router.post('/displayEducation', async function(req, res, next) {
  let user = await usersModel.findOne({ _id: req.body.id })
  res.json(user.education);
})

router.post('/displayProfile', async function(req, res, next) {
  let user = await usersModel.findOne({ _id: req.body.id })
  res.json(user);
})

router.post('/modifyProfile', async function(req, res, next) {
  let user = await usersModel.updateOne({ _id: req.body.id },{
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    avatar: req.body.avatar,
    age : req.body.age,
    bio : req.body.bio,
    password : req.body.password,
    city : req.body.city,
    email : req.body.email,
    jobType: {
      contract: req.body.jobType.contract,
      city: req.body.jobType.city,
      distance: req.body.jobType.distance,
      regime: req.body.jobType.regime,
      sector: req.body.jobType.sector,
    }
    })
  res.json(user);
})

router.post('/modifyEducation', async function(req, res, next) {
  let user = await usersModel.findOne({ _id: req.body.id })

  for(let i=0; i<user.education.length; i++){
    if(user.education[i].id === req.body.educationId){
      user.education[i].school = req.body.school;
      user.education[i].studyfield = req.body.studyfield,
      user.education[i].degree = req.body.degree,
      user.education[i].start = req.body.start,
      user.education[i].end = req.body.end,
      user.education[i].description = req.body.description;
    }
  }
  await user.save();
  res.json(user);
})

router.post('/modifyLanguage', async function(req, res, next) {
  let user = await usersModel.findOne({ _id: req.body.id })

  for(let i=0; i<user.language.length; i++){
    if(user.language[i].id === req.body.languageId){
      console.log('langue modifiée');
      user.language[i].name = req.body.name;
      user.language[i].level = req.body.level,
      user.language[i].description = req.body.description;
    }
  }
  await user.save();
  res.json(user);
})

router.post('/foundUserInfo', async function(req, res, next) {
  if(req.body.id.length != 0){
    let user = await usersModel.findOne({ _id: req.body.id})
  
    let userAvatar = user.avatar;
    let userName = user.firstName;
  
    res.json({userAvatar, userName})
  }else {
    res.json("rip")
  }
})

router.post('/foundCompagnyInfo', async function(req, res, next) {
  if(req.body.id.length != 0){
    let user = await compagnyModel.findOne({ _id: req.body.id})
  
    let userAvatar = user.logo;
    let userName = user.compagnyName;
  
    res.json({userAvatar, userName})
  }else {
    res.json("rip")
  }
})

router.post('/addOldAnonnceJob', async function(req, res, next) {
  let user = await usersModel.findOne({ _id: req.body.userId});

  user.oldAnnonceJob.push({
    id: req.body.oldCardId
  })

  await user.save();

  res.json('oldAnnonceAdd')
})

module.exports = router;