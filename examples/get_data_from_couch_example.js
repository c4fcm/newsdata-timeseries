var margin = {top: 20, right: 20, bottom: 30, left: 40}
    width = 1600 - margin.left - margin.right,
    height = 1600 - margin.top - margin.bottom;


var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([100, 1100]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
    // .tickFormat(formatPercent);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var BiasView = Backbone.View.extend({
     
  events: function() {
    return {
      "click #check_bias_button":"check_bias_button"
    }
  },

  initialize: function(){
    _.bindAll(this, 'render');
    this.account_url='/db/accounts/_design/occurrences/_view/occurrences'
    // this.result_template = _.template($("#bias_template").html())
    this.result_template = _.template($("#result_template").html())

    this.get_users(this.account_url)
  },

  check_bias_button: function(e){
    account_name = $("#twitter_account").val();
    $("#notification").remove();
    this.check_bias(account_name);
  },

  get_users: function(account_url) {
    that = this;
    account_name = 'aakarimova'
    // query_string = '?key="' + account_name + '"&limit=1'
    query_string = ''
    // d3.json(that.account_url + query_string, function(error, data) {
    //   x.domain(data.rows.slice(0,2).map(function(d) {return d.key }));
    //   y.domain(data.rows.slice(0,2).map(function(d) { console.log(_.size(d.value.occurrences)); return _.size(d.value.occurrences)}));

    // svg.append("g")
    //       .attr("class", "x axis")
    //       .attr("transform", "translate(0," + height + ")")
    //       .call(xAxis);

    //   svg.append("g")
    //       .attr("class", "y axis")
    //       .call(yAxis)
    //     .append("text")
    //       .attr("transform", "rotate(-90)")
    //       .attr("y", 6)
    //       .attr("dy", ".71em")
    //       .style("text-anchor", "end")
    //       .text("Frequency");

    //   svg.selectAll(".bar")
    //       .data(data)
    //     .enter().append("rect")
    //       .attr("class", "bar")
    //       .attr("x", function(d) { return x(d.letter); })
    //       .attr("width", x.rangeBand())
    //       .attr("y", function(d) { return y(d.frequency); })
    //       .attr("height", function(d) { return height - y(d.frequency); });

    // });

    jQuery.getJSON(that.account_url + query_string, function(data) {
      _.each(data.rows, function(row){
        console.log(_.size(row.value.occurrences))
        $("#results").prepend(that.result_template({row:row}))
        _.each(row.value.occurrences, function(occurence){
          $("twitter_"+row.key).prepend()
        });

      });
    });
      // console.log(_.has(data, "rows"))
      // if(_.has(data, "rows") && data["rows"].length > 0){
      //   row = data["rows"][0].value
      //   $("#results").prepend(that.result_template({twitter_account:row}));
      //   console.log(row.account)
      // }
    // });
  },

  // check_bias: function(account_name){
  //   that = this;
  //   account_name = account_name.replace("@","");
  //   query_string = '?key="' + account_name + '"&limit=1'
  //   jQuery.getJSON(that.account_url+query_string,function(data){
  //     if(_.has(data, "rows") && data["rows"].length > 0){
  //       row = data["rows"][0].value
  //       $("#results").prepend(that.result_template({twitter_account:row}));
  //       console.log(row.account)
  //     }else{
  //       //TODO: RESPOND TO ACCOUNT NOT FOUND
  //       el = $(that.no_result_template());
  //       $("#notifications").html(el);
  //     }
  //   });
  // },


  render: function(){
    var that = this;
    },
  });

