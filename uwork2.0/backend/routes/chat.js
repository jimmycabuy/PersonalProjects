var express = require('express');
var router = express.Router();
let conversationModel = require('../models/conversation');

/* GET home page. */
router.post('/foundConversation', async function(req, res, next) {
  let conversation = await conversationModel.find()

  let listConversation = [];

  for(let i=0; i<conversation.length; i++){
    if(req.body.id === conversation[i].employeeOwner || req.body.id === conversation[i].compagnyOwner){
      listConversation.push(conversation[i])
    }
  }

  res.json(listConversation)
})

router.get('/getChat/:id', async function(req, res, next) {
  let conversation = await conversationModel.findOne({_id: req.params.id})

  res.json(conversation)
})

router.post('/sendMessage', async function(req, res, next) {
  let conversation = await conversationModel.findOne({_id: req.body.conversationId})
  const newDate = new Date();
  
  if(req.body.document.length === 0){
    conversation.messages.push({
      sender: req.body.sender,
      date: newDate,
      content: req.body.content,
      isDelete: false,
    })
  }else {
    conversation.messages.push({
      sender: req.body.sender,
      date: newDate,
      content: req.body.content,
      document: req.body.document,
      isDelete: false,
    })
  }
  await conversation.save();
  res.json('message sended')
})

router.post('/deleteMessage', async function(req, res, next) {
  let conversation = await conversationModel.findOne({_id: req.body.conversationId})
  
  for(let i=0; i< conversation.messages.length; i++){
    if(conversation.messages[i].id === req.body.messageId){
      conversation.messages[i].isDelete = true;
    }
  }
  await conversation.save()
  res.json("message deleted")
})

module.exports = router;