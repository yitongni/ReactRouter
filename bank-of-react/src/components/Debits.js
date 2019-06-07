import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Debits extends Component {
    constructor () {
        super()
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        fetch('https://moj-api.herokuapp.com/debits', {method: "GET"}) 
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            this.setState({ data }, function(){
                console.log(this.state.data);
            })
        }).catch(error => { throw (error) })
    }
    render() {
        let debits=this.state.data.map(item=>(
                <tr key={item.id}>
                    <td>{(item.description)}</td>
                    <td>{(item.amount)}</td>
                    <td>{(item.date)}</td>
                </tr>
        ))
        return (
            <div>
                <h1>Debits</h1>
                <table id="debitTable">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {debits}
                    </tbody>
                    
                </table>

                <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
        );
    }
}

export default Debits;