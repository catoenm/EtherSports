import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3'
import _ from 'lodash'

var ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
var peopleContractABI = [{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"}]

var peopleContractAddress = '0x8cb79fae15593259dd1153689aead7bc66e4bca0'
window.Web3 = Web3

var contract = new ETHEREUM_CLIENT.eth.Contract(peopleContractABI, peopleContractAddress);

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstNames: [],
      lastNames: [],
      ages: []
    }
  }
  componentWillMount() {
    contract.methods.getPeople().call({from: contract._address}).then(function(result){
      this.setState({
        firstNames:String(result[0]).split(','),
        lastNames:String(result[1]).split(','),
        ages:String(result[2]).split(',')
      })}.bind(this)
    )
  }

  render() {
    var TableRows = []
    _.each(this.state.firstNames, (value, index) => {
      TableRows.push(
        <tr key={index}>
          <td>{ETHEREUM_CLIENT.utils.toAscii(this.state.firstNames[index])}</td>
          <td>{ETHEREUM_CLIENT.utils.toAscii(this.state.lastNames[index])}</td>
          <td>{this.state.ages[index]}</td>
        </tr>
      )
    })
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to a DApp built with React</h2>
        </div>
        <div className="App-Content">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
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
