
var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = 1600 - margin.left - margin.right,
  height = 1000 - margin.top - margin.bottom;



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

    var cf = crossfilter([]);

    jQuery.getJSON(url, function(data) {

      _.each(data.rows, function(row) {
        console.log(row.key)
        cf.add([{'date': d3.time.day.round(new Date(row.key)), 'refs': row.value.ref.length}])
      })

    var date = cf.dimension(function(d) { return d.date; });
    var dates = date.group()


    alldates = dates.top(Infinity)

    console.log(alldates)

    var x = d3.time.scale()
        .range([0, 1000])

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

//    x.domain(alldates.map(function(row) { return row.key; }));
    x.domain([new Date(2008, 4, 1), new Date(2013, 1, 1)])
    y.domain([0, 200]);


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
        .style("text-anchor", "end");

    svg.selectAll(".bar")
        .data(alldates)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(row) { return x(row.key); })
        .attr("width", 6)
        .attr("y", function(row) { console.log(row.value); return y(row.value); })
        .attr("height", function(row) { return height - y(row.value); });

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