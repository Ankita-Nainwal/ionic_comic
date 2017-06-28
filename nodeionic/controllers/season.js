var Season = require('../models/season');
var User = require('../models/user');
var Series = require('../models/series');
const nodemailer = require('nodemailer');
exports.postSeason = function(req, res) {
  var season = new Season({
    Name: req.body.Name,
    description: req.body.description,
    Series_id: req.body.Series_id,
    Season_id: req.body.Season_id,
    starts_on: req.body.starts_on,
    ends_on: req.body.ends_on,
    created_at: new Date(),
    updated_at: ""
  });
  Series.findOne({
    Series_id: req.body.Series_id
  }, function(req, series) {
    console.log(series.subscribers)
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yashwanth.vandanapu@gmail.com',
        pass: 'yash1796'
      }
    });
    for(var i=0; i<series.subscribers.length; i++){


      var mailOptions = {
        from: 'yashwanth.vandanapu@gmail.com',
        to: series.subscribers[i],
        subject: 'verify your account',
        text: "New season has been added!"
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    }
  })
  season.save(function(err, response) {
    if (err) {
      res.json(err);
    }
    if (response) {
      console.log(response)
      res.json({
        success: true,
        body: response
      })
    }
  });
}

exports.getSeason = function(req, res) {
  Season.find({}, function(err, response) {
    if (err) {
      return res.json(req, res, err);
    }

    res.json(response);
  })
}

exports.updateSeason = function(req, res) {
  var id = req.params.id;
  Season.findOne({
    _id: id
  }, function(err, user) {
    if (err) {
      res.json(err);
    }

    var Name = req.body.Name;
    user.Name = Name;
    var description = req.body.description;
    user.description = description;
    user.updated_at = new Date();

    user.save(function(err, response) {
      if (err) {
        res.json(err);
      }

      res.json(response);
    })
  })
}

exports.deleteSeason = function(req, res) {
  var _id = req.params._id;
  Season.findOne({
    _id: _id
  }, function(err, season) {
    if (err) {
      res.json(err);
    }

    if (season) {
      Season.remove({
        _id: _id
      }, function(err) {
        if (err) {
          res.json(err);
        }

        res.json({
          "status": true,
          "respData": {
            "data": "success"
          }
        });
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
exports.updateSeason = function(req, res) {
  var _id = req.params._id;
  Season.findOne({
    _id: _id
  }, function(err, season) {
    if (err) {
      res.json(err);
    }
    var Name = req.body.Name;
    var description = req.body.description;
    var starts_on = req.body.starts_on;
    var ends_On = req.body.ends_On;
    season.Name = Name;
    season.description = description;
    season.starts_on = starts_on;
    season.ends_On = ends_On;
    season.updated_at = new Date();

    season.save(function(err, response) {
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
