app.controller('HomeController', function(HomeService,$http) {

    console.log('inside HomeController',$http.defaults.headers.common);
    var ctrl = this;

    ctrl.getVotes=function(){
      console.log("inside getVotes");
      HomeService.getVotes().then(function(data){
        console.log("getVotes data :",data);
      })
    }

      ctrl.getAllVideos=function(){

        HomeService.getAllVideos("allvideos").then( function(data){
            console.log(data);
           ctrl.videoList=data;
            //ctrl.getVotes();
        });
      }

      ctrl.getAllVideos();

      ctrl.getTopVideosByViews=function(){

        HomeService.getAllVideos("toptenbyviews").then( function(data){
            console.log(data);
           ctrl.videoList=data;
            //ctrl.getVotes();
        });
      }

      ctrl.getTopVideosByVotes=function(){
        HomeService.getAllVideos("toptenbyvotes").then( function(data){
            console.log(data);
           ctrl.videoList=data;
            //ctrl.getVotes();
        });
      }

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
