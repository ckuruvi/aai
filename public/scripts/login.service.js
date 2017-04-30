app.service('LoginService', function($http) {

    console.log("LoginService loaded");

    this.authenticate = function(loginFormdata) {
        return $http({
            url: 'https://proofapi.herokuapp.com/sessions',
            method: 'POST',
            data: JSON.stringify(loginFormdata),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function(response) {
            //console.log(response.data.data.attributes.auth_token);
            return response.data;
        }).catch(function(error) {
            //console.log("error ::",error);
            return error;
        });
    };

});
