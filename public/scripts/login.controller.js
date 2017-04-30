app.controller('LoginController', function(LoginService, $location, $http, $rootScope) {

    console.log('LoginController loaded');
    var ctrl = this;
    // pwd - overgaze,decompressive,amelioration
    ctrl.authenticate = function(loginFormdata) {
        if (loginFormdata == undefined) {
            alertify.alert("Email and Password are required fields");
            return;
        } else if (loginFormdata.email == undefined) {
            alertify.alert("Email is a required field");
            return;
        } else if (loginFormdata.password == undefined) {
            alertify.alert("Password is a required field");
            return;
        }

        $rootScope.userId = loginFormdata.email;
        LoginService.authenticate(loginFormdata).then(function(data) {
            if (data.status == 401) {
                alertify.alert("Email or Password not Authorised");
            } else {
                $http.defaults.headers.common = {
                    'X-Auth-Token': data.data.attributes.auth_token
                };
                $location.path('/home');
            }
        });
    }; // end of authenticate function

});
