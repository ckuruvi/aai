app.controller('HomeController', function(HomeService, $http, $rootScope, $location) {

    console.log('HomeController loaded');

    var ctrl = this;

    /*   defines the type of method to be called
    1) getAllVideos
    2) getTopVideosByViews
    3) getTopVideosByVotes
    */
    var apiCallType;


    ctrl.logout = function() {
        HomeService.logout().then(function() {
            $http.defaults.headers.common = '';
            $rootScope.userId = ''
            $location.path('/');
        });
    }

    ctrl.getAllVideos = function() {
        apiCallType = 'allvideos';
        HomeService.getAllVideos("allvideos").then(function(data) {
            //console.log(data);
            ctrl.videoList = data;
        });
    }

    // initial call to load to load all videos
    ctrl.getAllVideos();

    ctrl.getTopVideosByViews = function() {
        apiCallType = "toptenbyviews";
        HomeService.getAllVideos("toptenbyviews").then(function(data) {
            ctrl.videoList = data;
        });
    }

    ctrl.getTopVideosByVotes = function() {
        apiCallType = "toptenbyvotes";
        HomeService.getAllVideos("toptenbyvotes").then(function(data) {
            ctrl.videoList = data;
        });
    }

    ctrl.addVideo = function(formdata) {
        // weekend check
        if (dayOfTheWeek() == 6 || dayOfTheWeek() == 0) {
            alertify.alert("cannot add video on weekends");
            return;
        }

        if (formdata == undefined) {
            alertify.alert("Title, Url & Slug are required fields");
            return;
        } else if (formdata.title == undefined) {
            alertify.alert("Title is a required field");
            return;
        } else if (formdata.url == undefined) {
            alertify.alert("url is a required field");
            return;
        } else if (formdata.slug == undefined) {
            alertify.alert("slug is a required field");
            return;
        }
        // url duplicate entry check
        HomeService.getAllVideos("allvideos").then(function(data) {
            data.forEach(function(videoObj) {
                if (videoObj.attributes.url == formdata.url) {
                    alertify.alert("duplicate entry");
                    return;
                }
            });
            HomeService.addVideo(formdata).then(function(data) {
                refreshVideoList();
            });
        });
    }  // end of addVideo function

    ctrl.createView = function(data) {
        var obj = {video_id: data.id};
        HomeService.createView(obj).then(function(data) {
            refreshVideoList();
        });
    }  // end of createView function

    ctrl.voteUp = function(data) {
         //weekend check
        if (dayOfTheWeek() == 6 || dayOfTheWeek() == 0) {
            alertify.alert("cannot vote on weekends");
            return;
        }
        var obj = {video_id : data.id , opinion : 1};
        // one vote per video per day check
        HomeService.voteCheck(data.id, $rootScope.userId).then(function(data) {
            if (!data.hasVoted) {
                HomeService.voteUp(obj).then(function(data) {
                    refreshVideoList();
                });
            } else {
                alertify.alert("you can only vote once in a day");
            }
        });
    } // end of voteUp function

    ctrl.voteDown = function(data) {
        // weekend check
        if (dayOfTheWeek() == 6 || dayOfTheWeek() == 0) {
            alertify.alert("cannot vote on weekends");
            return;
        }
        var obj = {video_id : data.id , opinion: -1};
          // one vote per video per day check
        HomeService.voteCheck(data.id, $rootScope.userId).then(function(data) {
            if (!data.hasVoted) {
                HomeService.voteDown(obj).then(function(data) {
                    refreshVideoList();
                });
            } else {
                alertify.alert("you can only vote once in a day");
            }
        });
    }  // end of voteDown function

    // return the day of the week
    function dayOfTheWeek() {
        return new Date().getDay();
    }

    // calls the required function based on the value set for apiCallType
    function refreshVideoList() {
        switch (apiCallType) {
            case 'toptenbyviews':
                ctrl.getTopVideosByViews();
                break;
            case 'toptenbyvotes':
                ctrl.getTopVideosByVotes();
                break;
            default:
                ctrl.getAllVideos();
        }
    }   // end of refreshVideoList function

});
