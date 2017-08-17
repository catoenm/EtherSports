pragma solidity ^0.4.13;

contract OptionTwoPool {
  Bet[] public bets;
  address sisterAddress;


  function setSisterAddress(address _sisterAddress) returns (bool success) {
    sisterAddress = _sisterAddress;
    return true;
  }

  function () payable {
    address senderAddress = msg.sender;

    if (senderAddress == sisterAddress) {
      triggerPayment();
    } else {
      addBet(senderAddress, msg.value);
    }
  }

  function triggerPayment() returns (bool success){
    return true;
  }

  function dumpEtherToSister() returns (bool success) {
    sisterAddress.transfer(this.balance);
    return true;
  }

  struct Bet {
    address wallet;
    uint amount;
  }

  function addBet(address _wallet, uint _amount) private returns (bool success) {
    Bet memory newBet;
    newBet.wallet = _wallet;
    newBet.amount = _amount;

    bets.push(newBet);
    return true;
  }

  function getBets() constant returns (address[], uint[]) {

    uint length = bets.length;

    address[] memory wallets = new address[](length);
    uint[] memory amounts = new uint[](length);

    for (uint i = 0; i < bets.length; i++) {
      Bet memory currentBet;
      currentBet = bets[i];

      wallets[i] = currentBet.wallet;
      amounts[i] = currentBet.amount;
    }

    return (wallets, amounts);
  }

  function getSisterAddress () constant returns (address) {
    return sisterAddress;
  }
}
