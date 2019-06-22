import React from "react";

const selfie = (props) => {
    const automaticCaptures = props.user.automaticCaptures.map(capture => <img key={props.user.automaticCaptures.indexOf(capture)} src={capture} alt="" />);
    return (
        <div>
            <div>
                <label>Name:</label>
                <span>{props.user.name}</span>
            </div>
            <div>
                <label>Email:</label>
                <span>{props.user.email}</span>
            </div>
            <div>
                <label>Selfie:</label>
                <img src={props.user.selfie} alt="" />
            </div>
            <div>
                <label>Automatic Captures:</label>
                {automaticCaptures}
            </div>
        </div>
    );
};

export default selfie;