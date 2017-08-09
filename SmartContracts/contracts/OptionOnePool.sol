pragma solidity ^0.4.13;

contract OptionOnePool {
  Bet[] public bets;

  function () payable {
    address from = msg.sender;
    addBet(from, 100);
  }

  struct Bet {
    address wallet;
    uint amount;
  }

  function addBet(address _wallet, uint _amount) returns (bool success) {
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
}
