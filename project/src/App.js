import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import XLSX from 'xlsx';
import * as chart_values from './data.json';

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
var program = '';

var strategies;
var programs;
var data = [];


function handleChange(strat) {
    console.log(strat.option);
    strategy = strat.option; 
    for(var i = 0; i < strategies.length; i++) {
        if(strategies[i] == strategy) {
            window.location.replace('#/action-' + i);
        }
    }    
}

function handleChangeP(program) {
    console.log(program.option);
    program = program.option; 
    var strat = 0;
    for(var i = 0; i < strategies.length; i++) {
        if(strategies[i] == strategy) {
            strat = i;
            break;
        }
    }
    for(var i = 0; i < programs.length; i++) {
        if(programs[i] == program) {
            window.location.replace('#/action-' + strat + '000' + i);
        }
    }
}

const StrategiesDropdown = ({ children }) => {
    const [show, toggleShow] = React.useState(true);
    //const [strategy] = React.useState("");

    strategies = getStrategies();

    var url = window.location.href;

    url = url.replace('http://localhost:3000/#/action-', '');
    programTargetMet = '';
    var pdata;
    // now, we need to do the program matching as well
    if((url.includes('000'))) {
        var split = url.split('000');
        strategy = strategies[parseInt(split[0])];
        // SOME GET PROGRAMS THING
        programs = getPrograms();
        console.log(programs);
        program = programs[parseInt(split[1])];
        var programTargetMet = "Currently on pace to meet target";
        var pvals = getProgramCount();
        var pjulyCount = pvals[0];
        var paugustCount = pvals[1];
        var pseptCount = pvals[2];
        var ptotalCount = pvals[3];
        var ptotalTarget = pvals[4];
        var pprojected = pvals[5];
        if(pprojected < ptotalTarget) {
            programTargetMet = "Currently NOT on pace to meet target";
        }
        pdata = [
            {point: 1, people: pjulyCount},
            {point: 2, people: paugustCount},
            {point: 3, people: pseptCount},
            {point: 4, people: ptotalCount},
            {point: 5, people: ptotalTarget},
            {point: 6, people: pprojected}
        ];
        console.log(pdata);
    }
    else {
        strategy = strategies[parseInt(url)];
        programs = getPrograms();
    }

    var targetMet = "Currently on pace to meet target";
    var vals = getStrategyCount();
    var julyCount = vals[0];
    var augustCount = vals[1];
    var septCount = vals[2];
    var totalCount = vals[3];
    var totalTarget = vals[4];
    var projected = vals[5];
    if(projected < totalTarget) {
        targetMet = "Currently NOT on pace to meet target";
    }
    const data = [
        {point: 1, people: julyCount},
        {point: 2, people: augustCount},
        {point: 3, people: septCount},
        {point: 4, people: totalCount},
        {point: 5, people: totalTarget},
        {point: 6, people: projected}
    ];

    //console.log(data);
    console.log(programs);
    return (
        <>
            <h1 className="Select Strategy">Select Strategy</h1>
            <PowerSelect
                options={strategies}
                selected={strategy}
                onChange={handleChange}
            />
            <h1 className="Select Program">Select Program</h1>
            <PowerSelect
                options={programs}
                selected={program}
                onChange={handleChangeP}
            />
            <Container className="graphContainer">
            <div>
                <h1>Strategy Chart</h1>
                <h1 className="needs-help">{targetMet}</h1>
                <VictoryChart 
                    width = {500}
                    domainPadding = {25} theme={VictoryTheme.material} 
                    horizontal = {true}

                >
                    <VictoryAxis
                        tickValues={["Jul 19", "Aug 19", "Sep 19", "Total", "Target", "Proj"]}
                    />
                    <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => `${x} people`}
                    />
                    <VictoryBar
                    data={data}
                    x={"point"}
                    y={"people"}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    />
                </VictoryChart>
             </div>
             <div>
                 <h1>Program Chart</h1>
                 <h1 className="program-needs-help">{programTargetMet}</h1>
                 <VictoryChart 
                    width = {500}
                    domainPadding = {25} theme={VictoryTheme.material} 
                    horizontal = {true}
                >
                    <VictoryAxis
                        tickValues={["Jul 19", "Aug 19", "Sep 19", "Total", "Target", "Proj"]}
                    />
                    <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => `${x} people`}
                    />
                    <VictoryBar
                    data={pdata}
                    x={"point"}
                    y={"people"}
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    />
                </VictoryChart>
             </div>

        </Container>
        </>
    );
};

const App = () => (
    <Container className="p-3">
        <Jumbotron fluid>
            <h1 className="header">United Way of San Antonio</h1>
        </Jumbotron>

        
        <StrategiesDropdown className="dropdown-strategies">
            Strategies
        </StrategiesDropdown>
        
    </Container>
);
  
function getStrategyCount() {
    var totalCount = 0;
    var totalTarget = 0;
    var julyCount = 0;
    var augustCount = 0;
    var septCount = 0;
    var set = new Set();
    for(var i = 0; i < json.length; i++) {
        if(json[i]['Strategy_Name'] == strategy) {
            if(json[i]["Unique Count July 2019"] != "") {
                julyCount += json[i]["Unique Count July 2019"];
            } 
            if(json[i]["Unique Count August 2019"] != "") {
                augustCount += json[i]["Unique Count August 2019"];
            } 
            if(json[i]["Unique Count September 2019"] != "") {
                septCount += json[i]["Unique Count September 2019"];
            } 
            if(json[i]["Annual Target (if applicable)"] != "") {
                totalTarget += json[i]["Annual Target (if applicable)"];
            } 
        }
    }
    var totalCount = (julyCount + augustCount + septCount);
    var projected =  Math.round(11.0 * ((septCount - augustCount) + (augustCount - julyCount)) / 2.0 + julyCount);
    if(projected < 0) projected = 0;
    return[julyCount, augustCount, septCount, totalCount, totalTarget, projected];
}

function getProgramCount() {
    var totalCount = 0;
    var totalTarget = 0;
    var julyCount = 0;
    var augustCount = 0;
    var septCount = 0;
    for(var i = 0; i < json.length; i++) {
        if(json[i]['Strategy_Name'] == strategy && json[i]['Program_Name'] == program) {
            if(json[i]["Unique Count July 2019"] != "") {
                julyCount += json[i]["Unique Count July 2019"];
            } 
            if(json[i]["Unique Count August 2019"] != "") {
                augustCount += json[i]["Unique Count August 2019"];
            } 
            if(json[i]["Unique Count September 2019"] != "") {
                septCount += json[i]["Unique Count September 2019"];
            } 
            if(json[i]["Annual Target (if applicable)"] != "") {
                totalTarget += json[i]["Annual Target (if applicable)"];
            } 
        }
    }
    totalCount = (julyCount + augustCount + septCount);
    var projected =  Math.round(11.0 * ((septCount - augustCount) + (augustCount - julyCount)) / 2.0 + julyCount);
    if(projected < 0) projected = 0;
    return[julyCount, augustCount, septCount, totalCount, totalTarget, projected];
}

function getStrategies() {
    var set = new Set();
    for(var i = 0; i < json.length; i++) {
        set.add(json[i]['Strategy_Name']);
    }
    var strats = Array.from(set);
    return strats;
}

function getPrograms() {
    var set = new Set();
    for(var i = 0; i < json.length; i++) {
        console.log(json[i]['Strategy_Name']);
        console.log(strategy);
        if(json[i]['Strategy_Name'] == strategy) {
            console.log("i get here");
            set.add(json[i]['Program_Name']);
        }
    }
    var progs = Array.from(set);
    return progs;
}

export default App;