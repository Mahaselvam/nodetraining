var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var request = require('request');
var async = require('async');
var userdetails = require("../config/userdetails.json");

console.log(userdetails);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.author="Maha Lakshmi";
  res.render('login', { title: 'loginnnnn' });
});

router.post('/logdata', function(req, res, next) {
  
  var userVal = req.body.user;
  var passVal = req.body.pass; 

  if(userdetails.user==userVal && userdetails.pass==passVal ){
    res.cookie('user', userVal, { maxAge: 900000, httpOnly: true });
    res.send({
      flag:true
    }) ; 
  }else{
    res.send({
      flag:false
    }) ; 
  }

  });

  router.post('/out', function(req, res, next){
    console.log("errror");
    res.clearCookie('user');
    /*res.render('/', {title: 'cvbvbn'});*/
    res.send("data");
  });


router.get('/home', function(req, res, next) {

  var userCookie = req.cookies['user'];
  if(userCookie){
    res.render('index', { title: 'Express' });
  }else{
    res.send("Login to access this page <a href='/'>Login</a>");
  }
 
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'mahaselvam95@gmail.com',
         pass: '9786238721'
     }
 });



/*const check= function(arg, callback){
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
})*/
  
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

//api concept//
/*router.get('/api', function(req, res, next) {
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

//This is For Request Module....//

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
	}, function(err, result) {
    console.log(heroArray);
    console.log('heroArray');
		console.log('Search index completed');
		res.send({
      flag : true,
      data : heroArray
		});
  });
});*/

// even check//
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

/*if(yearVal%4==0){
  res.send({
    flag: true,
    data:"This year is Leap year"
  });
}else{
  res.send({
    flag: false,
    data:"this year is not a leap year"
  });
}*/

  var time = new Date();
  var currentYear = time.getFullYear()
  var yearVal =req.body.year;

  

  async.waterfall([
    function(callback) {
        var age = currentYear - yearVal;
        callback(null,age);
    },
    function(arg1, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        if(arg1 >= 18){
          console.log("eligible");
          callback(null, true);
        }else{
          console.log("not eligible");
          callback(null, false);
        }
    }
], function (err, result) {
  if(err){
    console.log("Error within waterfall");
    console.log(err);
    res.send({
      flag:false,
      data:"Mail not sent",
    });
  }else{
    var htmlVal=(result)?"Eligible for voting":"Not eligible for voting";
    
    const mailOptions = {
      from: 'mahaselvam95@gmail.com', // sender address
      to: 'selvammaha59@gmail.com;mahaselvam95@gmail.com',// list of receivers
      subject: 'Voting eligibility', // Subject line
      html: htmlVal// plain text body
    };
  
    transporter.sendMail(mailOptions, function (err, info) {
      if(err){
        console.log(err);
        //res.send("Mail not sent");
        res.send({
          flag:false,
          data:"Mail not sent",
        });
      } else {
        console.log(info);
        //res.send("Mail sent successfully");
        res.send({
          flag:true,
          data:"Mail sent successfully"
        });
      }
       
   });
  }
    // result now equals 'done'
    
});

})


//asyn parellel and series method concept example//
/*var task = [];

task.push(function(cb){
setTimeout(function(){console.log("first");
cb(null,"first");
},3000)
   
});
task.push(function(cb){
setTimeout(function(){console.log("second");
cb(null,"second");}
,1000)
   
});
task.push(function(cb){
   
setTimeout(function(){console.log("final");
cb(null,"final");}
,6000)
   
});
   
async.series(task,function(err,data){console.log(data)});
async.parallel(task,function(err,data){console.log(data)});*/
module.exports = router;