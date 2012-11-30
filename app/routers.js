var SampleRouter = Backbone.Router.extend({
  routes: {
    ":left/:right": "categories",
    "": "nocategory"
  },
  
  nocategory: function(){
  },

  categories: function(left,right){
  }
});

window.launch();
