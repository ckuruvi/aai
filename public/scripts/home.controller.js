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

      ctrl.createView=function(data){
        var obj ={video_id:data.id};

        console.log("inside createView",obj);
        HomeService.createView(obj).then(function(data){
          console.log("createView return data",data);
          ctrl.getAllVideos();
        });

      }

      ctrl.voteUp=function(data){
        var obj={video_id:data.id,opinion:1}
        console.log("inside voteUp",obj);
        HomeService.voteUp(obj).then(function(data){
          console.log("voteUp return data",data);
          ctrl.getAllVideos();
        });
      }

      ctrl.voteDown=function(data){
        var obj={video_id:data.id,opinion:-1}
        console.log("inside voteUp",obj);
        HomeService.voteDown(obj).then(function(data){
          console.log("voteDown return data",data);
          ctrl.getAllVideos();
        });
      }

});
