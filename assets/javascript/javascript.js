var config = {
    apiKey: "AIzaSyB3lbSA5Y4e4StvaYtm5sno0pDad-90NeM",
    authDomain: "groupproject1-fridgetomeal.firebaseapp.com",
    databaseURL: "https://groupproject1-fridgetomeal.firebaseio.com",
    projectId: "groupproject1-fridgetomeal",
    storageBucket: "groupproject1-fridgetomeal.appspot.com",
    messagingSenderId: "32759158700"
};

firebase.initializeApp(config);
var database = firebase.database();
//test branch
$(function() {
    //Replace indicator when we know which click event should trigger our function
    $(".btn-large").on("click", function(e) {
        e.preventDefault();
        //prepare request
        var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#ingredients").val()), //.replace(/%20/g, "+"),
            maxResults: 3,
            order: "viewCount",
            publishedAfter: "2000-01-01T00:00:00Z"
        })
        //execute request
        request.execute(function(response) {
            console.log(response);
            var results = response.result;
            $.each(results.items, function(index, item) {
                console.log(item)
                $("#videosGoHere").append(item.id.videoId + " " + item.snippet.title + "<br>")
                var videoId = item.id.videoId;
                var htmlVideo = "";
            })
        })
    })
})

function init() {
    gapi.client.setApiKey("AIzaSyCrDLUDgfk0UO5izg05bh7tU1dIjbBmBA8");
    gapi.client.load("youtube", "v3", function() {
        //yt api is ready
    })
}
