// TV Schedule example

$(document).ready(function(){

    //        var t = $("#genres li");

    $(document).on('click', "#genres li", function() {

        $("#genres li").removeClass("active");

        $(this).addClass("active");

        $progs = $("#programmes");

        $progs.empty();

        $progs.append("<div class='spinner'><img src='spinner.gif' /></div>");

        if (getTomorrowsSchedule !== undefined) {


            getTomorrowsSchedule(
//                $(this).attr("id")
                this.id
            );


        }
    });


    retrieveGenres();


});

function retrieveGenres(){

    var url = "http://www.bbc.co.uk/tv/programmes/genres.json";

    $.ajax({

//        type: 'GET',

        url: url

//        ,

//        dataType: 'json',
//
//        xhrFields: {
//            withCredentials: true
//        },
//
//        crossDomain: true   ,
//
////        beforeSend: setHeader
//
//        beforeSend: function(xhr){
//            xhr.withCredentials = true;
//        }

    }).done(function(data){

        var i = 0;

        $.each(data.categories, function(i, val){

            var x = 0;

            console.log("Title: " + this.title);

            console.log("Key: " + this.key);

            // either line below works - my pref is for the second line, but I'm not sure if this is most efficient.
//            $("#genres").append("<li>" + val.title + "</li>");
            $("#genres").append($("<li>").attr("id", this.key).text(val.title));

        });



        }).fail(function(){

        var k = 0;


    }).always(function() {


    });

}

function processEpisode(episode) {

    var item_html = "<li>";

    item_html += "<h2>" + episode.programme.display_titles.title + "</h2>";


    if (episode.programme.image) {
    item_html += "<img src=" +
        //episode.programme.image +
        "http://ichef.bbci.co.uk/images/ic/272x153/" +
        episode.programme.image.pid + ".jpg />";
}

    item_html += "<br />";

    item_html += episode.programme.short_synopsis;
    item_html += "<br />";

//    item_html += episode.start;
//    item_html += "<br />";
//    item_html += episode.end;

    item_html += formatDate(episode.start, episode.end);


    item_html += "<br />";
    item_html += episode.duration / 60 + " mins";
    item_html += "<br />";
    item_html += "<span class='service'>" + episode.service.title + "</span>";
    item_html += "<br />";

    item_html += "</li>";

    return item_html;

}

function //retrieveScheduleByGenre
    getTomorrowsSchedule(genre){

    var url = "http://www.bbc.co.uk/tv/programmes/genres/" + genre + "/schedules/tomorrow.json";

    $.ajax({

//        dataType: 'json',

//        type: 'GET',

        url: url
    }).done(function(data){

        $progs.find(".spinner").remove();

        $.each(data.broadcasts, function(i, item){

            var li_html =
            processEpisode(item);


                $("#programmes").append(li_html);


        });

    }).fail(function(){

        var k = 0;

    });
}

function setHeader(xhr) {

    xhr.setRequestHeader('Authorization', token);
}

function formatDate(start, end) {

  var start_date = new Date(start);
  var end_date = new Date(end);

  var day = start_date.getDate();
  var month = start_date.getMonth() + 1; // the returned months are 0-11
  var year = start_date.getFullYear();

  var start_hour = start_date.getHours();
  var start_mins = start_date.getMinutes();

  var end_hour = end_date.getHours();
  var end_mins = end_date.getMinutes();

  var date = day + "/" + month + "/" + year + " ";
  
  // add leading 0 and return last two characters to make sure we use 00:00 format
  date +=  ("0"+start_hour).slice(-2) + ":" + ("0"+start_mins).slice(-2) + " - " +
           ('0' + end_hour).slice(-2) + ":" +  ( "0" + end_mins).slice(-2);

  return date;
}