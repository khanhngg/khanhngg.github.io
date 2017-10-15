$(function() {
    var queryString = window.location.search;
    var videoID = queryString.substring(4);
    var ytURL = "//www.youtube.com/embed/" + videoID;
    $('iframe').attr('src', ytURL); 
});
