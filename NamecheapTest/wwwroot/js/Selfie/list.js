(() => {
    let container = document.getElementsByClassName("container")[0],
        users = [];
    $U.Get("api/users", (err, res) => {
        if (err) {
            return console.log(err);
        }
        if (!res.Success) {
            return console.log(res);
        }
        const firebaseUsers = JSON.parse(res.Result);
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
        BuildList();
    });

    const BuildList = () => {
        RenderList(users, (usersRendered) => {
            container = RemoveChildren(container);
            container.appendChild(usersRendered);
        });
    };

    const RemoveChildren = (node) => {
        var child = node.lastElementChild;
        while (child) {
            node.removeChild(child);
            child = node.lastElementChild;
        }
        return node;
    };

    const RenderUser = (user) => {
        $U.ShowSpinner();
        $U.renderSelfie(user, (selfieRendered) => {
            container = RemoveChildren(container);
            container.appendChild(selfieRendered);
            let backButton = document.createElement("button");
            backButton.textContent = "Back";
            backButton.addEventListener("click", (ev) => {
                BuildList();
            });
            container.appendChild(backButton);
            $U.HideSpinner();
        });
    };

    const RenderList = (users, callback) => {
        let groupContainer = document.createElement("table");
        groupContainer.className = "user-list";
        let emailCell = document.createElement("th");
        emailCell.textContent = "Email";
        let nameCell = document.createElement("th");
        nameCell.textContent = "Name";
        let thead = document.createElement("thead");
        thead.appendChild(emailCell);
        thead.appendChild(nameCell);
        groupContainer.appendChild(thead);
        let tbody = document.createElement("tbody");
        users.forEach(user => {
            emailCell = document.createElement("td");
            emailCell.textContent = user.email;
            emailCell.addEventListener("click", (ev) => {
                RenderUser(user);
            });
            nameCell = document.createElement("td");
            nameCell.textContent = user.name;
            const tr = document.createElement("tr");
            tr.appendChild(emailCell);
            tr.appendChild(nameCell);
            tbody.appendChild(tr);
        });
        groupContainer.appendChild(tbody);
        callback(groupContainer);
    };

})();