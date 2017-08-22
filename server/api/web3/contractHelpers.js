"use strict";

let Web3 = require('web3');
let web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));

//contractSettings{
//abi:
//bytecode:
//address:
//passphrase:
//gas:
//gasPrice:
//}
exports.deployContract = function(contractConfig){
  //TODO find a better way of error validation

  let promise = new Promise((res, rej) => {
    if (typeof contractConfig.abi === 'undefined') {
      rej({message:"abi cannot be empty"})
    }
    let abi = contractConfig.abi

    if (typeof contractConfig.bytecode === 'undefined') {
      rej({message:"bytecode cannot be empty"})
    }
    let bytecode = contractConfig.bytecode

    if (typeof contractConfig.address === 'undefined') {
      rej({message:"address cannot be empty"})
    }
    let address = contractConfig.address

    if (typeof contractConfig.passphrase === 'undefined') {
      rej({message:"passphrase cannot be empty"})
    }
    let passphrase = contractConfig.passphrase

    let gas = 
      (typeof contractConfig.gas !== 'undefined') 
      ?  contractConfig.gas : 2000000;

    let gasPrice = 
      (typeof contractConfig.gasPrice !== 'undefined') 
      ?  contractConfig.gas : '30000000000000';

    web3.eth.personal.unlockAccount(address, passphrase)
      .then(() => {

        let contractSettings = {
          from: address,
          data: bytecode,
          gas: gas 
        }
        var contract = new web3.eth.Contract(abi, contractSettings);

        let deploySettings = {
          data: bytecode
        }
        console.log("creating contract");
        contract.deploy(deploySettings)
          .send({
            from: address,
            gas: gas,
            gasPrice: gasPrice
          })
          .then(function(newContractInstance){
            console.log("finished creating contract")
            res(newContractInstance)
          });
      })
      .catch((error) => {
        console.log("unlock account error");
        rej(error)
      })
  })
  return promise
}

//contractSettings{
//abi:
//address:
//passphrase:
//gas:
//gasPrice:
//}
exports.setSisterAddresses = function(address1, address2, contractConfig){
  //TODO find a better way of error validation

  let promise = new Promise((res, rej) => {
    if (typeof contractConfig.abi === 'undefined') {
      rej({message:"abi cannot be empty"})
    }
    let abi = contractConfig.abi

    if (typeof contractConfig.address === 'undefined') {
      rej({message:"address cannot be empty"})
    }
    let address = contractConfig.address

    if (typeof contractConfig.passphrase === 'undefined') {
      rej({message:"passphrase cannot be empty"})
    }
    let passphrase = contractConfig.passphrase

    let gas = 
      (typeof contractConfig.gas !== 'undefined') 
      ?  contractConfig.gas : 2000000;

    let gasPrice = 
      (typeof contractConfig.gasPrice !== 'undefined') 
      ?  contractConfig.gas : '30000000000000';

    web3.eth.personal.unlockAccount(address, passphrase)
      .then(() => {

        let contractSettings = {
          from: address,
          gas: gas 
        }
        let contract1 = new web3.eth.Contract(abi, address1)
        let contract2 = new web3.eth.Contract(abi, address2)

        //TODO change 'getBets()' to 'setSister()'
        let promise1 = contract1.methods.getBets().call({from: address})
        let promise2 = contract2.methods.getBets().call({from: address})

        Promise.all([promise1, promise2])
          .then(values => { 
            console.log(values);
            console.log("successfully set sisters");
            //let txn1 = values[0].options.address;
            //let txn2 = values[1].options.address;
            //res(txn1, txn2)
            res()
          })
          .catch((error) => {
            console.log("error setting sisterms");
            rej(error)
          })
      })
      .catch((error) => {
        console.log("unlock account error");
        rej(error)
      })
  })
  return promise
}
