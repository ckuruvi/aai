app.controller('HomeController', function(HomeService,$http) {

    console.log('inside HomeController',$http.defaults.headers.common);
    var ctrl = this;

      ctrl.getAllVideos=function(){

        HomeService.getAllVideos().then( function(data){
            console.log(data);
           ctrl.videoList=data.data;

        });
      }

      ctrl.getAllVideos();

      ctrl.addVideo=function(formdata){
        HomeService.addVideo(formdata).then(function(data){
          console.log("add video return data",data);
          ctrl.getAllVideos();
        });
      }

});
