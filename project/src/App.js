import React from 'react';
import logo from './logo.svg';
import './App.css';
import XLSX from 'xlsx';

import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";


import "./App.css"

const StrategiesDropdown = ({ children }) => {
    const [show, toggleShow] = React.useState(true);

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Strategies
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
            <h1 className="header">United Way of San Antonio</h1>
        </Jumbotron>
        <StrategiesDropdown className="dropdown-strategies">
            Strategies
            <span role="img" aria-label="tada">
          🎉
        </span>
        </StrategiesDropdown>
        <Container className="graphContainer">
            <h1>--Insert Graph Here--</h1>
        </Container>
    </Container>
);

export default App;
