var express = require('express');
var router = express.Router();
let annonceJobModel = require('../models/annonceJob');
let calendarModel = require('../models/calendar')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/annonceJob', async function(req, res, next) {
  let annonceList = await annonceJobModel.find();
  res.json(annonceList)
})

router.post('/calendarEvent', async function(req, res, next) {
  let eventList = await calendarModel.find({ employeeOwner: req.body.id });
  
  res.json(eventList)
})

module.exports = router;