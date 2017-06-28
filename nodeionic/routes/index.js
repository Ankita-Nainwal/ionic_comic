var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');
var comicsController = require('../controllers/comics');
var seriesController = require('../controllers/series');
var seasonController = require('../controllers/season');
  router.route('/v1/users')
  .post(userController.postUsers)
  .get(userController.getUsers)

  router.route('/v1/comics')
  .post(comicsController.postComics)
  .get(comicsController.getComics)

  router.route('/v1/season')
  .post(seasonController.postSeason)
  .get(seasonController.getSeason)

  router.route('/v1/series')
  .post(seriesController.postSeries)
  .get(seriesController.getseries)


 router.route('/v1/login')
.post(userController.loginUsers)

 router.route('/v1/comicssearch/:regx')
 .get(comicsController.searchComics)
  //router.route('/v1/users/search/:reg')
  //.get(userController.regexsearch);

  router.route('/v1/comicsdelete/:_id')
  .delete(comicsController.deleteComics)


  router.route('/v1/seasondelete/:_id')
  .delete(seasonController.deleteSeason)

  router.route('/v1/usersdelete/:username')
   .delete(userController.deleteUsers)


   router.route('/v1/seiesdelete/:_id')
    .delete(seriesController.deleteSeries)

   router.route('/v1/updateseries/:_id')
  .put(seriesController.updateSeries)

  router.route('/v1/updateusers/:username')
    .put(userController.updateUsers)

  router.route('/v1/updateseason/:_id')
  .put(seasonController.updateSeason)

  router.route('/v1/updatecomics/:_id')
    .put(comicsController.updateComics)


     router.route('/v1/comments/:Name')
    .post(comicsController.postcomment)

    //  router.route('/v1/comments')
    //  .get(comicsController.getcomment)
    router.route('/v1/verification/:code')
      .get(userController.emailverify)

      router.route('/v1/subscribe')
      .post(userController.subscribe)
module.exports = router;
