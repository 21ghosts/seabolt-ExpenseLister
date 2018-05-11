import React, { Component } from 'react';
import { Table, Label, Alert, Nav, NavItem } from 'react-bootstrap';

class ExpenseRow extends Component {
    constructor(props) {
        super(props);

        this.hanEditClickRow = this.hanEditClickRow.bind(this);
    }

    hanEditClickRow(e) {
        e.preventDefault();
        this.props.onEditClick(this.props.id);
    }

    render() {
        var status = this.props.expense.status ? <Label bsStyle="primary">paid</Label> : <Label bsStyle="danger">not paid</Label>;
        var moment = require('moment');
        return (
            <tr onClick={this.hanEditClickRow}>
                <td>{this.props.expense.description}</td>
                <td>{this.props.expense.value}</td>
                <td className={this.props.status}>{status}</td>
                <td>{moment(this.props.expense.date).format("DD/MM/YYYY HH:mm")}</td>
            </tr>
        );
    }
}

class ExpenseNav extends Component {
    constructor(props) {
        super(props);

        this.handleSelectTab = this.handleSelectTab.bind(this);
    }

    handleSelectTab(eventKey) {
        event.preventDefault();
        this.props.onSelectTab(eventKey);
    }

    render() {
        return (
            <Nav bsStyle="tabs" activeKey={this.props.tab} onSelect={this.handleSelectTab}>
                <NavItem eventKey="1" title="All"><Label bsStyle="warning">All</Label></NavItem>
                <NavItem eventKey="2" title="Paid"><Label bsStyle="primary">Paid</Label></NavItem>
                <NavItem eventKey="3" title="NotPaid"><Label bsStyle="danger">Not Paid</Label></NavItem>
            </Nav>
        );
    }
}

class TableHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: '1',
            status: '',
        };

        this.hanEditClick = this.hanEditClick.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    hanEditClick(id) {
        this.props.onEdit(id);
    }

    handleSelect(eventKey) {
        var status = '';
        if (eventKey !== '1') {
            status = 'status';
        }
        this.setState({
            tab: eventKey,
            status: status,
        });
    }

    prepareRows() {
        var expenses = this.props.expenses.slice();
        if (this.state.tab === '1') {
            return expenses;
        } else {
            var rows = [];
            expenses.forEach((expense) => {
                if (this.state.tab === '2' & expense.status) {
                    rows.push(expense);
                } else if (this.state.tab === '3' & !expense.status) {
                    rows.push(expense);
                }
            });
            return rows;
        }
    }

    render() {
        var expenses = this.prepareRows();
        var rows = [];
        expenses.forEach((expense) => {
            rows.unshift(
                <ExpenseRow
                    expense={expense}
                    id={expense.id}
                    key={expense.id}
                    status={this.state.status}
                    onEditClick={this.hanEditClick}
                />
            );
        });

        return (
            <div className="expense-table">
                <h3>Listed Expense(s)</h3>
                <Alert>Click listed expense to edit</Alert>

                <ExpenseNav
                    tab={this.state.tab}
                    onSelectTab={this.handleSelect}
                />

                <Table responsive bordered>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Value ($)</th>
                            <th className={this.state.status}>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default TableHandler;
