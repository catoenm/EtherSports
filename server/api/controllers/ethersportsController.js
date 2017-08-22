'use strict';
exports.getGames = function(req, res) {
  console.log("getting games");
};

exports.addGame = function(req, res) {
  console.log("adding game");
};

exports.deleteGame = function(req, res) {
  console.log("deleting game");
};

exports.handleHome = function(req, res){
  res.json({'status':'ok'})
};
