var svgWidth = 960;
var svgHeight = 500;

var margin = {
    top: 20,
    right: 40,
    bottom: 80,
    left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")

$div.append("div").attr("class", "tooltip").style("opacity", 0);

d3.csv("/assets/data.csv").then(function(stateData) {

    stateData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
	return data;
   });

  var xLinearScale = d3.scaleLinear()
        .domain([8, d3.max(data, d => data.poverty)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([3, d3.max(data, d => data.healthcare)])
        .range([height, 0]);

var bottomAxis = d3.axisBottom(xScale);
var leftAxis = d3.axisLeft(yScale);

var Circles = svg.selectAll("circle")

    Circles
    .append("circle")
    .attr("x", function(data) {
      return xScale(data[X]);
    })
    .attr("y", function(d) {
      return yScale(data[Y]);
    })
    .attr("r", circRadius)
    .attr("class", function(data) {
      return "stateCircle " + data.abbr;
    })
    .on("mouseover", function(data) {
      toolTip.show(data, this);
      d3.select(this).style("stroke", "#323232");
    })
    .on("mouseout", function(data) {
      toolTip.hide(data);
      d3.select(this).style("stroke", "#e3e3e3");
    });


var tooltip = d3
            .tip()
            .attr("class", "tooltip")
            .offset([55, -80])
             .html(function(d) {
            return (`${d.state}<br>Population In Poverty (%): ${d.poverty}<br>Lacks Healthcare (%): ${d.healthcare}`)
        });  

chartGroup.call(toolTip);   
    
circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
     
.on("mouseout", function(data, index) {
        toolTip.hide(data);
    });