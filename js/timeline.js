function makeChart() {

	//Sample data: [year, y-axis val, tooltip string, event name]
	var data = [[1992, 0, "Tooltip #1", "Label #1"], [2000,0,"Tooltip #2","Label #2"], [2010,0,"Tooltip #3","Label #3"], [2014,0,"Tooltip #4","Label #4"]];
	   
	//Timeline positioning   
	var margin = {top: 20, right: 35, bottom: 60, left: 60}
	  , width = 960 - margin.left - margin.right
	  , height = 100 - margin.top - margin.bottom;

	//Timeline domain/ranges
		var x = d3.scale.linear()
	      .domain([1992, 2014])
	      .range([ 0, width ]);

		var y = d3.scale.linear()
	      .domain([0, d3.max(data, function(d) { return d[1]; })])
	      .range([ height, 0 ]);

	//Append an svg element to the html to put the chart in
	var chart = d3.select('body')
	  .append('svg:svg') //element type
	  .attr('width', width + margin.right + margin.left) 
	  .attr('height', height + margin.top + margin.bottom) 
	  .attr('class', 'chart'); 

	//Append a g element (placed inside svg)
	var main = chart.append('g')
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	  .attr('width', width)
	  .attr('height', height)
	  .attr('class', 'main');   
	    
	//Draw the x-axis
	var xAxis = d3.svg.axis()
	  .scale(x)
	  .orient('bottom'); 

    //Create g element for x axis
	main.append('g')
	  .attr('transform', 'translate(0,' + height + ')')
	  .attr('class', 'main axis date')
	  .call(xAxis);

	//Variable creates a g element and appends it to the x axis g element
	var g = main.append("svg:g"); 

	//Create a variable 'node' to represent all data points
	var node = g.selectAll("g")
      .data(data)
      .enter()
      .append("g");

    //Long tick marks by points
	node.append("line")
	  .attr("class", "scatter-point")
	  	.attr("class", "tick") 
	  //X values (x1 & x2 should be the same)
	  .attr("x1", function (d,i) { return x(d[0]); } )
	    .attr("x2", function (d,i) { return x(d[0]); } )
		//Y values (vertical start and end points of line)
		.attr("y1", -5) //Use positive integer to position ticks above timeline
		.attr("y2", 20) //Change to set height of the tick
		.attr("stroke-width", 1) //Line width (in px)
		.style("shape-rendering", "crispEdges") //Set to prevent blurry line
		.attr("stroke", "#999999"); //Color of line

	//Points
	node.append("line:circle") //append a small filled circle to represent each point
	  .attr("cx", function (d,i) { return x(d[0]); } ) //Point x val
	  .attr("cy", function (d) { return y(d[1]); } ) //Point y val
	  .attr("r", 4); //Radius of point (in px)

	//Labels by points
	node.append("line:text")
	  .attr("class", "point-label")
	  .attr("x", function (d,i) { return x(d[0]); } )
	  .attr("y", function (d) { return y(d[1]); } )
	  .attr("dy", -30)
	  .style("text-anchor", "middle")
	  .text(function(d) { return d[3]; })

	  //Tooltips (doesn't work in Chrome)
	  .attr('title', function(d) { return d[2]; }); 
}

