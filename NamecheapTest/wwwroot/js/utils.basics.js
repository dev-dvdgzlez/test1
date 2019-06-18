(function () {
    const ajaxTimeout = 120000; // 2 minutes for ajax timeout

    $U.extend({
        Get: Get,
        Post: Post,
        Put: Put,
        Delete: Delete
    });

    function Get(path, callback) {
        const url = $U.baseUrl + path;
        $.ajaxSetup({
            url: url,
            global: false,
            type: 'GET',
            timeout: ajaxTimeout
        });
        ShowSpinner();
        $.get(url)
            .done(function (result) {
                HideSpinner();
                callback(null, result);
            })
            .catch(function (err) {
                HideSpinner();
                callback(err);
            });
    }

    function Post(path, data, callback) {
        const url = $U.baseUrl + path;
        $.ajaxSetup({
            url: url,
            global: false,
            type: 'POST',
            timeout: ajaxTimeout
        });
        ShowSpinner();
        $.post(url, data)
            .done(function (result) {
                HideSpinner();
                callback(null, result);
            })
            .catch(function (err) {
                HideSpinner();
                callback(err);
            });
    }

    function Put(path, data, callback) {
        const url = $U.baseUrl + path;
        $.ajaxSetup({
            url: url,
            global: false,
            type: 'PUT',
            timeout: ajaxTimeout
        });
        ShowSpinner();
        $.post(url, data)
            .done(function (result) {
                HideSpinner();
                callback(null, result);
            })
            .catch(function (err) {
                HideSpinner();
                callback(err);
            });
    }

    function Delete(path, callback) {
        const url = $U.baseUrl + path;
        $.ajaxSetup({
            url: url,
            global: false,
            type: 'DELETE',
            timeout: ajaxTimeout
        });
        ShowSpinner();
        $.get(url)
            .done(function (result) {
                HideSpinner();
                callback(null, result);
            })
            .catch(function (err) {
                HideSpinner();
                callback(err);
            });
    }

    function HideSpinner() {

    }

    function ShowSpinner() {

    }

})();