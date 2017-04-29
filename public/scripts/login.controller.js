app.controller('LoginController', function (LoginService,$location,$http,$rootScope) {
    console.log('LoginController loaded');
    var ctrl = this;

    ctrl.authenticate = function(formdata) {
          console.log("login formdata",formdata);
          //save user id to root scope
          $rootScope.userId='charleskuruvila@gmail.com';
        LoginService.authenticate(formdata).then(function(data){

          console.log("data",data);
          $http.defaults.headers.common={'X-Auth-Token' : data.data.attributes.auth_token};
          $location.path('/home');

        })
    }; // end of login function


});
