// Hide view A, show view B (toggle button)

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
    query_string = '&startkey=1355011200000&endkey=1355011113600' + '&limit=9'

 

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
      

        $("#results"+((i%3)+1)).prepend(that.result_template({row:row, i:i}))

        _.each(row.value.occurrences, function(occurrence){
          jQuery.getJSON("/db/articles/_design/articles/_view/story_url?key=" + occurrence.story_id, function(d) {
            _.each(d.rows, function(line) {
              $("#"+i).append(that.occurrence_template({line:line}));
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

