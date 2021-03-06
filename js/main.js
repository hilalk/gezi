            // Your beautiful D3 code will go here
            w = 1100;
            h = 400;
            var data; // a global
            var kelimeler = [];
            var fill = d3.scale.category20();	
            var finalwords = [];

          d3.json("data/gezi.json", function(error, json) {
            if (error) return console.warn(error);
            data = json;
            console.log(data[0].text);


           // kelimeler= data[0].text.split(" ");
		 
		  
		
		for (var i=0; i <data.length; i++) { 
			
				kelimeler = kelimeler.concat(data[i].text.split(" "));

			}

				console.log(kelimeler);

				var wordmap = {};



				_(kelimeler).forEach(function(word) {
						
						if(word in wordmap) {
							console.log("var " + escape(word));
							wordmap[escape(word)]++;
						} else {
							console.log("YOK " + escape(word));
							wordmap[escape(word)] = 1;

						}
				});

			 	var tuples = [];

			 	for(var key in wordmap) tuples.push([key,wordmap[key]]);

			 	tuples.sort(function(a,b) {

			 		a = a[1];
			 		b = b[1];

			 		return a < b ? -1 : (a >b ? 1 :0);

			 	});	

			 for (var i=0; i <tuples.length; i++) { 
			 		



			 		if(tuples[i][1] > 50) {

			 				console.log(tuples[i]);
			 				finalwords.push(tuples[i][0]);

			 		}

			 }



			  d3.layout.cloud().size([ w, h])
		      .words(finalwords.map(function(d) {
		        return {text: d, size: 10 + Math.random() * 90};
		      }))
		      // .rotate(function() { return ~~(Math.random() * 2) * 90; })
		      .font("Impact")
		      .fontSize(function(d) { return d.size; })
		      .on("end", draw)
		      .start();
         
		  

         });
        

		  function draw(words) {
		  	d3.select("#tweet-count").append("text").text(data.length);
		    d3.select("#word-cloud").append("svg")
		        .attr("width", w)
		        .attr("height", h)
		      .append("g")
		        .attr("transform", "translate(550,200)")
		      .selectAll("text")
		        .data(words)
		      .enter().append("text")
		        .style("font-size", function(d) { return d.size + "px"; })
		        .style("font-family", "Impact")
		        .style("fill", function(d, i) { return fill(i); })
		        .attr("text-anchor", "middle")
		        .attr("transform", function(d) {
		          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		        })
		        .text(function(d) { return d.text; });
		  }