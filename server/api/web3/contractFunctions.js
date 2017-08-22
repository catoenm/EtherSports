let fs = require("fs");

let contractLib = require('./contractHelpers');

let source = fs.readFileSync("./api/web3/build/contracts/BetContract.json");
let JSONObject = JSON.parse(source);

// ABI and bytecode description as JSON structure
let abi = JSONObject.abi
let bytecode = JSONObject.unlinked_binary;

let primaryAddr = "0xb0e60e60516e59d86162e192ed8b669e89ce3eeb"

exports.createGame = function(req, res){
  console.log("create contract");
  let contractConfig = {
    abi: abi,
    bytecode : bytecode,
    address : primaryAddr,
    passphrase : 'passphrase'
  }
  let add
  let promise1 = contractLib.deployContract(contractConfig)
  let promise2 = contractLib.deployContract(contractConfig)

  Promise.all([promise1, promise2])
    .then(values => { 
      console.log(values.length);
      let contract1Address = values[0].options.address;
      let contract2Address = values[1].options.address;

      contractLib.setSisterAddresses(contract1Address, contract2Address, contractConfig)
        .then((result) => {

          //TODO add game to database
          console.log("Game created successfully");
          res.json({"message":"success"})
        })
        .catch((error) => {
          console.error("error setting sister addresses", error);
        })
    })
    .catch((error) => {
      console.error("error deploying game", error);
    })
}


