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

const ExampleToast = ({ children }) => {
    const [show, toggleShow] = React.useState(true);

    return (
        <>
            {!show && <Button onClick={() => toggleShow(true)}>Internal View</Button>}
            <Toast show={show} onClose={() => toggleShow(false)}>
                <Toast.Header>
                    <strong className="mr-auto">Strategies</strong>
                </Toast.Header>
                <Toast.Body>{children}</Toast.Body>
            </Toast>
        </>
    );
};

const App = () => (
    <Container className="p-3">
        <Jumbotron>
            <h1 className="header">United Way of San Antonio</h1>
            <ExampleToast className="toast">
                Strategies
                <span role="img" aria-label="tada">
          🎉
        </span>
            </ExampleToast>
        </Jumbotron>
    </Container>
);

export default App;
