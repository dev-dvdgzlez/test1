(() => {
    let renderSelfie = (user, callback) => {
        let container = document.createElement("div");
        container.className = "userandselfie";
        // Name
        let groupContainer = document.createElement("div");
        groupContainer.className = "name";
        let label = document.createElement("label");
        label.textContent = "Name:";
        let text = document.createElement("span");
        text.textContent = user.name;
        groupContainer.appendChild(label).appendChild(text);
        container.appendChild(groupContainer);
        // Email
        groupContainer = document.createElement("div");
        groupContainer.className = "email";
        label = document.createElement("label");
        label.textContent = "Email:";
        text = document.createElement("span");
        text.textContent = user.email;
        groupContainer.appendChild(label).appendChild(text);
        container.appendChild(groupContainer);
        // Selfie
        groupContainer = document.createElement("div");
        groupContainer.className = "selfie";
        label = document.createElement("label");
        label.textContent = "Selfie:";
        DrawPicture(user.selfie, (canvas) => {
            groupContainer.appendChild(label).appendChild(canvas);
            container.appendChild(groupContainer);
            AutomaticCapturesRenderer(user.automaticCaptures, 0, null, (list) => {
                groupContainer = document.createElement("div");
                groupContainer.className = "automatic-captures";
                label = document.createElement("label");
                label.textContent = "Automatic Captures:";
                groupContainer.appendChild(label).appendChild(list);
                container.appendChild(groupContainer);
                callback(container);
            });
        });
    };

    const AutomaticCapturesRenderer = (automaticCaptures, index, container, callback) => {
        if (!container) {
            container = document.createElement("div");
        }
        DrawPicture(automaticCaptures[index], (canvas) => {
            container.appendChild(canvas);
            if (automaticCaptures.length === index + 1) {
                callback(container);
            }
            else {
                AutomaticCapturesRenderer(automaticCaptures, index + 1, container, callback);
            }
        });
    };

    const DrawPicture = (dataUrl, callback) => {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.onload = () => {
            ctx.drawImage(img, 0, 0); // Or at whatever offset you like
            callback(canvas);
        };
        img.src = dataUrl;
    };

    $U.extend({
        renderSelfie: renderSelfie
    });
})();