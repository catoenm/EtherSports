let fs = require("fs");
let Web3 = require('web3'); // https://www.npmjs.com/package/web3
var TestRPC = require("ethereumjs-testrpc");

let web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

let source = fs.readFileSync("../SmartContracts/build/contracts/OptionOnePool.json");
let JSONObject = JSON.parse(source);

// ABI and bytecode description as JSON structure
let abi = JSONObject.abi
let byteCode = JSONObject.unlinked_binary;


let primaryAddr = "0xb0e60e60516e59d86162e192ed8b669e89ce3eeb"

web3.eth.getAccounts().then(accounts =>{
  web3.eth.personal.unlockAccount(primaryAddr,"passphrase").then(() => {
    let contractSettings = {
      from: primaryAddr,
      data: byteCode,
      gas: 2000000 
    }
    var contract = new web3.eth.Contract(abi, contractSettings);

    let deploySettings = {
      data: byteCode
    }
    contract.deploy(deploySettings)
      .send({
        from: primaryAddr,
        gas: 2000000,
        gasPrice: '30000000000000'
      })
      .then(function(newContractInstance){
        console.log(newContractInstance);
      });

  })
})
console.log("end of program")
