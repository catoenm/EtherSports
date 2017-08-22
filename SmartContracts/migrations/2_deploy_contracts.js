var OptionOnePool = artifacts.require("./OptionOnePool.sol");
var OptionTwoPool = artifacts.require("./OptionTwoPool.sol");

module.exports = function(deployer) {
  deployer.deploy(OptionOnePool);
  deployer.deploy(OptionTwoPool);
};
