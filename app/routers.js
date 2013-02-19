var BiasRouter = Backbone.Router.extend({
  routes: {
    "graph":"show_graph",
    "accounts":"show_accounts"
    //"view/:name": "choose_view"
  },
  
  nocategory: function(){
  },

  show_graph: function(){
	  graph_view.show_view();
	  accounts_view.hide_view();
  },

  show_accounts: function(){
  	graph_view.hide_view();
  	accounts_view.show_view();
  },

  categories: function(left,right){
  }
});

window.launch();
