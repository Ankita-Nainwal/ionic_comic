var Comics = require('../models/comics');

exports.postComics = function(req, res) {
  var comics = new Comics({
    Name: req.body.Name,
    Story: req.body.Story,
    image: req.body.image,
    Season_id: req.body.Season_id,
    starts_on: req.body.starts_on,
    ends_on: req.body.ends_on,
    Season_name: req.body.Season_name,
    Series_name: req.body.Series_name,
    Series_id: req.body.Series_id,
    created_at: new Date(),
    updated_at: "",
    // comments:req.body.comments
  });



  comics.save(function(err, response) {
    if (err) {
      return customHandleError(req, res, next, err);
    }

    res.json({
      success: true,
      body: response
    })

  });
}

exports.getComics = function(req, res) {
  Comics.find({}, function(err, response) {
    if (err) {
      return res.json(req, res, err);
    }

    res.json(response);
  })
}

exports.updateComics = function(req, res) {
  var id = req.params.id;
  Comics.findOne({
    _id: id
  }, function(err, user) {
    if (err) {
      res.json(err);
    }

    var username = req.body.username;
    user.username = username;
    user.updated_at = new Date();

    Comics.save(function(err, response) {
      if (err) {
        res.json(err);
      }

      res.json(response);
    })
  })
}

exports.searchComics = function(req, res) {
  var regex = RegExp(req.params.regx);
  console.log(req.params.regx);
  //  var name = req.body.Name;

  Comics.find({
      Name: regex
    },
    function(err, response) {
      if (err) {
        return res.json(req, res, err);
      }
      if ((response || []).length === 0) {
        return res.json({
          "status": false,
          "respData": {
            "data": "no results found"
          }
        });
      }
      return res.json({
        "status": true,
        "respData": {
          "data": response
        }
      });
    }
  )
};


exports.deleteComics = function(req, res) {
  var _id = req.params._id;
  console.log(_id);
  Comics.findOne({
    _id: _id
  }, function(err, comics) {
    if (err) {
      res.json(err);
    }

    if (comics.length != 0) {
      Comics.remove({
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
    }
    // } else {
    //     res.json({
    //         "status": false,
    //         "respData": {
    //             "data": "User Does not Exist"
    //         }
    //     });
    // }

  })
}
exports.updateComics = function(req, res) {
  var _id = req.params._id;
  Comics.findOne({
    _id: _id
  }, function(err, comics) {
    if (err) {
      res.json(err);
    }
    var Name = req.body.Name;
    var story = req.body.Story;
    var starts_on = req.body.starts_on;
    var ends_on = req.body.ends_on;

    comics.Name = Name;
    comics.Story = story;
    comics.starts_on = starts_on;
    comics.ends_on = ends_on;
    comics.updated_at = new Date();

    comics.save(function(err, response) {
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

exports.postcomment = function(req, res){
  var id = req.params.Name;
  console.log(id)
  Comics.findOne({Name:id}, function(err, comic){
    if(err){
      res.json(err)
    }
    if (comic){

      var comment = req.body.comments;
      comic.comments.push(comment);
      comic.save(function(err, response){
        if(err){
          res.json(err)
        }
        else{
          res.json(response)
        }
      })
    }
  })
}
