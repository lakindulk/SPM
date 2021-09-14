import React, { Component } from 'react';
import axios from 'axios';
import '../Components/adminAddNotice.css';


const initialstate = {
    fullname: '',
    email: '',
    message: ''
}



class adminContactMsgs extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate;
        this.state = {
            contacts: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:6500/contactus/')
            .then(response => {

                this.setState({ contacts: response.data.data });

            })
            .catch(function (error) {
                alert('error in get contact messages to admin');
                console.log(error);
            })

    }




    render() {
        return (
            <div style={{ marginTop: '30px' }}>

                <h2>Contact Messages</h2>
                <div style={{ width: '1200px', marginLeft: '80px', marginBottom: '40px' }}>
                    <table className="table table-bordered" style={{ marginTop: 20, marginLeft: 20, marginRight: 50 }}>
                        <thead>
                            <tr className="table-dark">
                                <th>Sender Name</th>
                                <th>Sender Email</th>
                                <th>Contact Message</th>
                            </tr>
                        </thead>
                        <tbody className="table-light">
                            {this.state.contacts.length > 0 && this.state.contacts.map((item, index) =>
                            (
                                <tr>
                                    <th scope="row">{item.fullname}</th>
                                    <td>{item.email}</td>
                                    <td>{item.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }
}

export default adminContactMsgs;