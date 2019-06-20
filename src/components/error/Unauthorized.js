import React, { Component } from 'react'
import ErrorLayout from '../common/ErrorLayout';

export default class Unathorized extends Component {
    render() {
        return (
            <ErrorLayout code='401' message='Unauthorized'/>
        )
    }
}