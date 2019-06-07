import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';

class Credits extends Component {
    constructor () {
        super()
        this.state = {
            creditTotal: 0,
            data: []
        }
    }

    componentDidMount(){
        fetch('https://moj-api.herokuapp.com/credits', {method: "GET"}) 
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            this.setState({ data }, function(){
                console.log(this.state.data);
                let totalspent=0;
                this.state.data.forEach(element => {
                    totalspent+=element.amount;
                });
                console.log(totalspent);
                this.setState( {creditTotal: totalspent}, function(){
                    console.log(this.state.creditTotal);
                });
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
                <h1>Credits</h1>
                <table id="creditsTable">
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

export default Credits;