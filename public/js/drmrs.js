jQuery(document).ready(function($) {

function map(){
	var w = $('#map').width();
	var h= $('#map').height();	
		//svg
	var svg = d3.select("#map");

	//Define map projection
	var projection = d3.geo.albersUsa()
						   .translate([w/2, h/2])
						   .scale([600]);

	//Define path generator
	var path = d3.geo.path()
					 .projection(projection);
					 
	//Define quantize scale to sort data values into buckets of color
	var color = d3.scale.quantize()
						.range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
						//Colors taken from colorbrewer.js, included in the D3 download


	//Load in agriculture data
	d3.csv("public/data/us-ag-productivity-2004.csv", function(data) {

		//Set input domain for color scale
		color.domain([
			d3.min(data, function(d) { return d.value; }), 
			d3.max(data, function(d) { return d.value; })
		]);

		//Load in GeoJSON data
		d3.json("public/data/us-states.json", function(json) {

			//Merge the ag. data and GeoJSON
			//Loop through once for each ag. data value
			for (var i = 0; i < data.length; i++) {
		
				var dataState = data[i].state;				//Grab state name
				var dataValue = parseFloat(data[i].value);	//Grab data value, and convert from string to float
		
				//Find the corresponding state inside the GeoJSON
				for (var j = 0; j < json.features.length; j++) {
				
					var jsonState = json.features[j].properties.name;
		
					if (dataState == jsonState) {
				
						//Copy the data value into the JSON
						json.features[j].properties.value = dataValue;
						
						//Stop looking through the JSON
						break;
						
					}
				}		
			}

			//Bind data and create one path per GeoJSON feature
			svg.selectAll("path")
			   .data(json.features)
			   .enter()
			   .append("path")
			   .attr("d", path)
			   .style("fill", function(d) {
			   		//Get data value
			   		var value = d.properties.value;
			   		
			   		if (value) {
			   			//If value exists…
				   		return color(value);
			   		} else {
			   			//If value is undefined…
				   		return "#ccc";
			   		}
			   });

			//Load in cities data
			d3.csv("public/data/us-cities.csv", function(data) {
				
				svg.selectAll("circle")
				   .data(data)
				   .enter()
				   .append("circle")
				   .attr("cx", function(d) {
					   return projection([d.lon, d.lat])[0];
				   })
				   .attr("cy", function(d) {
					   return projection([d.lon, d.lat])[1];
				   })
				   .attr("r", function(d) {
						return Math.sqrt(parseInt(d.population) * 0.00004);
				   })
				   .style("fill", "yellow")
				   .style("opacity", 0.75);
				
			});

	
		});
	
	});
}
map()
function mostApps(){
 		var w = $('#mostApps').width();
		var h= 200;
//jsfiddle.net/stephenboak/hYuPb/
	var dataset = [ 5,10,20,45,6,25,10];
	//10 predefined d3 colors
	var color = d3.scale.category10();
	//we set up the radius of our pie charts
	var outerRadius = w/2.2;
	//inner radius is 0
	var innerRadius = 0;

	//we creat our svg object to work with
	var svg = d3.select('#mostApps');

	//we create our pie layout, allowing us access to pie methds,start angle,end angle, tacke in our data
	var pie = d3.layout.pie();

	//we take the .arc(), allows acces to arc methods ourterRadius,end angle
	var arc = d3.svg.arc()
		.startAngle(function(d){ return d.startAngle; })
  		.endAngle(function(d){ return d.endAngle; })
		.innerRadius(innerRadius)
		.outerRadius(outerRadius);


	//We we create an empty element
	var arcs = svg.selectAll('g.arc')
	//we pass it the pie data
		.data(pie(dataset))
		.enter()
		.append('g')
		.attr("class","arc")
	//this were each wedge is created
		.attr("transform","translate("+outerRadius+","+outerRadius+")");

	//We take our g element created and append a path
	//This creates the paths that we SEE
	//Translates our data in to visuals
	//creating a d attribue and then referencing our arc that we set up
	arcs.append("path")
	.attr("fill","#ffffff")
	.transition()
		.delay(function(d,i){
			return i * 600
		})
		.duration(1000)
		.ease('bounce')
		.attr("fill",function(d,i){
			return color(i);
		})
		
		.attrTween("d", pieTween)
		//.attr("d",arc)
	arcs.append('text')
		.transition()
		.delay(function(d,i){
			return i * 600
		})
		.duration(1000)
		.ease('bounce')
	.attr('transform',function(d){return "translate("+arc.centroid(d)+")"})
	.attr("text-anchor","middle")
	.text(function(d){return d.value})
		
//this function interpolates between a starting and ending poing
function pieTween(d, i) {
    s0 = 0;
    e0 = 0;
  var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: d.endAngle , endAngle: d.startAngle});
  return function(t) {
    var b = i(t);
    return arc(b);
  };
}
}
mostApps()
function mostCountry(){
 		var w = $('#mostCountry').width();
		var h= 200;
//jsfiddle.net/stephenboak/hYuPb/
	var dataset = [ 5,10,20,45,6,25,10];
	//10 predefined d3 colors
	var color = d3.scale.category10();
	//we set up the radius of our pie charts
	var outerRadius = w/2.2;
	//inner radius is 0
	var innerRadius = 0;

	//we creat our svg object to work with
	var svg = d3.select('#mostCountry');

	//we create our pie layout, allowing us access to pie methds,start angle,end angle, tacke in our data
	var pie = d3.layout.pie();

	//we take the .arc(), allows acces to arc methods ourterRadius,end angle
	var arc = d3.svg.arc()
		.startAngle(function(d){ return d.startAngle; })
  		.endAngle(function(d){ return d.endAngle; })
		.innerRadius(innerRadius)
		.outerRadius(outerRadius);


	//We we create an empty element
	var arcs = svg.selectAll('g.arc')
	//we pass it the pie data
		.data(pie(dataset))
		.enter()
		.append('g')
		.attr("class","arc")
	//this were each wedge is created
		.attr("transform","translate("+outerRadius+","+outerRadius+")");

	//We take our g element created and append a path
	//This creates the paths that we SEE
	//Translates our data in to visuals
	//creating a d attribue and then referencing our arc that we set up
	arcs.append("path")
	.attr("fill","#ffffff")
	.transition()
		.delay(function(d,i){
			return i * 600
		})
		.duration(1000)
		.ease('bounce')
		.attr("fill",function(d,i){
			return color(i);
		})
		
		.attrTween("d", pieTween)
		//.attr("d",arc)
	arcs.append('text')
		.transition()
		.delay(function(d,i){
			return i * 600
		})
		.duration(1000)
		.ease('bounce')
	.attr('transform',function(d){return "translate("+arc.centroid(d)+")"})
	.attr("text-anchor","middle")
	.text(function(d){return d.value})
		
//this function interpolates between a starting and ending poing
function pieTween(d, i) {
    s0 = 0;
    e0 = 0;
  var i = d3.interpolate({startAngle: d.startAngle, endAngle: d.endAngle}, {startAngle: d.endAngle , endAngle: d.startAngle});
  return function(t) {
    var b = i(t);
    return arc(b);
  };
}
}
mostCountry()
function comparisonBar(){
	w=jQuery('#comparisonBar').width();
	h=jQuery('#comparisonBar').height();
	console.log(w)
	       var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
        var barpadding = 1;
        var xScale = d3.scale.ordinal();
//we want to dynamically get the widths of our bands based off the width of our svg object
//we create a scale ordinal this time because we want our bars to appear in the same order as our dataset
//we "push" the index points of our array with range()
            xScale.domain(d3.range(dataset.length))
//this will give evenly width bands with a 20% spacing
//ir loops throught our domain/input and takes the width our our svg object, it then adds a 20% spacing in between each.
                  .rangeRoundBands([0,w],.1)
//for our y scale we use a linear scale since we have number values in our array.
//we begin with the range of our input vlues
//we then output a rand of values from 0 to our height of the range of values we have in our set.                  
        var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset)])
            .range([0, h]);
        //append and svg object to our document
        var svg = d3.select('#comparisonBar');
        //create rectangle
        svg.selectAll('rect')
        //we will use our dataset as our data
            .data(dataset)
        //enter creates place holder elements if there are no dom elements to be found, rect in this case
            .enter()
        //for every data value add a coresponding rect
            .append('rect')   .transition()
                .delay(function(d, i) {return i / dataset.length * 1000})
                .duration(1000)
                .ease('bounce')
        //add our attributes to each of our rectangles
            .attr({
                //go through all or our indexs and scale it 
                'x':function(data,index){return xScale(index)},
                //take our current data  point value scaled in relation to our height and substract i from our height
                'y':function(data){return h - yScale(data)},
                'width': xScale.rangeBand(),
                'height':function(data){return yScale(data)},
                'fill':function(d) { return "rgb(0, 0, " + (d * 10) + ")"}
            });
        svg.selectAll('text')
            .data(dataset)
            .enter()
            .append('text')   .transition()
                .delay(function(d, i) {return i / dataset.length * 1000})
                .duration(1000)
                .ease('bounce')
            //retrun an array of text that we can manipulate
            .text(function(d){
                return d
            })
            .attr({
                'text-anchor':'middle',
                //return the width our our current index add its rounded width and divide it by 2 to center it
                'x':function (d,i){return xScale(i) + xScale.rangeBand() / 2;},
                'y':function(d){return h - yScale(d)+14},
                "font-family":"sans-serif",
                "font-size":"11px",
                "fill":"red"
            });

            d3.select('#comparisonBar').on("click",function(){
                
                var numValues = dataset.length; //Count original length of dataset
                var maxValue = 100; 
                dataset = []; //Initialize empty array
                for (var i = 0; i < numValues; i++) { //Loop numValues times
                var newNumber = Math.floor(Math.random() * maxValue); //New random integer (0-24)
                dataset.push(newNumber); //Add new number to array
                }
                yScale.domain([0, d3.max(dataset)]);
               //rebind our events
                svg.selectAll("rect")
                .data(dataset)
                .transition()
                .delay(function(d, i) {return i / dataset.length * 1000})
                .duration(1000)
                .ease('bounce')
                .attr({
                    "y": function(d) {return h - yScale(d)},
                    "height": function(d) {return yScale(d)},
                    "fill": function(d) { return "rgb(0, 0, " + (d * 10) + ")"}
                });
                
                   svg.selectAll('text')
                .data(dataset)
                .transition()
                .delay(function(d, i) {return i / dataset.length * 1100})
                .duration(1000)
                .ease('bounce')
                //retrun an array of text that we can manipulate
                .text(function(d){
                    return d
                })      .attr({
                'text-anchor':'middle',
                //return the width our our current index add its rounded width and divide it by 2 to center it
                'x':function (d,i){return xScale(i) + xScale.rangeBand() / 2;},
                'y':function(d){return h - yScale(d)+14},
                "font-family":"sans-serif",
                "font-size":"11px",
                "fill":"red"
            });
        })
}
comparisonBar()
function comparisonLine(){
		//Width and height
	w=jQuery('#comparisonLine').width();
	h=jQuery('#comparisonLine').height();
			var padding = 50;
			
			//Dynamic, random dataset
			var dataset = [];											//Initialize empty array
			var numDataPoints = 50;										//Number of dummy data points to create
			var maxRange = Math.random() * 1000;						//Max range of new values
			for (var i = 0; i < numDataPoints; i++) {					//Loop numDataPoints times
				var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
				var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
				dataset.push([newNumber1, newNumber2]);					//Add new number to array
			}

			//Create scale functions
			var xScale = d3.scale.linear()
								 .domain([0, d3.max(dataset, function(d) { return d[0]; })])
								 .range([padding, w - padding * 2]);

			var yScale = d3.scale.linear()
								 .domain([0, d3.max(dataset, function(d) { return d[1]; })])
								 .range([h - padding, padding]);

			//Define X axis
			var xAxis = d3.svg.axis()
							  .scale(xScale)
							  .orient("bottom")
							  .ticks(5);

			//Define Y axis
			var yAxis = d3.svg.axis()
							  .scale(yScale)
							  .orient("left")
							  .ticks(5);

			//Create SVG element
			var svg = d3.select("#comparisonLine");

			//Create circles
			svg.selectAll("circle")
			   .data(dataset)
			   .enter()
			   .append("circle")
			   .attr("cx", function(d) {
			   		return xScale(d[0]);
			   })
			   .attr("cy", function(d) {
			   		return yScale(d[1]);
			   })
			   .attr("r", 2);
			
			//Create X axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (h - padding) + ")")
				.call(xAxis);
			
			//Create Y axis
			svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(" + padding + ",6)")
				.call(yAxis);



			//On click, update with new data			
			d3.select("#comparisonLine")
				.on("click", function() {

					//New values for dataset
					var numValues = dataset.length;						 		//Count original length of dataset
					var maxRange = Math.random() * 1000;						//Max range of new values
					dataset = [];  						 				 		//Initialize empty array
					for (var i = 0; i < numValues; i++) {				 		//Loop numValues times
						var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
						var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
						dataset.push([newNumber1, newNumber2]);					//Add new number to array
					}
					
					//Update scale domains
					xScale.domain([0, d3.max(dataset, function(d) { return d[0]; })]);
					yScale.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

					//Update all circles
					svg.selectAll("circle")
					   .data(dataset)
					   .transition()
					   .duration(1000)		
					   .attr("cx", function(d) {
					   		return xScale(d[0]);
					   })
					   .attr("cy", function(d) {
					   		return yScale(d[1]);
					   });

					//Update X axis
					svg.select(".x.axis")
				    	.transition()
				    	.duration(1000)
						.call(xAxis);
					
					//Update Y axis
					svg.select(".y.axis")
				    	.transition()
				    	.duration(1000)
						.call(yAxis);

				});
}
comparisonLine()
});
