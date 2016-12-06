import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import _ from 'lodash';

const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const PEOPLE_CONTRACT_ABI = '[{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"type":"function"}]';

const peopleContractAddress = "0x971423110e79bbcaa1795cf76d6878f7fa5cdc5c";

const contract = ETHEREUM_CLIENT.eth.contract(JSON.parse(PEOPLE_CONTRACT_ABI)).at(peopleContractAddress);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNames: "",
      lastNames: "",
      ages: ""
    }
  }
  componentWillMount () {
    const data = contract.getPeople();
    this.setState({
      firstNames: String(data[0]).split(','),
      lastNames: String(data[1]).split(','),
      ages: data[2]
    })
  }
  
  render() {
    let tableRows = [];
    // Lodash way to map data for each item.
    // _.each(this.state.firstNames, (value, index) => {
    //   console.log("STATE:", this.state, ETHEREUM_CLIENT.toAscii(value), index)
    //   tableRows.push(
    //     <tr key={index}>
    //       <td>{ETHEREUM_CLIENT.toAscii(this.state.firstNames[index])}</td>
    //       <td>{ETHEREUM_CLIENT.toAscii(this.state.lastNames[index])}</td>
    //       <td>{this.state.ages[index]}</td> 
    //     </tr>
    //   )
    // });
    console.log(this.state)
    this.state.firstNames.map((value, index)=> {
      tableRows.push(
        <tr key={index}>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.firstNames[index])}</td>
          <td>{ETHEREUM_CLIENT.toAscii(this.state.lastNames[index])}</td>
          <td>{ETHEREUM_CLIENT.toDecimal(this.state.ages[index])}</td> 
        </tr>
      )
    });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to PeopleList powered by React</h2>
        </div>
        <div className="App-Content">
          <table>
            <thead>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
