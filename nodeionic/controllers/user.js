var User = require('../models/user');
var md5 = require('md5');
var Series = require('../models/series');
const nodemailer = require('nodemailer');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');






// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'yashwanth.vandanapu@gmail.com',
//     pass: 'yash1796'
//   }
// });

exports.postUsers = function(req, res) {
  var newpa = md5(req.body.password);
 var token = Math.random()
  console.log(newpa)
  var user = new User({
    username: req.body.username,
    password: newpa,
    user_type: req.body.user_type,
    email: req.body.email,
    verification: false,
    code: token
  });

  // console.log(user.email)

  // link = "http://192.168.14.189:2001/api/v1/verification/" + user.code


  // var mailOptions = {
  //   from: 'yashwanth.vandanapu@gmail.com',
  //   to: user.email,
  //   subject: 'Verification mail',
  //   // text: 'please click the link below to verify', // plaintext body
  //   html:" click here <a href=" + link + "> clik here </a>"
  // };

  // transporter.sendMail(mailOptions, function(error, info) {
  //   if (error) {
  //     console.log(error, "error");
  //   } else {
  //     console.log('Email sent: ' + info.response);
  //   }
  // });


  user.save(function(err, response) {
    if (err) {
      return customHandleError(req, res, next, err);
    }

    res.json({
      success: true,
      body: response
    })

  });
}





exports.emailverify = function(req, res) {
  var token = req.params.code
  User.findOne({
    code: token
  }, function(err, user) {
    if (err) {
      res.json({
        status: false,
        respData: {
          data: err
        }
      });
    }
    user.verification = true;
    user.code = '';
    user.save(function(err, response) {
      if (err) {
        res.json({
          status: false,
          respData: {
            data: err
          }
        });
      }

      res.json({
        status: true,
        respData: {
          data: "updated"
        }
      });
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'yashwanth.vandanapu@gmail.com',
          pass: 'yash1796'
        }
      });

      var mailOptions = {
        from: 'yashwanth.vandanapu@gmail.com',
        to: user.email,
        subject: 'verify your account',
        text: "Welcome you have been registered in the series base website!"
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    })

  })
}



exports.getUsers = function(req, res) {
  User.find({}, function(err, response) {
    if (err) {
      return res.json(req, res, err);
    }
    res.json(response);
  })
}

exports.updateUsers = function(req, res) {
  var id = req.params.id;
  User.findOne({
    _id: id
  }, function(err, user) {
    if (err) {
      res.json(err);
    }

    var username = req.body.username;
    user.username = username;
    user.updated_at = new Date();

    user.save(function(err, response) {
      if (err) {
        res.json(err);
      }

      res.json(response);
    })
  })
}



exports.loginUsers = function(req, res) {
  var newpa = md5(req.body.password);
  // console.log(newpa)
  var username = req.body.username;
  var password = newpa;
  User.findOne({
      username: username,
      password: newpa
    },
    function(err, user) {
      if (err) {

        res.json(err);
      }
      if (user) {
// console.log(user)
       var mytoken = jwt.sign({username:req.body.username},'senttokens')
    //   var data = mytoken+user;
        res.json({
          token: mytoken,
          data: user
        });
      } else {
        res.json("User doesnt exist");
      }
    })
}





exports.deleteUsers = function(req, res) {
  var username = req.params.username;
  console.log(username);
  User.findOne({
    username: username
  }, function(err, user) {
    if (err) {
      res.json(err);
    }

    if (user) {

      User.remove({
        username: username
      }, function(err) {
        if (err) {
          res.json(err);
        }

        res.json({
          "status": true,
          "respData": {
            "data": "success"
          }
        })
      })
    } else {
      res.json({
        "status": false,
        "respData": {
          "data": "User Does not Exist"
        }
      });
    }

  })
}



exports.updateUsers = function(req, res) {

  var newpa = md5(req.body.password);
  console.log(newpa)
  var username = req.params.username;
  User.findOne({
    username: username
  }, function(err, user) {
    if (err) {
      res.json(err);
    }
    var user_type = req.body.user_type
    var password = newpa;
    user.password = newpa;
    user.user_type = user_type;
    user.updated_at = new Date();

    user.save(function(err, response) {
      if (err) {
        res.json(err);
      }

      res.json({
        "status": true,
        "respData": {
          "data": response
        }
      });
    })
  })
}


exports.subscribe = function(req, res) {
    var email= req.body.email;
    var id = req.body.Series_id
console.log(id)
  Series.findOne({
Series_id: id
  }, function(err, user) {
    if (err) {
      res.json(err);
    }
  user.subscribers.push(email)

       console.log(user)
    user.save(function(err, response) {
      if (err) {
        res.json(err);
      }

      res.json({
        "status": true,
        "respData": {
          "data": response
        }
      });
    })
  })
}
