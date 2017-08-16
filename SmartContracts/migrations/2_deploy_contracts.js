var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var People = artifacts.require("./People.sol");
var OptionOnePool = artifacts.require("./OptionOnePool.sol");
var OptionTwoPool = artifacts.require("./OptionTwoPool.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(People);
  deployer.deploy(OptionOnePool);
  deployer.deploy(OptionTwoPool);
};
