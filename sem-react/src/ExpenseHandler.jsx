import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import FormHandler from './FormHandler';
import TableHandler from './TableHandler';

class ExpenseHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            description: '',
            value: '',
            status: false,
            date: '',
            expenses: [],
            index: -1,
        };

        this.hanDes = this.hanDes.bind(this);
        this.hanVal = this.hanVal.bind(this);
        this.hanStatus = this.hanStatus.bind(this);
        this.hanForm = this.hanForm.bind(this);

        this.hanEdit = this.hanEdit.bind(this);
    }

    generateId() {
        return this.state.expenses.length + 1;
    }

    updateExp() {
        this
            .state
            .expenses
            .splice(
                this.state.index,
                1,
                {
                    id: this.state.id,
                    description: this.state.description,
                    value: this.state.value,
                    status: this.state.status,
                    date: this.state.date,
                }
            );
        this.setState({
            index: -1,
        });
    }

    newExp() {
        this.state.expenses.push(
            {
                id: this.generateId(),
                description: this.state.description,
                value: this.state.value,
                status: this.state.status,
                date: Date.now(),
            }
        );
    }

    hanDes(description) {
        this.setState({
            description: description,
        });
    }

    hanVal(value) {
        this.setState({
            value: value,
        });
    }

    hanStatus() {
        this.setState({
            status: !this.state.status,
        });
    }

    hanForm() {
        if (this.state.index === -1) {
            this.newExp();
        } else {
            this.updateExp();
        }
        this.setState({
            id: '',
            description: '',
            value: '',
            status: false,
            date: '',
        });
    }

    hanEdit(id) {
        var index = this.state.expenses.findIndex((expense) => { return expense.id === id });
        this.setState({
            index: index,
        });
        var expense = this.state.expenses[index];
        this.setState({
            id: expense.id,
            description: expense.description,
            value: expense.value,
            status: expense.status,
            date: expense.date,
        });
    }

    render() {
        return (
            <div className="container">
                <div className="expense-manager">
                    <div className="row">
                        <Col md={6}>
                            <FormHandler
                                description={this.state.description}
                                value={this.state.value}
                                status={this.state.status}
                                onDescription={this.hanDes}
                                onValue={this.hanVal}
                                onStatus={this.hanStatus}
                                onForm={this.hanForm}
                            />
                        </Col>
                        <Col md={6}>
                            <TableHandler
                                expenses={this.state.expenses}
                                onEdit={this.hanEdit}
                            />
                        </Col>
                    </div>

                </div>
            </div>
        );
    }
}

export default ExpenseHandler;
