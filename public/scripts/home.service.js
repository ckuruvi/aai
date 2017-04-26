app.service('HomeService', function($http){

console.log(" inside HomeService ",$http.defaults.headers.common);

  this.getAllVideos = function(){
    return  $http({
        url: 'https://proofapi.herokuapp.com/videos',
        method: 'GET'
      }).then(function(response){
        console.log(response.data);
        return response.data;

      },function(error){
        console.log(error);
      });
  };

  this.addVideo = function(formdata){
    var jsonObj=JSON.stringify(formdata);
    console.log("addVideo json object",jsonObj);
    return  $http({
        url: 'https://proofapi.herokuapp.com/videos',
        method: 'POST',
        data: jsonObj
      }).then(function(response){
        console.log(response.data);
        return response.data;

      },function(error){
        console.log(error);
      });
  };

});
