app.controller('LoginController', function (LoginService,$location,$http,$rootScope) {
    console.log('LoginController loaded');
    var ctrl = this;

    ctrl.authenticate = function(formdata) {

        LoginService.authenticate(formdata).then(function(data){

          console.log("data",data);
          $rootScope.auth_token=data.data.attributes.auth_token;
          console.log("$rootscope",$rootScope.auth_token)
          $location.path('/home');

        })
    }; // end of login function


});
