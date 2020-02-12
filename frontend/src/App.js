import React from 'react';
import logo from './logo.svg';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.css';


class ToastFlow extends React.Component {

    constructor(props) {
        super(props);
        this.state= {show: true};
    }

    toggleShow(value) {
        this.setState({show: value})
    }

    render() {
        const {show} = this.state;

        return (
            <>
                {!show && <Button onClick={() => this.toggleShow(true)}>Show Toast</Button>}
                <Toast show={show} onClose={() => this.toggleShow(false)}>
                    <Toast.Header>
                        <strong className="mr-auto">React-Bootstrap</strong>
                    </Toast.Header>
                    <Toast.Body>{this.children}</Toast.Body>
                </Toast>
            </>
        );
    }
};


class App extends React.Component {
    render() {
        return (
            <Container className="p-3">
                <Jumbotron>
                    <h1 className="header">Welcome To React-Bootstrap</h1>
                    <ToastFlow className="toast">
                        We now have Toasts
                        <span role="img" aria-label="tada"></span>
                    </ToastFlow>
                </Jumbotron>
            </Container>
        )
    }
}

export default App;
