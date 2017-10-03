$(document).on("ready", function(e){
    var placeholder = $("#placeholder");

    var start = [[2017,320]],
        karavan = [[550,780]],
        skate = [[2085,1800]],
        wc = [[1945,2250]];

    var data = [{ data: start, color: 'red', label: "here",
        points: { show: true, lineWidth : 25, radius: 5, highlightColor: 'red', fillColor: 'red' } },
        { data: karavan, color: 'orange', label: "caravan",
            points: { show: true, lineWidth : 25, radius: 5, highlightColor: 'orange', fillColor: 'orange' } },
        { data: skate, color: 'green', label: "skatingrink",
            points: { show: true, lineWidth : 25, radius: 5, highlightColor: 'green', fillColor: 'green' } },
        { data: wc, color: 'purple', label: "WC",
            points: { show: true, lineWidth : 25, radius: 5, highlightColor: 'purple', fillColor: 'purple' } },
    ];

    var options = {
        canvas: false,
        legend: { show: false },
        series: {
            lines: { show: false },
            points: { show: true, radius: 1, lineWidth : 1 }

        },
        grid: {
            hoverable: true,
            clickable: true,
            borderWidth: {top: 0, right: 0, bottom: 0, left: 0},
        },
        xaxis: {
            ticks: false,
            min: 0,
            max: 3200
        },
        yaxis: {
            ticks: false,
            min: 0,
            max: 2400,
        }
    };

    var plot = $.plotAnimator(placeholder, data, options);

    $("<div id='tooltip'></div>").css({
        position: "absolute",
        display: "none",
        border: "1px solid #eef",
        'border-radius': '5px',
        'font-size': '1.5em',
        'font-family': 'Verdana, Arial',
        'font-weight': 'bold',
        'color': '#282828',
        padding: "2px",
        "background-color": "#fff",
        opacity: 0.95
    })
        .appendTo("body");

    var toolTip = $("#tooltip"),
        TTG = new ToolTipGenerator(toolTip, plot, placeholder, data, options);

    $("#placeholder").bind("plothover", function (event, pos, item) {
        if (item) {
            TTG.showToolTip(item.series.label, item.pageY+5, item.pageX+25)
        } else {
            TTG.hide();
        }
    });

    $("#placeholder").bind("plotclick", function (event, pos, item) {
        plot.unhighlight();
        TTG.detachHighlight();
        if (item) {
            plot.highlight(item.series, item.datapoint);
            TTG.showToolTip(item.series.label, item.pageY+5, item.pageX+25)
            TTG.fixHighlight();
            TTG.buildPath(item.series.label + "Path");
        }
    });

});

var ToolTipGenerator = function(toolTip, plot, placeholder, data, options){
    var _toolTip = toolTip,
        _plot = plot,
        _placeholder = placeholder,
        _data = data,
        _options = options,
        _fixHighlight = false;

    this.showToolTip = function(toolTipName, top, left){
        if(typeof this[toolTipName] === "function"){
            if(_toolTip.css('display') === 'none'){
                this[toolTipName](top, left);
            }
        }
    };

    this.buildPath = function(toolTipName){
        if(typeof this[toolTipName] === "function"){
            _fixHighlight = false;
            this.hide();
            this[toolTipName]();
        }
    };

    this.here = function(top, left){
        _toolTip
            .empty()
            .html("You Are Here")
            .css({top: top, left: left})
            .fadeIn(200);
    };

    this.caravan = function(top, left){
        _toolTip
            .empty()
            .append(
            $("<div></div>")
                .css({
                    'float': 'left',
                    'width': '110px',
                    'height': '100px'
                })
                .append(
                $("<img/>")
                    .attr('src', 'img/karavan.jpg')
                    .css({
                        'width': '100px',
                        'height': '100px'
                    })
            )
        )
            .append(
            $("<div></div>")
                .css({
                    'float': 'left',
                    'width': '200px',
                    'height': '100px'
                })
                .append(
                $("<span></span>")
                    .css({
                        'color': '#333',
                        'text-decoration': 'underline'
                    })
                    .html("Karavan")
            )
                .append(
                $("<br>")
            )
                .append(
                $("<span></span>")
                    .css({
                        'font-size': '0.8em'
                    })
                    .html("xxxxxxxxxxx")
            )
                .append(
                $("<br>")
            )
                .append(
                $("<span></span>")
                    .css({
                        'font-size': '0.8em'
                    })
                    .html("text")
            )
        )
            .append(
            $("<div></div>")
                .css({
                    'clear': 'both'
                })
        )
            .css({top: top, left: left})
            .fadeIn(200);
    };

    this.caravanPath = function(){
        var data2 = clone(_data),
            path = [[551,660],[640,600],[753,600],[854,600],
                [934,520], [934,400],[1000,360],[1100,360],
                [1200,320],[1300,340],[1400,380],[1500,380],[1600,380],
                [1700,380],[1800,380],[1900,380]];

        data2.push(
            { data: path, color: 'red',
                points: { show: true, lineWidth : 2, radius: 4, },
                animator: {steps: 15, duration: 1000, start:0, direction: 'left' } }
        )

        $.plotAnimator(_placeholder, data2, _options);

    }

    this.skatingrink = function(top, left){
        _toolTip
            .empty()
            .append(
            $("<div></div>")
                .css({
                    'float': 'left',
                    'width': '110px',
                    'height': '100px'
                })
                .append(
                $("<img/>")
                    .attr('src', 'img/skating.jpg')
                    .css({
                        'width': '100px',
                        'height': '100px'
                    })
            )
        )
            .append(
            $("<div></div>")
                .css({
                    'float': 'left',
                    'width': '200px',
                    'height': '100px'
                })
                .append(
                $("<span></span>")
                    .css({
                        'color': '#333',
                        'text-decoration': 'underline'
                    })
                    .html("Skatingrink")
            )
                .append(
                $("<br>")
            )
                .append(
                $("<span></span>")
                    .css({
                        'font-size': '0.8em'
                    })
                    .html("xxxxxxxxxxx")
            )
                .append(
                $("<br>")
            )
                .append(
                $("<span></span>")
                    .css({
                        'font-size': '0.8em'
                    })
                    .html("text")
            )
        )
            .append(
            $("<div></div>")
                .css({
                    'clear': 'both'
                })
        )
            .css({top: top, left: left})
            .fadeIn(200);
    };

    this.skatingrinkPath = function(){
        var data2 = clone(_data),
            path = [[2017,440],[2027,540],[2027,640],[2028,740],
                [2029,840],[2030,940],[2031,1040],[2032,1140],
                [2033,1240],[2034,1350],[2035,1460],[2036,1570],
                [2077,1680]];

        data2.push(
            { data: path, color: 'red',
                points: { show: true, lineWidth : 2, radius: 4, },
                animator: {steps: 15, duration: 5000, start:0, direction: 'right' } }
        )

        $.plotAnimator(_placeholder, data2, _options);

    }

    this.WC = function(top, left){
        _toolTip
            .empty()
            .html("WC")
            .css({top: top, left: left})
            .fadeIn(200);
    };

    this.WCPath = function(){

    }

    this.hide = function(){
        if(!_fixHighlight){
            _toolTip.fadeOut(100);
        }
    };

    this.detachHighlight = function(){
        _fixHighlight = false;
    };

    this.fixHighlight = function(){
        _fixHighlight = true;
    };
}

clone = function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}