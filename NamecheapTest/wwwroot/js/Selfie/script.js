(() => {

    //normalize window.URL
    window.URL || (window.URL = window.webkitURL || window.msURL || window.oURL);
    //normalize navigator.getUserMedia
    navigator.getUserMedia || (navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    const player = document.getElementById("player"),
        captureButton = document.getElementById("capture"),
        selfieCanvas = document.getElementById("selfie"),
        nextStepButton = document.getElementById("next-step"),
        firstStep = document.getElementById("first-step"),
        secondStep = document.getElementById("second-step"),
        User = {
            name: "",
            email: "",
            selfie: "",
            automaticCaptures: []
        };

    let videoTracks, stopAutomaticPictures;

    nextStepButton.addEventListener("click", () => {
        firstStep.className = "hide";
        secondStep.className = "";
        User.name = document.getElementById("name").value;
        User.email = document.getElementById("email").value;

        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                player.srcObject = stream;
                videoTracks = stream.getVideoTracks();
            });
        stopAutomaticPictures = false;
        automaticPictures();
    });

    const automaticPictures = () => {
        setTimeout(() => {
            if (stopAutomaticPictures) return;
            const picture = DrawPicture();
            if (User.automaticCaptures.length === 5) {
                User.automaticCaptures.pop();
            }
            User.automaticCaptures.reverse();
            User.automaticCaptures.push(picture);
            User.automaticCaptures.reverse();
            automaticPictures();
        }, 500);
    };

    captureButton.addEventListener("click", () => {
        stopAutomaticPictures = true;
        User.selfie = DrawPicture();
        User.automaticCaptures.reverse();
        selfieCanvas.className = "";
        player.className = "hide";
        captureButton.className = "hide";

        // Stop all video streams.
        videoTracks.forEach((track) => { track.stop(); });
        $U.renderSelfie(User, (selfieRendered) => {
            secondStep.replaceWith(selfieRendered);
        });
        SendUser();
    });

    const SendUser = () => {
        $U.Post("api/users", User, (err, res) => {
            if (err) {
                return console.log(err);
            }
            if (res.Success) {
                window.location.href = $U.baseUrl + "selfies/list";
            }
            else {
                console.log(res);
            }
        });
    };

    const DrawPicture = () => {
        const context = selfieCanvas.getContext("2d");
        context.drawImage(player, 0, 0, selfieCanvas.width, selfieCanvas.height);
        return selfieCanvas.toDataURL("image/png");
    };
})();