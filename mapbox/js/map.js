const mapp = {
	numm: 0,
	render: () => {
		mapboxgl.accessToken =
			"pk.eyJ1IjoieXp5LWx5eSIsImEiOiJja2NrNTczZXQxMzI1MnFzNXNlaHNmdHZ5In0.LHug4Sn0ccPTq3uOOPZjcw";
		var map = new mapboxgl.Map({
			container: "map",
			style: "mapbox://styles/mapbox/light-v10",
			center: [110.4606, 35.7927],
			zoom: 0.8,
		});
		var num = 0;
		var months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		function filterBy(month) {
			var filters = ["==", "month", month];
			map.setFilter("earthquake-circles", filters);
			map.setFilter("earthquake-labels", filters);
			map.setFilter("earthquakes-heat", filters);
			// Set the label to the month
			document.getElementById("month").textContent = months[month];
		}
		//console.log(months[num])
		map.on("load", function () {
			d3.json("../data/data.json").then((data) => {
				data.features = data.features.map(function (d) {
					//console.log(d.properties.time)
					d.properties.month = new Date(d.properties.time).getMonth();
					//console.log(d.properties.month)
					//console.log(d)
					return d;
				});
				// console.log(data.features)
				console.log(data);
				map.addSource("earthquakes", {
					type: "geojson",
					data: data,
				});
				var bu1 = document.getElementById("bu2");
				bu1.addEventListener("click", function () {
					map.removeLayer("earthquake-circles");
					map.removeLayer("earthquake-labels");
					map.removeLayer("earthquakes-heat");
					map.addLayer({
							id: "earthquakes-heat",
							type: "heatmap",
							source: "earthquakes",
							maxzoom: 9,
							paint: {
								// Increase the heatmap weight based on frequency and property magnitude
								"heatmap-weight": [
									"interpolate",
									["linear"],
									["get", "mag"],
									0,
									0,
									8,
									1,
								],
								// Increase the heatmap color weight weight by zoom level
								// heatmap-intensity is a multiplier on top of heatmap-weight
								"heatmap-intensity": [
									"interpolate",
									["linear"],
									["zoom"],
									0,
									1,
									9,
									3,
								],
								// Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
								// Begin color ramp at 0-stop with a 0-transparancy color
								// to create a blur-like effect.
								"heatmap-color": [
									"interpolate",
									["linear"],
									["heatmap-density"],
									0,
									"rgba(33,102,172,0)",
									0.1,
									"rgb(103,169,207)",
									0.2,
									"rgb(209,229,240)",
									0.3,
									"rgb(253,219,199)",
									0.4,
									"rgb(239,138,98)",
									0.5,
									"rgb(178,24,43)",
								],
								// Adjust the heatmap radius by zoom level
								"heatmap-radius": [
									"interpolate",
									["linear"],
									["zoom"],
									0,
									2,
									100,
									2000,
								],
								// Transition from heatmap to circle layer by zoom level
								"heatmap-opacity": [
									"interpolate",
									["linear"],
									["zoom"],
									7,
									1,
									9,
									0,
								],
							},
						},
						"waterway-label"
					);
					filterBy(mapp.numm);
				});
				var bu2 = document.getElementById("bu1");
				bu2.addEventListener("click", function () {
					//console.log(color[0].style.background);
					map.removeLayer("earthquake-circles");
					map.removeLayer("earthquake-labels");
					map.removeLayer("earthquakes-heat");
					map.addLayer({
						id: "earthquake-circles",
						type: "circle",
						source: "earthquakes",
						paint: {
							"circle-color": [
								"interpolate",
								["linear"],
								["get", "mag"],
								6,
								"#FCA107",
								8,
								"#7F3121",
							],
							"circle-opacity": 0.75,
							"circle-radius": [
								"interpolate",
								["linear"],
								["get", "mag"],
								6,
								20,
								8,
								40,
							],
						},
					});
					map.addLayer({
						id: "earthquake-labels",
						type: "symbol",
						source: "earthquakes",
						layout: {
							"text-field": ["concat", ["to-string", ["get", "mag"]], "m"],
							"text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
							"text-size": 12,
						},
						paint: {
							"text-color": "rgba(0,0,0,0.5)",
						},
					});
					filterBy(mapp.numm);
				});
				map.addLayer({
					id: "earthquake-circles",
					type: "circle",
					source: "earthquakes",
					paint: {
						"circle-color": [
							"interpolate",
							["linear"],
							["get", "mag"],
							6,
							"#FCA107",
							8,
							"#7F3121",
						],
						"circle-opacity": 0.75,
						"circle-radius": [
							"interpolate",
							["linear"],
							["get", "mag"],
							6,
							20,
							8,
							40,
						],
					},
				});
				map.addLayer({
					id: "earthquake-labels",
					type: "symbol",
					source: "earthquakes",
					layout: {
						"text-field": ["concat", ["to-string", ["get", "mag"]], "m"],
						"text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
						"text-size": 12,
					},
					paint: {
						"text-color": "rgba(0,0,0,0.5)",
					},
				});
				filterBy(0);
				document
					.getElementById("slider")
					.addEventListener("input", function (e) {
						console.log(this.value);
						filterBy(parseInt(this.value));
						mapp.numm = parseInt(this.value);
					});
			});
		});
		//console.log('严🐕必死')
	},
};
mapp.render();