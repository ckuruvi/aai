
app.service('LoginService', function($http){

console.log(" inside LoginService ");

var AUTH_TOKEN;


  this.authenticate = function(formdata){

    var body = {
'email': 'charleskuruvila@gmail.com',
'password': 'overgaze,decompressive,amelioration'
};

console.log("body", body);
var jsonObj=JSON.stringify(body);

      return  $http({
          url: 'https://proofapi.herokuapp.com/sessions',
          method: 'POST',
          data: jsonObj,
          headers: {'Content-Type': 'application/json'}
        }).then(function(response){
          console.log(response.data.data.attributes.auth_token);
          return response.data;

        },function(error){
          console.log(error);
        });

  };

});
