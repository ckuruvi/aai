app.controller('HomeController', function(HomeService,$http,$rootScope) {

    console.log('inside HomeController',$http.defaults.headers.common);
    var ctrl = this;
    var apiCall;

    ctrl.getVotes=function(){
      console.log("inside getVotes");
      HomeService.getVotes().then(function(data){
        console.log("getVotes data :",data);
      })
    }



      ctrl.getAllVideos=function(){
        apiCall='allvideos';
        HomeService.getAllVideos("allvideos").then( function(data){
            console.log(data);
           ctrl.videoList=data;
            //ctrl.getVotes();
        });
      }

      ctrl.getAllVideos();

      ctrl.getTopVideosByViews=function(){
        apiCall="toptenbyviews";
        HomeService.getAllVideos("toptenbyviews").then( function(data){
            console.log(data);
           ctrl.videoList=data;
            //ctrl.getVotes();
        });
      }

      ctrl.getTopVideosByVotes=function(){
        apiCall="toptenbyvotes";
        HomeService.getAllVideos("toptenbyvotes").then( function(data){
            console.log(data);
           ctrl.videoList=data;
            //ctrl.getVotes();
        });
      }

      ctrl.addVideo=function(formdata){

        if(dayOfTheWeek()==5 || dayOfTheWeek()==0){
          alert("cannot vote on weekends");
           return;
        }

        HomeService.getAllVideos("allvideos").then( function(data){

           data.forEach(function(videoObj){
               if(videoObj.attributes.url==formdata.url){
                 alert("duplicate entry");
                 return;
               }
           });
           HomeService.addVideo(formdata).then(function(data){
             console.log("add video return data",data);
             refreshVideoList();

           });

        });

      }

      ctrl.createView=function(data){
        var obj ={video_id:data.id};

        console.log("inside createView",obj);
        HomeService.createView(obj).then(function(data){
          console.log("createView return data",data);
          refreshVideoList();
          //ctrl.getAllVideos();
        });

      }

      ctrl.voteUp=function(data){

        if(dayOfTheWeek()==5 || dayOfTheWeek()==0){
          alert("cannot vote on weekends");
           return;
        }
        var obj={video_id:data.id,opinion:1}
        console.log("inside voteUp",obj,$rootScope.userId);
        HomeService.voteCheck(data.id,$rootScope.userId).then(function(data){

             if(!data.hasVoted){
               HomeService.voteUp(obj).then(function(data){
                 console.log("voteUp return data",data);
                 refreshVideoList();
                 //ctrl.getAllVideos();
               });
             } else {
               alert("you can only vote once in a day");
             }

        });

      }

      ctrl.voteDown=function(data){
        if(dayOfTheWeek()==5 || dayOfTheWeek()==0){
          alert("cannot vote on weekends");
           return;
        }
        var obj={video_id:data.id,opinion:-1}

  HomeService.voteCheck(data.id,$rootScope.userId).then(function(data){

    if(!data.hasVoted){
      HomeService.voteDown(obj).then(function(data){
        console.log("voteDown return data",data);
        refreshVideoList();
      });
    } else {
      alert("you can only vote once in a day");
    }

      });
      }


      function  dayOfTheWeek(){
          return new Date().getDay();
      }

      function refreshVideoList(){
        switch(apiCall){
            case 'toptenbyviews':
                  ctrl.getTopVideosByViews();
                  break;
            case 'toptenbyvotes':
                  ctrl.getTopVideosByVotes();
                  break;
            default:
                  ctrl.getAllVideos();
        }


      }


});
