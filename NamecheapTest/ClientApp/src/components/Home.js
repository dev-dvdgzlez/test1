import React, { Component } from 'react';
import { connect } from 'react-redux';
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

    componentWillMount() {
        if (this.state.sendUserData) {
            axios.post("api/users", this.state.User)
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.log(error);
                });
            this.setState({
                sendUserData: false
            });
        }
    }

    componentDidMount() {
        if (this.state.step === 2 && this.state.stopAutomaticPictures === false) {
            console.log("Initializing stream");
            const player = document.getElementById("player");
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    player.srcObject = stream;
                    console.log("Showing stream...");
                })
                .catch(error => {
                    console.log(error);
                });
            this.automaticPictures();
        }
    }

    showNextStep = () => {
        this.setState({
            step: 2,
            stopAutomaticPictures: false
        });
    };

    captureAllData = () => {
        const user = {
            ...this.state.User,
            selfie: this.GetPhoto(),
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
            const picture = this.GetPhoto();
            let captures = [...this.state.automaticCaptures];
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

    GetPhoto = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const player = document.getElementById("player");
        context.drawImage(player, 0, 0);
        return canvas.toDataURL("image/png");
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
                stepContainer = (
                    <div>
                        <video id="player" autoPlay />
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
