// same as: $(document).ready(function(){...}
// prevent any jQuery code from running before the document is finished loading (is ready).
$(function() {

    // SEARCH
    $("form").on("submit", function(e) {
       e.preventDefault();

       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"), // %20 is encoded as a space
            maxResults: 12,
            order: "viewCount",
            videoCategoryId: "10" //id = "10" --> category = "Music"
       }); 

       // execute the request
       request.execute(function(response) {
          var results = response.result;
          $("#results").html("");
          $.each(results.items, function(index, item) {
            $.get("music/thumbnail.html", function(data) {
                $("#results").append(tplawesome(data, 
                    [{
                        "title": item.snippet.title, 
                        "videoid": item.id.videoId,
                    }]
                ));
            });
          });
       });

    });
    
});


// LINK TO VIDEO PAGE RESULT
// get the videoid and pass this to video.html to display the correct iframe link
// have to access .thumbnail through #results because they are dynamically created children
$('#results').on("click", ".thumbnail", function() {
    var videoId = $(this).children(".channel-thumbnail").attr("src").substring(27, 38);
    var title = $(this).children("h3").text();
    $.get("video.html", function(data) {
        $("#result").append(tplawesome(data, 
            [{
                "title": title, 
                "videoid": videoId,
            }]
        ));
    });
});

// template engine
// source: https://github.com/FriesFlorian/tplawesome
function tplawesome(template, data) {
    // initiate the result to the basic template
    res = template;
    // for each data key, replace the content of the brackets with the data
    for(var i = 0; i < data.length; i++) {
        res = res.replace(/\{\{(.*?)\}\}/g, function(match, j) { // some magic regex
            return data[i][j];
        })
    }
    return res;
}

// Initialize: API Key and load Youtube V3 API
function init() {
    gapi.client.setApiKey("AIzaSyAUy_62hQVJFErsaLTD0gZzM9xfkqDbLR0");
    gapi.client.load("youtube", "v3", function(){ 
        //youtube api being loaded here 
    });
}