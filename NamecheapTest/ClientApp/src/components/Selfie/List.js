import React from "react";

const list = (props) => {
    const tableRow = props.users.map(user => (
        <tr key={`user${props.users.indexOf(user)}`}>
            <td><label onClick={() => props.clicked(user)}>{user.email}</label></td>
            <td>{user.name}</td>
        </tr>
    ));
    return (
        <table>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {tableRow}
            </tbody>
        </table>
    );
};

export default list;