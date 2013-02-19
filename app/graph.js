
var margin = {top: 50, right: 50, bottom: 30, left: 50},
  width = 1000 - margin.left - margin.right,
  height = 800 - margin.top - margin.bottom;



var svg = d3.select("#graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var newest_time;

var GraphView = Backbone.View.extend({
     
  events: function() {

  },

  initialize: function(){
    
    _.bindAll(this, 'render');
    console.log("initializing...");
    this.graph_template = _.template($('#graph_template').html())

    this.show_graph()


  
  },

  show_graph: function() {

    url = "db/articles/_design/articles/_view/date?descending=true"

    var newest_time = 0;

    $.ajax({
       type: 'GET',
       url: url + '&limit=1',
       dataType: 'json',
       success: function(data) { 
       newest_time = data.rows[0].key
    },
       data: {},
       async: false
    });

    var cf = crossfilter([]);

    var newest_date = new Date(newest_time);
    var start_date = Date.parse(new Date(newest_date.getFullYear(), newest_date.getMonth(), newest_date.getDate()));
    console.log(start_date)
    var end_date = Date.parse(new Date(newest_date.getFullYear(), newest_date.getMonth(), newest_date.getDate() - 7));
    console.log(new Date(end_date))

    jQuery.getJSON(url + '&startkey=' + start_date + '&endkey=' + end_date, function(data) {

      _.each(data.rows, function(row) {
        cf.add([{'date': new Date(row.key), 'refs': row.value.ref.length}])
      })

    var date = cf.dimension(function(d) { return d3.time.day.round(d.date); });
    var dates = date.group()

    alldates = dates.top(Infinity)


    var x = d3.time.scale(d3.time.day.range(new Date(end_date), 
      new Date(start_date), 1));
    x.range([0, 150]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(d3.time.days, 1)
        .tickFormat(d3.time.format('%b %d'))
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

//    x.domain(alldates.map(function(row) { return row.key; }));

    x.domain(d3.time.day.range(new Date(end_date), 
      new Date(start_date), 1))
    y.domain([0, 1000]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .text("Date")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Number of Twitter Accounts Mentioned");

    svg.selectAll(".bar")
        .data(alldates)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(row) { return x(row.key); })
        .attr("width", 20)
        .attr("y", function(row) { console.log(row); return y(row.value); })
        .attr("height", function(row) { return height - y(row.value); });

    });
  },

  show_view: function() {
    $('#graph_view').toggle()
    $('#results_grid').toggle()
  },

  hide_view: function() {
    $('#graph_view').toggle()
    $('#results_grid').toggle()
  },

  render: function(){
    var that = this;
  }
});