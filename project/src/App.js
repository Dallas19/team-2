import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import XLSX from 'xlsx';
import * as chart_values from './data.json';
import logo_ from './img/logo_small.png'

import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

import { VictoryBar,VictoryChart,VictoryAxis,VictoryTheme } from 'victory';
import { PowerSelect } from 'react-power-select'
 import 'react-power-select/dist/react-power-select.css'

import "./App.css";

var json = require('./data.json'); //(with path)
var strategy = '';

var strategies;
var strategy;


function handleChange(strat) {
    console.log(strat.option);
    strategy = strat.option; 
}

const StrategiesDropdown = ({ children }) => {
    //const [show, toggleShow] = React.useState(true);
    const [strategy] = React.useState("");
    
    setStrategy()

    var targetMet = "Currently on pace to meet target";
    var vals = getStrategyCount('hello!');
    var totalCount = vals[0];
    var totalTotal = vals[1];
    var projected = vals[2];
    if(projected < totalTotal) {
        targetMet = "Currently NOT on pace to meet target";
    }
    console.log(targetMet);
    console.log(chart_values);
    console.log('strategies');
    
    strategies = getStrategies();

    function setStrategy(state, action) {
        this.strategy = state;
    }

    return (
        <>
            {/* <PowerSelect
                options={strategies}
            /> */}
            <PowerSelect
                options={strategies}
                selected={this.strategy}
                onChange={setStrategy}
            />
            {/* <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Strategies
                    <span role="img" aria-label="tada">
                        🎉
                    </span>
                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                    
                    {/* <Dropdown.Item href="#/action-1">Strategy One</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Strategy Two</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Strategy Three</Dropdown.Item> */}
                {/* </Dropdown.Menu> */}
            {/* </Dropdown> */} 
        </>
    );
};

const App = () => (
    <Container className="p-3">
        <Jumbotron fluid>
            <h1 className="header">United Way of San Antonio
                <img src={logo_} alt="Logo"/>
            </h1>
        
        </Jumbotron>

        
        <StrategiesDropdown className="dropdown-strategies">
            Strategies
        </StrategiesDropdown>
        <Container className="graphContainer">
            <div>
                <VictoryChart domainPadding = {50} theme={VictoryTheme.material}>
                    <VictoryAxis
                        tickValues={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
                    />
                    <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`$${x / 1000}k`)}
                    />
                    <VictoryBar
                    data={data}
                    x={"quarter"}
                    y={"earnings"}
                    />
                </VictoryChart>
             </div>

        </Container>
    </Container>
);

const data = [
    {quarter: 1, earnings: 13000},
    {quarter: 2, earnings: 16500},
    {quarter: 3, earnings: 14250},
    {quarter: 4, earnings: 19000}
  ];
  
function getStrategyCount(strategy) {
    var totalCount = 0;
    var totalTarget = 0;
    console.log(strategy);
    console.log('json length is ' + json.length);
    var set = new Set();
    for(var i = 0; i < json.length; i++) {
        set.add(json[i]['Strategy_Name']);
        // if(json[i]['Strategy_Name'] == "Provide and/or build capacity for organizations that offer education and workforce development to clients at or below 200% of FPL. (Indicator 1)") {
        //     //totalCount += json[i]["Unique Count July 2019"];
        //     //totalCount += json[i]["Unique Count August 2019"];
        //     //totalCount += json[i]["Unique Count September 2019"];
        //     if(json[i]["Annual Target (if applicable)"] != "") {
        //         totalTarget += json[i]["Annual Target (if applicable)"];
        //     } 
        // }
    }
    console.log(set);
    console.log(totalCount + ' and target is ' + totalTarget);
    return[totalCount, totalTarget, 0];
}

function getStrategies() {
    var set = new Set();
    for(var i = 0; i < json.length; i++) {
        set.add(json[i]['Strategy_Name']);
    }
    var strats = Array.from(set);
    console.log('strats');
    console.log(strats);
    return strats;
}

export default App;