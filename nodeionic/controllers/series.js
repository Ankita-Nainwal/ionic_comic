var Series = require('../models/series');
exports.postSeries = function(req, res) {
  var series = new Series({
    name: req.body.name,
    description: req.body.description,
    Series_id: req.body.Series_id,
    created_by: req.body.created_by,
    created_at: new Date(),
    updated_at: ""
  });

  series.save(function(err, response) {
    if (err) {
      return customHandleError(req, res, next, err);
    }

    res.json({
      success: true,
      body: response
    })

  });
}
exports.getseries = function(req, res) {
  Series.find({}, function(err, response) {
    if (err) {
      return res.json(req, res, err);
    }

    res.json(response);
  })
}

exports.deleteSeries = function(req, res) {
  var _id = req.params._id;
  console.log(_id);
  Series.findOne({
    _id: _id
  }, function(err, series) {
    if (err) {
      res.json(err);
    }

    if (series) {
      Series.remove({
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




exports.updateSeries = function(req, res) {
  var id = req.params._id;
  Series.findOne({
    _id: id
  }, function(err, series) {
    if (err) {
      res.json(err);
    }

    var name = req.body.name;
    var description = req.body.description;
    series.name = name;
    series.description = description;
    series.updated_at = new Date();

    series.save(function(err, response) {
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
          data: response
        }
      });
    })
  })
}
