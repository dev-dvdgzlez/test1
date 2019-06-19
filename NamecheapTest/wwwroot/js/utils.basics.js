(function () {
    const timeout = 120000; // 2 minutes for ajax timeout

    $U.extend({
        Get: Get,
        Post: Post,
        Put: Put,
        Delete: Delete
    });

    function Get(path, callback) {
        SendRequest({
            url: $U.baseUrl + path,
            method: "GET",
            callback: callback
        });
    }

    function Post(path, data, callback) {
        SendRequest({
            url: $U.baseUrl + path,
            method: "POST",
            callback: callback,
            data: data
        });
    }

    function Put(path, data, callback) {
        SendRequest({
            url: $U.baseUrl + path,
            method: "PUT",
            callback: callback,
            data: data
        });
    }

    function Delete(path, callback) {
        SendRequest({
            url: $U.baseUrl + path,
            method: "DELETE",
            callback: callback
        });
    }

    function SendRequest(obj) {
        const { url, method, callback, data } = obj;
        ShowSpinner();
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.timeout = timeout;
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            HideSpinner();
            callback(null, xhr.response);
        };
        xhr.ontimeout = () => {
            HideSpinner();
            callback("Connection timed out");
        };
        xhr.onerror = () => {
            HideSpinner();
            callback(xhr.response || "Error ocurred during transaction");
        };
        xhr.send(method === "POST" || method === "PUT" ? JSON.stringify(data) : null);
    }

    function HideSpinner() {
        const spinner = document.getElementById("spinner");
        spinner.className = "";
    }

    function ShowSpinner() {
        const spinner = document.getElementById("spinner");
        spinner.className = "show";
    }

})();