const texxt = {
    num: 0,
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    render: () => {
        d3.json("../data/data.json").then(data => {
            var strr = "";
            data.features = data.features.map(function (d) {
                //console.log(d.properties.time)
                d.properties.month = new Date(d.properties.time).getMonth();
                //console.log(d.properties.month)
                //console.log(d)
                return d;
            });
            var t1 = document.getElementById("text")
            var t2 = document.getElementById("h3");
            t2.innerHTML = texxt.months[texxt.num]
            for (var i = 0; i < data.features.length; i++) {
                if (data.features[i].properties.month == texxt.num) {
                    strr += data.features[i].properties.place + "<br>";
                }
            }
            t1.innerHTML = strr;
            console.log(data.features)
            var time = document.getElementById("slider");
            time.addEventListener("input", function () {
                texxt.num = parseInt(this.value);
                t1.innerHTML = "";
                texxt.render();
            })
        })
    }

}
texxt.render()