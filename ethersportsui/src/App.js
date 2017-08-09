import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import _ from 'lodash'

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var peopleContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bets","outputs":[{"name":"wallet","type":"bytes32"},{"name":"amount","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_wallet","type":"bytes32"},{"name":"_amount","type":"uint256"}],"name":"addBet","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getBets","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"}]
var peopleContractAddress = '0x201a1bdd0969c34b1bd9c4bb2250ad8a06bf522b'
window.Web3 = Web3

var contract = new ETHEREUM_CLIENT.eth.Contract(peopleContractABI, peopleContractAddress);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallets: [],
      amounts: []
    }
  }
  componentWillMount() {
    contract.methods.getBets().call({from: contract._address}).then(function(result){
      this.setState({
        wallets:String(result[0]).split(','),
        amounts:String(result[1]).split(',')
      })}.bind(this)
    )
  }

  render() {
    var TableRows = []
    _.each(this.state.wallets, (value, index) => {
      TableRows.push(
        <tr key={index}>
          <td>{this.state.wallets[index]}</td>
          <td>{this.state.amounts[index]}</td>
        </tr>
      )
    })
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Ether-Sports</h1>
        </div>
        <div className="container">
          <div className="event">
            <div className="event-title">
              <div className="col">
                <h2>Phoenix 1</h2>
              </div>
              <div className="col">
                <h2>Immortals</h2>
              </div>
              <div className="versus">vs</div>
            </div>
            <div className="wrapper">
              <div className="col">
                <div className="value eth">20,000,000</div>
                <div className="value usd">1,000</div>
              </div>
              <div className="col">
                <div className="value eth">1,000,000</div>
                <div className="value usd">20</div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="event">
            <div className="event-title">
              <div className="col">
                <h2>Phoenix 1</h2>
              </div>
              <div className="col">
                <h2>Immortals</h2>
              </div>
              <div className="versus">vs</div>
            </div>
            <div className="wrapper">
              <div className="col">
                <div className="value eth">20,000,000</div>
                <div className="value usd">1,000</div>
              </div>
              <div className="col">
                <div className="value eth">1,000,000</div>
                <div className="value usd">20</div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="event">
            <div className="event-title">
              <div className="col">
                <h2>Phoenix 1</h2>
              </div>
              <div className="col">
                <h2>Immortals</h2>
              </div>
              <div className="versus">vs</div>
            </div>
            <div className="wrapper">
              <div className="col">
                <div className="value eth">20,000,000</div>
                <div className="value usd">1,000</div>
              </div>
              <div className="col">
                <div className="value eth">1,000,000</div>
                <div className="value usd">20</div>
              </div>
            </div>
          </div>
        </div>
        <div className="App-Content">
          <table>
            <thead>
              <tr>
                <th>Wallet</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {TableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
