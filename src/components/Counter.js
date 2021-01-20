import React from 'react';
import { observer, inject } from "mobx-react";
import styled from 'styled-components';

@inject("TestStore")
@observer
class Counter extends React.Component {
    render() {
        return (
            <div>
                <p>value : {this.props.TestStore.value}</p>
                <button onClick={this.props.TestStore.increaseValue}>+</button>
                <button onClick={this.props.TestStore.decreaseValue}>-</button>
            </div>
        );
    }
}

export default Counter;