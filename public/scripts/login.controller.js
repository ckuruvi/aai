app.controller('LoginController', function (LoginService,$location,$http) {
    console.log('LoginController loaded');
    var ctrl = this;

    ctrl.authenticate = function(formdata) {

        LoginService.authenticate(formdata).then(function(data){

          console.log("data",data);
          $http.defaults.headers.common={'X-Auth-Token' : data.data.attributes.auth_token};
          $location.path('/home');

        })
    }; // end of login function


});
