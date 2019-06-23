import React, { Component } from 'react';
import { connect } from 'react-redux';
import Webcam from 'react-webcam';

import Selfie from './Selfie';
import Spinner from './Spinner';
import axios from '../axios';

class Home extends Component {
    state = {
        User: {
            name: "",
            email: "",
            selfie: "",
            automaticCaptures: []
        },
        videoTracks: null,
        stopAutomaticPictures: false,
        automaticCaptures: [],
        step: 1,
        sendUserData: false
    };

    componentDidUpdate() {
        if (this.state.sendUserData) {
            axios.post("api/users", this.state.User)
                .then(res => {
                    this.props.history.push('/list');
                })
                .catch(error => {
                    console.log(error);
                    this.setState({
                        step: 1,
                        sendUserData: false
                    });
                });
        }
    }

    showNextStep = () => {
        this.automaticPictures();
        this.setState({
            step: 2,
            stopAutomaticPictures: false
        });
    };

    captureAllData = () => {
        const user = {
            ...this.state.User,
            selfie: this.Capture(),
            automaticCaptures: this.state.automaticCaptures
        };

        user.automaticCaptures.reverse();

        this.setState({
            stopAutomaticPictures: true,
            User: user,
            sendUserData: true,
            step: 4
        });
    };

    automaticPictures = () => {
        setTimeout(() => {
            if (this.state.stopAutomaticPictures) return;
            const picture = this.Capture();
            const captures = [...this.state.automaticCaptures];
            if (captures.length === 5) {
                captures.pop();
            }
            captures.reverse();
            captures.push(picture);
            captures.reverse();
            this.setState({
                automaticCaptures: captures
            });
            this.automaticPictures();
        }, 500);
    };

    NameChanged = (evt) => {
        const user = {
            ...this.state.User
        };
        user.name = evt.target.value;
        this.setState({
            User: user
        });
    };

    EmailChanged = (evt) => {
        const user = {
            ...this.state.User
        };
        user.email = evt.target.value;
        this.setState({
            User: user
        });
    };

    SetRef = webcam => {
        this.webcam = webcam;
    };

    Capture = () => {
        const screenshot = this.webcam.getScreenshot();
        return screenshot;
    };

    render() {
        let stepContainer = null;

        switch (this.state.step) {
            case 1:
                stepContainer = (
                    <div>
                        <div className="input-group">
                            <label>Name:</label>
                            <input type="text" placeholder="Your name here" value={this.state.User.name} onChange={this.NameChanged} />
                        </div>
                        <div className="input-group">
                            <label>Email:</label>
                            <input type="text" placeholder="Your email address" value={this.state.User.email} onChange={this.EmailChanged} />
                        </div>
                        <button onClick={this.showNextStep}>Next</button>
                    </div>
                );
                break;

            case 2:
                const videoConstraints = {
                    width: 1280,
                    height: 720,
                    facingMode: "user"
                };
                stepContainer = (
                    <div>
                        <Webcam
                            audio={false}
                            height={350}
                            ref={this.SetRef}
                            screenshotFormat="image/jpeg"
                            width={350}
                            videoConstraints={videoConstraints}
                        />
                        <button onClick={this.captureAllData}>Capture</button>
                    </div>
                );
                break;

            case 3:
                stepContainer = (
                    <div>
                        <Selfie user={this.state.User} />
                    </div>
                );
                break;
            default:
                stepContainer = <Spinner />;
                break;
        }
        return (
            <div>
                <h2>Selfie</h2>
                {stepContainer}
            </div>
        );
    }
}

export default connect()(Home);
