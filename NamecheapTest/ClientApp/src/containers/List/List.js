import React, { Component } from "react";
import { Link } from "react-router-dom";

import Selfie from "../../components/Selfie/Selfie";
import SelfieList from "../../components/Selfie/List";
import axios from "../../axios";
import Spinner from "../UI/Spinner/Spinner";

class List extends Component {
    state = {
        users: [],
        detailedUser: {},
        showDetails: false,
        empty: false
    };

    componentWillMount() {
        axios.get("api/users")
            .then(res => {
                if (!res.data.Success) {
                    return console.log(res);
                }
                const firebaseUsers = JSON.parse(res.data.Result);
                if (!firebaseUsers) {
                    this.setState({
                        empty: true
                    });
                    return;
                }
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
                    users: users,
                    empty: false
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

    ShowList = () => {
        this.setState({
            showDetails: false
        });
    };

    render() {
        let container = null;
        
        if (this.state.users.length === 0) {
            container = (<div className="empty-list">There is no selfie stored, you can add one clicking <Link to="/" exact>here</Link></div>);
        }
        else {
            if (this.state.showDetails) {
                container = (
                    <div>
                        <Selfie user={this.state.detailedUser} />
                        <button onClick={this.ShowList}>Back</button>
                    </div>
                );
            }
            else {
                container = <SelfieList
                    users={this.state.users}
                    clicked={this.ShowUserDetails} />;
            }
        }
        return (
            <div>
                <h2>Selfie List</h2>
                {container}
            </div>
        );
    }
}



export default List;
