const sanji = {
    num2: 0,
    m: texxt.months,
    render: () => {
        d3.json("../data/data.json").then(data => {
            var ss = document.getElementById("h33");
            ss.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp" + "mouths:" + sanji.m[sanji.num2]
            var zj = []
            var place = []
            data.features = data.features.map(function (d) {
                //console.log(d.properties.time)
                d.properties.month = new Date(d.properties.time).getMonth();
                //console.log(d.properties.month)
                //console.log(d)
                return d;
            });
            for (var i = 0; i < data.features.length; i++) {
                if (data.features[i].properties.month == sanji.num2) {
                    zj.push(data.features[i].properties.mag)
                    place.push(data.features[i].properties.place)
                }
            }
            datamiddle = []
            for (var i = 0; i < place.length; i++) {
                var count = 0;
                for (var j = place[i].length; j > 0; j--) {
                    if (place[i][j] != " ") {
                        count++;
                    }
                    if (place[i][j] == " ") {
                        break;
                    }
                }
                //console.log(rect.place[i].length)
                place[i] = place[i].slice(-count)
                datamiddle[i] = place[i].slice(-count)
            }
            for (var i = 0; i < zj.length; i++) {
                datamiddle.push(String(zj[i]))
            }
            var data3 = Array.from(new Set(datamiddle));
            console.log(data3)
            dataset = []
            for (var i = 0; i < data3.length; i++) {
                var data1 = {}
                data1['name'] = data3[i];
                dataset.push(data1)
            }
            var linkss = []
            for (var i = 0; i < place.length; i++) {
                var data2 = {}
                data2['source'] = place[i]
                data2['target'] = String(zj[i]);
                data2['value'] = zj[i];
                linkss.push(data2)
            }
            console.log(dataset)
            console.log(linkss)
            var dom = document.getElementById("sanji");
            var myChart = echarts.init(dom);
            option = {
                series: {
                    type: 'sankey',
                    layout: 'none',
                    focusNodeAdjacency: 'allEdges',
                    data: dataset,
                    links: linkss
                }

            };
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
            var time = document.getElementById("slider");
            time.addEventListener("input", function () {
                sanji.num2 = parseInt(this.value);
                //rect.stat = [];
                //rect.place = [];
                sanji.render();
            })
        })
    }
}
sanji.render()