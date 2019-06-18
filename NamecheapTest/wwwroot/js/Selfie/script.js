(function () {

    //normalize window.URL
    window.URL || (window.URL = window.webkitURL || window.msURL || window.oURL);
    //normalize navigator.getUserMedia
    navigator.getUserMedia || (navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    const player = document.getElementById("player"),
        captureButton = document.getElementById("capture"),
        selfieCanvas = document.getElementById("selfie"),
        nextStepButton = document.getElementById("next-step"),
        User = {
            name: "",
            email: "",
            selfie: "",
            automaticPictures: []
        };

    let videoTracks, stopAutomaticPictures;

    nextStepButton.addEventListener("click", () => {
        const firstStep = document.getElementById("first-step"),
            secondStep = document.getElementById("second-step");

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
            if (User.automaticPictures.length === 5) {
                User.automaticPictures.pop();
            }
            User.automaticPictures.reverse();
            User.automaticPictures.push(picture);
            User.automaticPictures.reverse();
            automaticPictures();
        }, 500);
    };

    captureButton.addEventListener("click", () => {
        stopAutomaticPictures = true;
        User.selfie = DrawPicture();
        selfieCanvas.className = "";
        player.className = "hide";
        captureButton.className = "hide";

        // Stop all video streams.
        videoTracks.forEach(function (track) { track.stop(); });
    });

    const DrawPicture = () => {
        const context = selfieCanvas.getContext("2d");
        context.drawImage(player, 0, 0, selfieCanvas.width, selfieCanvas.height);
        return selfieCanvas.toDataURL("image/png");
    };
})();