import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import _ from 'lodash'

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var opABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bets","outputs":[{"name":"wallet","type":"bytes32"},{"name":"amount","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_wallet","type":"bytes32"},{"name":"_amount","type":"uint256"}],"name":"addBet","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getBets","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"}]
var op1Address = '0x69fe5ef6bfeef8a49c2c8cb3be3da856c1996e1d'
var op2Address = '0x195681ea1f16a40dad15a23947f980b54c9e561c'

window.Web3 = Web3

var op1Contract = new ETHEREUM_CLIENT.eth.Contract(opABI, op1Address);
var op2Contract = new ETHEREUM_CLIENT.eth.Contract(opABI, op2Address);


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      op1Wallets: [],
      op1Amounts: [],
      op1Total: 0,
      op2Wallets: [],
      op2Amounts: [],
      op2Total: 0
    }
  }
  componentWillMount() {
    op1Contract.methods.getBets().call({from: op1Contract._address}).then(function(result){
      this.setState({
        op1Wallets:String(result[0]).split(','),
        op1Amounts:String(result[1]).split(',')
      })
    }.bind(this))

    op2Contract.methods.getBets().call({from: op2Contract._address}).then(function(result){
      this.setState({
        op2Wallets:String(result[0]).split(','),
        op2Amounts:String(result[1]).split(',')
      })
    }.bind(this))

    ETHEREUM_CLIENT.eth.getBalance(op1Address).then(function(result) {
      this.setState({
        op1Total: ETHEREUM_CLIENT.utils.fromWei(result)
      })
    }.bind(this))

    ETHEREUM_CLIENT.eth.getBalance(op2Address).then(function(result) {
      this.setState({
        op2Total: ETHEREUM_CLIENT.utils.fromWei(result)
      })
    }.bind(this))
  }

  render() {
    var op1Transactions = []
    _.each(this.state.op1Wallets, (value, index) => {
      op1Transactions.push(
        <tr key={index}>
          <td>{this.state.op1Wallets[index]}</td>
          <td>{this.state.op1Amounts[index]}</td>
        </tr>
      )
    })

    var op2Transactions = []
    _.each(this.state.op2Wallets, (value, index) => {
      op2Transactions.push(
        <tr key={index}>
          <td>{this.state.op2Wallets[index]}</td>
          <td>{this.state.op2Amounts[index]}</td>
        </tr>
      )
    })
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Ether-Sports</h1>
        </div>
        <div className = "container">
          <div className="event">
            <div className="col">
              <h2>Phoenix 1</h2>
              <h2>Total: {this.state.op1Total}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Wallet</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {op1Transactions}
                </tbody>
              </table>
            </div>
            <div className="col">
              <h2>Immortals</h2>
              <h2>Total: {this.state.op2Total}</h2>
              <table>
                <thead>
                  <tr>
                    <th>Wallet</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {op2Transactions}
                </tbody>
              </table>
            </div>
          </div>
          <div className="versus">----</div>
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
      </div>
    );
  }
}

export default App;
