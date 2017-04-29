app.service('HomeService', function($http){

console.log(" inside HomeService ",$http.defaults.headers.common);

  this.getAllVideos = function(sortingParamater){
    return  $http({
        url: 'https://proofapi.herokuapp.com/videos',
        method: 'GET'
      }).then(function(response){
        console.log("unsorted datalist",response.data.data);
        return sortFunction(response.data.data,sortingParamater);

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

  this.createView = function(data){
    var jsonObj=JSON.stringify(data);
    console.log("addVideo json object",jsonObj);
    return  $http({
        url: 'https://proofapi.herokuapp.com/views',
        method: 'POST',
        data: jsonObj
      }).then(function(response){
        console.log(response.data);
        return response.data;

      },function(error){
        console.log(error);
      });
  };



  this.voteUp = function(data){
    var jsonObj=JSON.stringify(data);
    console.log("voteUp json object",jsonObj);
    return  $http({
        url: 'https://proofapi.herokuapp.com/votes',
        method: 'POST',
        data: jsonObj
      }).then(function(response){
        console.log(response.data);
        return response.data;

      },function(error){
        console.log(error);
      });
  };

  this.voteDown = function(data){
    var jsonObj=JSON.stringify(data);
    console.log("voteDown json object",jsonObj);
    return  $http({
        url: 'https://proofapi.herokuapp.com/votes',
        method: 'POST',
        data: jsonObj
      }).then(function(response){
        console.log(response.data);
        return response.data;

      },function(error){
        console.log(error);
      });
  };

  this.getVotes=function(){

    return  $http({
        url: 'https://proofapi.herokuapp.com/votes',
        method: 'GET',
      }).then(function(response){
        console.log(response.data);
        return response.data;

      },function(error){
        console.log(error);
      });
  }

  this.voteCheck=function(videoId,userId){
   console.log("inside service voteCheck function");
    return  $http({
        url:'/uservotes',
        method: 'POST',
        data:{'videoId':videoId,'userId':userId}
      }).then(function(response){
        console.log("votcheck response fro server ::",response);
        return response.data;

      },function(error){
        console.log(error);
      });
  }


  function sortFunction(dataList,sortingParamater){

         if(sortingParamater == 'allvideos'){
        dataList.sort(function(x,y){
          return new Date(y.attributes.created_at).getTime() - new Date(x.attributes.created_at).getTime();
        });
      } else if(sortingParamater == 'toptenbyviews'){
        dataList.sort(function(x,y){
          return y.attributes.view_tally - x.attributes.view_tally;
      });
        dataList.splice(10,dataList.length-1);
     }
     else if(sortingParamater == 'toptenbyvotes'){
       dataList.sort(function(x,y){
         return y.attributes.vote_tally - x.attributes.vote_tally;
     });
       dataList.splice(10,dataList.length-1);
    }
        return dataList;

  }


});
