var BiasView = Backbone.View.extend({
     
  events: function() {
    return {
      "click #check_bias_button":"check_bias_button"
    }
  },

  initialize: function(){
    _.bindAll(this, 'render');
    this.account_url="http://hypatia.media.mit.edu/db/peoplebrowsr_dummy/_design/accounts/_view/account"
    this.result_template = _.template($("#result_template").html())
    this.no_result_template = _.template($("#no_result_template").html())
  },

  check_bias_button: function(e){
    account_name = $("#twitter_account").val();
    $("#notification").remove();
    this.check_bias(account_name);
  },

  check_bias: function(account_name){
    that = this;
    account_name = account_name.replace("@","");
    query_string = '?key="' + account_name + '"&limit=1'
    jQuery.getJSON(that.account_url+query_string,function(data){
      if(_.has(data, "rows") && data["rows"].length > 0){
        row = data["rows"][0].value
        $("#results").prepend(that.result_template({row:row}));
        console.log(row.account)
      }else{
        //TODO: RESPOND TO ACCOUNT NOT FOUND
        el = $(that.no_result_template());
        $("#notifications").html(el);
      }
    });
  },

  render: function(){
    var that = this;
  },
});

