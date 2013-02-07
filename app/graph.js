
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 1600 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;


var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);


var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

var svg = d3.select("#graph_view").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var GraphView = Backbone.View.extend({
     
  events: function() {

  },

  initialize: function(){
    
    _.bindAll(this, 'render');
    console.log("initializing...");
    this.graph_template = _.template($('#graph_template').html())

    this.show_graph()


    var svg = d3.select("#graph_view").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  },

  show_graph: function() {

    url = "db/articles/_design/articles/_view/date"

    jQuery.getJSON(url, function(data) {

      _.each(data.rows.slice(1, 100), function(row) {
        console.log(row.key)
      })
      // _.each(data.rows, function(row) {
      //   row.value.ref
      // });

      x.domain(data.rows.map(function(row) { return new Date(row.key).toDateString(); }));
      y.domain([0, 100]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Frequency");

      svg.selectAll(".bar")
          .data(data.rows)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(row) { return x(new Date(row.key).toDateString()); })
          .attr("width", x)
          .attr("y", function(row) { return y(row.value.ref.length); })
          .attr("height", function(row) { return height - y(row.value.ref.length); });

    });
  },

  show_view: function() {

  },

  hide_view: function() {

  },

  render: function(){
    var that = this;
  }
});