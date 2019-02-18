import React, { Component } from 'react';
import { Form } from './ChatComponents';

export default class ContactForm extends Component {

    state = {
        name: ''
    }

    render() {
        return (
            <Form>
                <input type="text" placeholder="Enter your name" />

                <input type="submit" />
            </Form>
        );
    }

}