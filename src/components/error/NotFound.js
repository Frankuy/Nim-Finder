import React, { Component } from 'react'
import ErrorLayout from '../common/ErrorLayout';

export default class NotFound extends Component {
    render() {
        return (
            <ErrorLayout code='404' message='Page Not Found'/>
        )
    }
}
