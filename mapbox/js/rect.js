const rect = {
    num1: 0,
    mon: texxt.months,
    stat: [],
    place: [],
    render: () => {
        d3.json("../data/data.json").then(data => {
            rect.stat = [];
            rect.place = [];
            var dom = document.getElementById("rect");
            var myChart = echarts.init(dom);
            data.features = data.features.map(function (d) {
                //console.log(d.properties.time)
                d.properties.month = new Date(d.properties.time).getMonth();
                //console.log(d.properties.month)
                //console.log(d)
                return d;
            });
            console.log(rect.stat)
            for (var i = 0; i < data.features.length; i++) {
                if (data.features[i].properties.month == rect.num1) {
                    rect.stat.push(data.features[i].properties.sig)
                    rect.place.push(data.features[i].properties.place)
                }
            }

            for (var i = 0; i < rect.place.length; i++) {
                var count = 0;
                for (var j = rect.place[i].length; j > 0; j--) {
                    if (rect.place[i][j] != " ") {
                        count++;
                    }
                    if (rect.place[i][j] == " ") {
                        break;
                    }
                }
                //console.log(rect.place[i].length)
                rect.place[i] = rect.place[i].slice(-count)
            }
            console.log(rect.stat)
            option = null;
            option = {
                title: {
                    text: '地震死亡人数',
                    subtext: '数据来自网络'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: [rect.mon[rect.num1]]
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: rect.place
                },
                series: [{
                        name: rect.mon[rect.num1],
                        type: 'bar',
                        data: rect.stat
                    },
                    // {
                    //     name: '2012年',
                    //     type: 'bar',
                    //     data: [19325, 23438, 31000, 121594, 134141, 681807]
                    // }
                ]
            };;
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
            var time = document.getElementById("slider");
            time.addEventListener("input", function () {
                rect.num1 = parseInt(this.value);
                //rect.stat = [];
                //rect.place = [];
                rect.render();
            })
        })
    }
}
rect.render();