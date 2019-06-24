import React from "react";

const selfie = (props) => {
    if (!props.user) {
        return <div className="ErrorMessage">No user stored</div>;
    }
    const nameContainer = props.user.name ? <span>{props.user.name}</span> : <span>Name is not set</span>;
    const emailContainer = props.user.email ? <span>{props.user.email}</span> : <span>Email is not set</span>;
    const selfieContainer = props.user.selfie ? <img src={props.user.selfie} alt="" /> : <span className="selfie">Selfie is not captured</span>;
    const automaticCapturesContainer = props.user.automaticCaptures && props.user.automaticCaptures.length > 0 ? props.user.automaticCaptures.map(capture => <img key={props.user.automaticCaptures.indexOf(capture)} src={capture} alt="" />) : <span className="automatic-captures">No automatic captures were retrieved</span>;
    return (
        <div>
            <div>
                <label>Name:</label>
                {nameContainer}
            </div>
            <div>
                <label>Email:</label>
                {emailContainer}
            </div>
            <div>
                <label>Selfie:</label>
                {selfieContainer}
            </div>
            <div>
                <label>Automatic Captures:</label>
                {automaticCapturesContainer}
            </div>
        </div>
    );
};

export default selfie;