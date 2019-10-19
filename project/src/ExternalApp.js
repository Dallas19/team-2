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
import { PowerSelect } from 'react-power-select';
import 'react-power-select/dist/react-power-select.css';

import "./App.css";

var json = require('./data.json'); //(with path)
var impactArea = '';
var investmentName = '';

var impacts;
var investments;
var data = [];


function impacthandleChange(imp) {
    impactArea = imp.option; 
    var changed = false;
    for(var i = 0; i < impacts.length; i++) {
        if(impacts[i] == impactArea) {
            for(var j = 0; j < investments.length; j++) {
                if(investments[j] == investmentName) {
                    changed = true;
                    window.location.replace('#/action-' + i + '8008' + j);
                    window.location.reload();
                }
            }
            if(!changed) {
                window.location.replace('#/action-' + i + '8008' + 4);
                window.location.reload();
            }
        }
    }    
}

function investmenthandleChange(invests) {
    investmentName = invests.option;  
    var changed = false;
    for(var i = 0; i < investments.length; i++) {
        if(investments[i] == investmentName) {
            for(var j = 0; j < impacts.length; j++) {
                if(impacts[j] == impactArea) {
                    changed = true;
                    window.location.replace('#/action-' + j + '8008' + i);
                    window.location.reload();
                }
            }
            if(!changed) {
                window.location.replace('#/action-' + 4 + '8008' + i);
                window.location.reload();
            }
        }
    }  
}

const ImpactDropdown = ({ children }) => {
    const [show, toggleShow] = React.useState(true);

    impacts = getImpactAreas();

    var url = window.location.href;

    url = url.replace('http://localhost:3000/external#/action-', '');
    var InvestTargetMet = '';
    var target = '';
    var idata;
    var split = url.split('8008');

    

    // Impacts
    if(parseInt(split[0]) != 4) {
        console.log(split[0]);
        impactArea = impacts[parseInt(split[0])];
        console.log(impactArea);
        var targetMet = "Currently on pace to meet target";
        var vals = getImpactCount();
        var julyCount = vals[0];
        var augustCount = vals[1];
        var septCount = vals[2];
        var totalCount = vals[3];
        var totalTarget = vals[4];
        var projected = vals[5];
        if(projected < totalTarget) {
            targetMet = "Currently NOT on pace to meet target";
        }

        data = [
            {point: 1, people: julyCount},
            {point: 2, people: augustCount},
            {point: 3, people: septCount},
            {point: 4, people: totalCount},
            {point: 5, people: totalTarget},
            {point: 6, people: projected}
        ];
        console.log(data);
    }
    investments = getInvestment();
    // Investments
    if(parseInt(split[1]) != 4) {
        // get investments
        //investments = getInvestment();
        investmentName = investments[parseInt(split[1])];
        InvestTargetMet = "Currently on pace to meet target";
        var ivals = getInvestmentCount();
        var ijulyCount = ivals[0];
        var iaugustCount = ivals[1];
        var iseptCount = ivals[2];
        var itotalCount = ivals[3];
        var itotalTarget = ivals[4];
        var iprojected = ivals[5];
        if(iprojected < itotalTarget) {
            InvestTargetMet = "Currently NOT on pace to meet target";
        }
        idata = [
            {point: 1, people: ijulyCount},
            {point: 2, people: iaugustCount},
            {point: 3, people: iseptCount},
            {point: 4, people: itotalCount},
            {point: 5, people: itotalTarget},
            {point: 6, people: iprojected}
        ];
    }

    return (
        <>
            
            <h1 className="Select Impact Area">Select Impact Area</h1>
            <PowerSelect
                options={impacts}
                selected={impactArea}
                onChange={impacthandleChange}
            />
            <Container className="graphContainer">
            <div>
                <h1>Impact Area Chart</h1>
                <h1 className="needs-help">{targetMet}</h1>
                <VictoryChart 
                    width = {500}
                    domainPadding = {25} theme={VictoryTheme.material} 

                >
                    <VictoryAxis
                        tickValues={["Jul 19", "Aug 19", "Sep 19", "Total", "Target", "Projected"]}
                    />
                    <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => `${x / 1000}k`}
                    />
                    <VictoryBar
                    data={data}
                    labels={({ datum }) => `${datum.people}`}
                    x={"point"}
                    y={"people"}
                    
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    />
                </VictoryChart>
             </div>
             <h1 className="Select Investments">Select Investments</h1>
            <PowerSelect
                options={investments}
                selected={investmentName}
                onChange={investmenthandleChange}
            />
             <div>
                 <h1>Investment Area Chart</h1>
                 <h1 className="program-needs-help">{InvestTargetMet}</h1>
                 <VictoryChart 
                    width = {500}
                    domainPadding = {25} theme={VictoryTheme.material} 
                >
                    <VictoryAxis
                        tickValues={["Jul 19", "Aug 19", "Sep 19", "Total", "Target", "Projected"]}
                    />
                    <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => `${x/1000}k`}
                    />
                    <VictoryBar
                    data={idata}
                    labels={({ datum }) => `${datum.people}`}
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

const ExternalApp = () => (
    <Container className="p-3">
        <Jumbotron fluid>
            <h1 className="header">United Way of San Antonio</h1>
        </Jumbotron>
        <ImpactDropdown className="ImpactDropdown">
             
        </ImpactDropdown>
        
    </Container>
);
  
function getImpactCount() {
    var totalCount = 0;
    var totalTarget = 0;
    var julyCount = 0;
    var augustCount = 0;
    var septCount = 0;
    var set = new Set();
    for(var i = 0; i < json.length; i++) {
        if(json[i]['Impact_Area'] == impactArea) {
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
    var projected =  Math.round(12.0 * totalCount / 3.0);
    return[julyCount, augustCount, septCount, totalCount, totalTarget, projected];
}

function getInvestmentCount() {
    var totalCount = 0;
    var totalTarget = 0;
    var julyCount = 0;
    var augustCount = 0;
    var septCount = 0;
    for(var i = 0; i < json.length; i++) {
        if(json[i]['Investment_Name'] == investmentName){
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
    var projected =  Math.round(12.0 * totalCount / 3.0);
    return[julyCount, augustCount, septCount, totalCount, totalTarget, projected];
}

function getInvestment() {
    var set = new Set();
    for(var i = 0; i < json.length; i++) {
        set.add(json[i]['Investment_Name']);
    }
    var investments = Array.from(set);
    return investments;
}

function getImpactAreas() {
    var set = new Set();
    for(var i = 0; i < json.length; i++) {
        set.add(json[i]['Impact_Area'])
    }
    var impacts = Array.from(set);
    return impacts;
}

export default ExternalApp;
