'use strict';
module.exports = function(app) {
  var games = require('../controllers/ethersportsController');
  var contract = require('../web3/contractFunctions');

  app.route('/')
    .get(games.handleHome);

  app.route('/games')
    .get(games.getGames)
    .post(contract.createGame);

  //TODO do this later
  //app.route('/games/:gameId')
  //.get()
  //.put()
  //.delete();
};

