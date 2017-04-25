app.controller('HomeController', function(HomeService) {

    console.log('inside HomeController');
    var ctrl = this;

      this.getAllVideos=function(){

        HomeService.getAllVideos().then( function(data){

          console.log(data);
        });
      }

      this.getAllVideos();

});
