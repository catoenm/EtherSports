pragma solidity ^0.4.13;

contract OptionOnePool {
  Bet[] bets;
  address sisterAddress;
  bool public flag = false;
  uint public bettingTotal = 0;

  function setSisterAddress(address _sisterAddress) returns (bool success) {
    sisterAddress = _sisterAddress;
    return true;
  }

  function () payable {
    address senderAddress = msg.sender;
    if (senderAddress != sisterAddress) {
      addBet(senderAddress, msg.value);
    }
  }

  function dumpEtherToSister(address _address) {
    _address.transfer(this.balance);
  }

  function payBetters() {
    uint length = bets.length;
    for (uint i = 0; i < length; i++) {
      Bet memory currentBet;
      currentBet = bets[i];
      currentBet.wallet.transfer(bettingTotal/10);
    }
  }

  struct Bet {
    address wallet;
    uint amount;
  }

  function addBet(address _wallet, uint _amount) private {
    Bet memory newBet;
    newBet.wallet = _wallet;
    newBet.amount = _amount;
    bettingTotal += _amount;
    bets.push(newBet);
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
