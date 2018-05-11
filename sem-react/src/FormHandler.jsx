import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox, Button } from 'react-bootstrap';


class FormHandler extends Component {
    constructor(props) {
        super(props);

        this.hanDesChange = this.hanDesChange.bind(this);
        this.hanValChange = this.hanValChange.bind(this);
        this.hanStatChange = this.hanStatChange.bind(this);
        this.hanFormSub = this.hanFormSub.bind(this);
    }

    getValStatDes() {
        if (this.props.description.length === 0) return null;
        else if (this.props.description.length < 4) return 'error';
        else return 'success';
    }

    getValStatVal() {
        if (this.props.value.length === 0) return null;
        else if (isNaN(this.props.value)) return 'error';
        else return 'success';
    }

    hanDesChange(e) {
        e.preventDefault();
        this.props.onDescription(e.target.value);
    }

    hanValChange(e) {
        e.preventDefault();
        this.props.onValue(e.target.value);
    }

    hanStatChange(e) {
        this.props.onStatus();
    }

    getVal() {
        if (this.getValStatDes() === 'error' || this.getValStatVal() === 'error') return false;
        else if (this.getValStatDes() === null || this.getValStatVal() === null) return false;
        return true;
    }

    hanFormSub(e) {
        e.preventDefault();
        if (this.getVal()) this.props.onForm();
        else {
            alert('fill fields correctly.');
        }
    }

    render() {
        return (
            <div className="expense-f">
                <h3>Expense Information</h3>
                <form onSubmit={this.hanFormSub}>
                    <FormGroup
                        controlId="description"
                        validationState={this.getValStatDes()}
                    >
                        <ControlLabel>Description</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.description}
                            placeholder="Describe Expense here"
                            onChange={this.hanDesChange}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>4 character minimum</HelpBlock>
                    </FormGroup>

                    <FormGroup
                        controlId="value"
                        validationState={this.getValStatVal()}
                    >
                        <ControlLabel>Value ($)</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.props.value}
                            placeholder="Insert value"
                            onChange={this.hanValChange}
                        />
                        <FormControl.Feedback />
                        <HelpBlock>Has to be a number</HelpBlock>
                    </FormGroup>

                    <Checkbox
                        onClick={this.hanStatChange}
                        checked={this.props.status}
                    >
                        Paid?
          </Checkbox>

                    <Button
                        type="submit"
                    >
                        Save Expense
          </Button>

                </form>

            </div>
        );
    }
}

export default FormHandler;
