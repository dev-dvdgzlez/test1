(function () {
    const timeout = 120000; // 2 minutes for ajax timeout

    $U.extend({
        Get: Get,
        Post: Post,
        Put: Put,
        Delete: Delete
    });

    function Get(path, callback) {
        const url = $U.baseUrl + path;
        ShowSpinner();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.timeout = timeout; // time in milliseconds
        xhr.onload = () => {
            HideSpinner();
            callback(null, xhr.response);
        };
        xhr.ontimeout = () => {
            HideSpinner();
            callback("Connection timed out");
        };
        xhr.onerror = (e) => {
            HideSpinner();
            callback(xhr.response || "Error ocurred during transaction");
        };
        xhr.send(null);
    }

    function Post(path, data, callback) {
        const url = $U.baseUrl + path;
        ShowSpinner();
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", url, true);
        xhr.timeout = timeout; // time in milliseconds
        xmlhttp.setRequestHeader("Content-Type", "application/json");
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
        xmlhttp.send(JSON.stringify(data));
    }

    function Put(path, data, callback) {
        const url = $U.baseUrl + path;
        ShowSpinner();
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("PUT", url, true);
        xhr.timeout = timeout; // time in milliseconds
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xhr.onload = () => {
            HideSpinner();
            callback(null, xhr.response);
        };
        xhr.ontimeout = () => {
            HideSpinner();
            callback("Connection timed out");
        };
        xhr.onerror = (e) => {
            HideSpinner();
            callback(xhr.response || "Error ocurred during transaction");
        };
        xmlhttp.send(JSON.stringify(data));
    }

    function Delete(path, callback) {
        const url = $U.baseUrl + path;
        ShowSpinner();
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', url, true);
        xhr.timeout = timeout; // time in milliseconds
        xhr.onload = () => {
            HideSpinner();
            callback(null, xhr.response);
        };
        xhr.ontimeout = () => {
            HideSpinner();
            callback("Connection timed out");
        };
        xhr.onerror = (e) => {
            HideSpinner();
            callback(xhr.response || "Error ocurred during transaction");
        };
        xhr.send(null);
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