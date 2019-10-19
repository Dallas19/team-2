import React from 'react';
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


import "./App.css"

const StrategiesDropdown = ({ children }) => {
    const [show, toggleShow] = React.useState(true);
    console.log(chart_values);
    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Strategies
                    <span role="img" aria-label="tada">
                        🎉
                    </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Strategy One</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Strategy Two</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Strategy Three</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
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
  
  

export default App;
