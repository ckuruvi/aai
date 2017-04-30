app.service('HomeService', function($http) {

    console.log("HomeService loaded");

    this.logout = function() {
        auth_token = $http.defaults.headers.common['X-Auth-Token'];
        var url = 'https://proofapi.herokuapp.com/sessions/' + auth_token;
        return $http({
            url: url,
            method: 'DELETE'
        }).then(function(response) {
            return response;
        }, function(error) {
            console.log("user logout api call error :: ",error);
        });
    };

    this.getAllVideos = function(sortingParamater) {
        return $http({
            url: 'https://proofapi.herokuapp.com/videos',
            method: 'GET'
        }).then(function(response) {
            return sortFunction(response.data.data, sortingParamater);
        }, function(error) {
            console.log("get all videos api call error",error);
        });
    };

    this.addVideo = function(formdata) {
        return $http({
            url: 'https://proofapi.herokuapp.com/videos',
            method: 'POST',
            data: JSON.stringify(formdata)
        }).then(function(response) {
            return response.data;

        }, function(error) {
            console.log("add video api call error",error);
        });
    };

    this.createView = function(data) {
        return $http({
            url: 'https://proofapi.herokuapp.com/views',
            method: 'POST',
            data: JSON.stringify(data)
        }).then(function(response) {
            return response.data;

        }, function(error) {
            console.log("create view api call error",error);
        });
    };

    this.voteUp = function(data) {
        return $http({
            url: 'https://proofapi.herokuapp.com/votes',
            method: 'POST',
            data: JSON.stringify(data)
        }).then(function(response) {
            return response.data;
        }, function(error) {
            console.log("vote up api call error",error);
        });
    };

    this.voteDown = function(data) {
        return $http({
            url: 'https://proofapi.herokuapp.com/votes',
            method: 'POST',
            data: JSON.stringify(data)
        }).then(function(response) {
            return response.data;
        }, function(error) {
            console.log("vote down api call error",error);
        });
    };

    // one vote per video per day check
    this.voteCheck = function(videoId, userId) {
        return $http({
            url: '/uservotes',
            method: 'POST',
            data: {'videoId' : videoId , 'userId': userId }
        }).then(function(response) {
            return response.data;
        }, function(error) {
            console.log("vote check server call error",error);
        });
    }

     // function to sort by latest entry, views or votes based on value of sortingParameter
    function sortFunction(dataList, sortingParamater) {
        if (sortingParamater == 'allvideos') {
            dataList.sort(function(x, y) {
                return new Date(y.attributes.created_at).getTime() - new Date(x.attributes.created_at).getTime();
            });
        } else if (sortingParamater == 'toptenbyviews') {
            dataList.sort(function(x, y) {
                return y.attributes.view_tally - x.attributes.view_tally;
            });
            dataList.splice(10, dataList.length - 1);
        } else if (sortingParamater == 'toptenbyvotes') {
            dataList.sort(function(x, y) {
                return y.attributes.vote_tally - x.attributes.vote_tally;
            });
            dataList.splice(10, dataList.length - 1);
        }
        return dataList;

    }


});
