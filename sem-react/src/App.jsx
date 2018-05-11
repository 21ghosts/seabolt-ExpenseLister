import React, { Component } from 'react';
//import logo from './logo.svg';
import ExpenseHandler from './ExpenseHandler'
import './App.css';



class App extends Component {
    render() {
        return (
            <div className="App">
                <ExpenseHandler/>
            </div>
        );
    }
}



export default App;
