import React, { Component } from "react";

import Selfie from "./Selfie";
import axios from "../axios";
import Spinner from "./Spinner";

class List extends Component {
    state = {
        users: [],
        detailedUser: {},
        showDetails: false
    };

    componentWillMount() {
        axios.get("api/users")
            .then(res => {
                if (!res.data.Success) {
                    return console.log(res);
                }
                const firebaseUsers = JSON.parse(res.data.Result);
                const users = [];
                Object.keys(firebaseUsers).forEach(idx => users.push(firebaseUsers[idx]));
                users.forEach(user => {
                    Object.keys(user).forEach(key => {
                        let actualKey = key.charAt(0).toLowerCase() + key.slice(1);
                        if (actualKey === "selfieUrl") actualKey = "selfie";
                        else if (actualKey === "automaticCaptureUrls") actualKey = "automaticCaptures";
                        user[actualKey] = user[key];
                        delete user[key];
                    });
                });
                this.setState({
                    users: users
                });
            })
            .catch(err => {
                console.log("List", err);
            });
    }

    ShowUserDetails = (user) => {
        this.setState({
            showDetails: true,
            detailedUser: user
        });
    };

    render() {
        const container = this.state.users.length === 0 ? <Spinner /> :
            this.state.showDetails ? <Selfie user={this.state.detailedUser} /> : (
                    <table>
                        <thead>
                            <th>Email</th>
                            <th>Name</th>
                        </thead>
                        <tbody>
                            {this.state.users.map(user => (
                                <tr>
                                    <td><label onClick={() => this.ShowUserDetails(user)}>{user.email}</label></td>
                                    <td>{user.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    );
            return (
            <div>
                <h2>Selfie List</h2>
                {container}
            </div>
        );
    }
}



export default List;
