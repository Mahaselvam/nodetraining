var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var request = require('request');
var async = require('async');

const check= function(arg, callback){
  if(typeof arg !== 'number')
  {
    return callback(null,"Its wrong number");
  }
    callback(null,"its correct number")
}

check(91, function(err, res){
  if(err){
    console.log(err);
  }
  else{
    console.log(res);
  }
})

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'mahaselvam95@gmail.com',
         pass: '9786238721'
     }
 });

 router.get('/api', function(req, res, next) {
	res.render('api', {
		title : 'example'
	});
});

router.post('/wiki', function(req, res, next) {
  var flag = req.body.flag;
  var searchURl = '';
  if(flag === "search"){
    var search = req.body.search;
    searchURl = "https://swapi.co/api/people/?search=" + search;
  } else {
    searchURl = req.body.url;
  }
	
	request(searchURl, function(error, response, html) {
		if (error) {
			console.log('Error:', error);
			res.send({
				flag : false
			});
		} else {
			var resData = JSON.parse(html);
			res.send({
				flag : true,
				data : resData
			});
		}
	});
});

router.post('/hero/json', function(req, res, next) {

	var limit = req.body.limit;
	var pagecount = limit / 10;

  var i=1;
  var heroArray = [];

	async.whilst(function() {
		return i <= pagecount;
	}, function(heroCharacter) {
		var url = "https://swapi.co/api/people/?page=" + i;
		console.log(url);
		request(url, function(error, response, html) {
			if (error) {
				console.log('Error:', error);
			} else {
        var result=JSON.parse(html);
        console.log(result);
        heroArray.push(result.results);
        i++;
        heroCharacter();
			}
		});
	}, function(err, reult) {
    console.log(heroArray);
    console.log('heroArray');
		console.log('Search index completed');
		res.send({
      flag : true,
      data : heroArray
		});
  });
});
  
/* To render New page. */
router.get('/contact', function(req, res, next){
  res.locals.author="Maha Lakshmi";
  res.render('contact', {title: 'Contact Us anytime anywhere'});
});

router.get('/email', function(req, res, next){
  res.locals.author="Maha Lakshmi";
  res.render('email', {title: 'Ready to help via email'});
});

router.get('/send', function(req,res, next){
  console.log(req.query);
  var htmlVal = "<div><div>Name: "+req.query.name + "</div>";
  htmlVal+= "<div>Number: "+req.query.number + "</div>";
  htmlVal+="<div>Email: "+req.query.email + "</div>";
  htmlVal+="<div>Message: "+req.query.text + "</div></div>";
  const mailOptions = {
    from: 'mahaselvam95@gmail.com', // sender address
    to: 'selvammaha59@gmail.com;mahaselvam95@gmail.com',// list of receivers
    subject: 'Nodemiler testing', // Subject line
    html: htmlVal// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(err);
      //res.send("Mail not sent");
      res.send({
        flag:false,
        msg:"Mail not sent",
      });
    } else {
      console.log(info);
      //res.send("Mail sent successfully");
      res.send({
        flag:true,
        msg:"Mail sent successfully"
      });
    }
     
 });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  /*const mailOptions = {
    from: 'mahaselvam95@gmail.com', // sender address
    to: 'selvammaha59@gmail.com', // list of receivers
    subject: 'Nodemiler testing', // Subject line
    text: req.content// plain text body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
 });*/
  res.locals.author="Maha Lakshmi";
  res.render('index', { title: 'Express' });
});

router.post('/even/check',function(req,res,next){
  console.log(req);
  var numberVal = req.body.number;

  if(numberVal%2==0){
    res.send({
      flag:true,
      data:"even"
    });
  }else{console.log(req.body);
    res.send({
      flag:false,
      data:"odd"
    });
  }
});

router.post('/leap/check', function(req,res,next){
    //console.log(req);
  var yearVal =req.body.year;

  if(yearVal%4==0){
    res.send({
      flag: true,
      data:"This year is Leap year"
    });
  }else{
    res.send({
      flag: false,
      data:"this year is not a leap year"
    });
  }
})
module.exports = router;