var SampleView = Backbone.View.extend({
     
  events: function() {
    return {
      "click .hat": "sample_handler"
    }
  },

  initialize: function(){
    
    _.bindAll(this, 'render');
    console.log("initializing...");
  },

  render: function(column){
    var that = this;
  },
  
  sample_handler: function(e){
    element = $(e.target)
    element.html("Cat Button!")
  }
});
