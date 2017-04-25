app.service('HomeService', function($http,$rootScope){

console.log(" inside HomeService ",$rootScope.auth_token);

  this.getAllVideos = function(){
    return  $http({
        url: 'https://proofapi.herokuapp.com/videos',
        method: 'GET',
        headers: {'Content-Type': 'application/json','X-Auth-Token':$rootScope.auth_token}
      }).then(function(response){
        console.log(response.data);
        return response.data;

      },function(error){
        console.log(error);
      });
  };

});
