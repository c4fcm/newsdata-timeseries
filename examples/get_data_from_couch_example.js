// Hide view A, show view B (toggle button)


function dateFromUTC( dateAsString, ymdDelimiter )
{
  var pattern = new RegExp( "(\\d{4})" + ymdDelimiter + "(\\d{2})" + ymdDelimiter + "(\\d{2}) (\\d{2}):(\\d{2}):(\\d{2})" );
  var parts = dateAsString.match( pattern );

  return new Date( Date.UTC(
      parseInt( parts[1] )
    , parseInt( parts[2], 10 ) - 1
    , parseInt( parts[3], 10 )
    , parseInt( parts[4], 10 )
    , parseInt( parts[5], 10 )
    , parseInt( parts[6], 10 )
    , 0
  ));
}

var BiasView = Backbone.View.extend({
     
  events: function() {

  },

  initialize: function(){
    _.bindAll(this, 'render');
    this.account_url='db/accounts/_design/occurrences/_view/date?descending=true'
    // this.result_template = _.template($("#bias_template").html())
    this.result_template = _.template($("#result_template").html())
    this.occurrence_template = _.template($("#occurrence_template").html())
    this.image_template = _.template($("#image_template").html())

    this.get_users(this.account_url)
  },

  show_view: function(){
    alert("accounts")
  },

  hide_view:function(){
    // css display block vs none

  },


  get_users: function(account_url) {
    that = this;


    var newest_time = 0;

    $.ajax({
       type: 'GET',
       url: that.account_url + '&limit=1',
       dataType: 'json',
       success: function(data) { 
       newest_time = data.rows[0].key
    },
       data: {},
       async: false
    });

    var newest_date = new Date(newest_time);
    var start_date = Date.parse(new Date(newest_date.getFullYear(), newest_date.getMonth(), newest_date.getDate()));
    var occurrence_limit = 15
    var account_rows = occurrence_limit/3
    query_string = '&startkey=' + start_date + '&limit='+occurrence_limit;

 

    jQuery.getJSON(that.account_url + query_string, function(data) {
      _.each(data.rows, function(row, i){
       

        jQuery.getJSON('http://search.twitter.com/search.json?q=from:'+ row.value.username+ '&callback=?', function(user) {
          if (user.results.length > 0) {
            image_url = user.results[0].profile_image_url
            $('#twitter_' + row.value.username +'_image').prepend(that.image_template({image_url:image_url}));
          } else {
            image_url = 'https://twimg0-a.akamaihd.net/sticky/default_profile_images/default_profile_4_bigger.png'
            $('#twitter_' + row.value.username +'_image').prepend(that.image_template({image_url:image_url}))
          }
        })
      

        $("#results"+((i%account_rows)+1)).prepend(that.result_template({row:row, i:i}))

        _.each(row.value.occurrences, function(occurrence){
          jQuery.getJSON("/db/articles/_design/articles/_view/story_url?key=" + occurrence.story_id, function(d) {
            _.each(d.rows, function(line) {
              $("#"+i).append(that.occurrence_template({line:line, date:dateFromUTC(line.value.publish_date, '-')}));
            });
          });
        });

       });
     });

  },



  render: function(){
    var that = this;
    },
  });

