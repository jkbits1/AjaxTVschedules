// TV Schedule example

$(document).ready(function(){

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

function retrieveScheduleByGenre(genre){

    var url = "http://www.bbc.co.uk/tv/programmes/genres/" + genre + "/schedules/tomorrow.json";

    $.ajax({

//        dataType: 'json',

//        type: 'GET',

        url: url
    }).done(function(data){

        $.each(data.broadcasts, function(i, item){

            item.programme.display_titles.title
            item.programme.short_synopsis
            item.programme.image/
            item.programme.image.pid

            item.start
            item.end
            item.duration
            item.service.title

        });

        var i = 0;

    }).fail(function(){

        var k = 0;

    });



}

function setHeader(xhr) {

    xhr.setRequestHeader('Authorization', token);
}

function formatDate(start, end) {
  start_date = new Date(start);
  end_date = new Date(end);

  day = start_date.getDate();
  month = start_date.getMonth() + 1; // the returned months are 0-11
  year = start_date.getFullYear();

  start_hour = start_date.getHours();
  start_mins = start_date.getMinutes();

  end_hour = end_date.getHours();
  end_mins = end_date.getMinutes();

  date = day + "/" + month + "/" + year + " ";
  
  // add leading 0 and return last two characters to make sure we use 00:00 format
  date +=  ("0"+start_hour).slice(-2) + ":" + ("0"+start_mins).slice(-2) + " - " +
           ('0' + end_hour).slice(-2) + ":" +  ( "0" + end_mins).slice(-2); 
  return date;
}