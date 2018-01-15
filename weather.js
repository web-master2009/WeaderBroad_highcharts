var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];  
var state = false;
  $(function () {

            var chart1;
            var chart2;
            var chart3;
            var controllingChart;

            var defaultTickInterval = 5;
            var currentTickInterval = defaultTickInterval;

            var container_title = "Root Zone Soil Moisture Depletion:";
            var xrange_title = "Growth Stages";
            var ET_title = "";
            var hasPlotBand = false;

            var seriesAOptions = [];
            var seriesBOptions = [];
            var seriesCOptions = [];
            var seriesDOptions = [];
            function unzoom() {
                chart1.options.chart.isZoomed = false;
                chart2.options.chart.isZoomed = false;
                chart3.options.chart.isZoomed = false;

                chart1.xAxis[0].setExtremes(null, null);
                chart2.xAxis[0].setExtremes(null, null);
                chart3.xAxis[0].setExtremes(null, null);
            }

            $('#btn').click(function () {
                unzoom();
            });

            var myPlotLineId = "myPlotLine";

            //catch mousemove event and have all 3 charts' crosshairs move along indicated values on x axis

            function syncronizeCrossHairs(chart) {
                var container = $(chart.container),
                    offset = container.offset(),
                    x, y, isInside, report;

                container.mousemove(function (evt) {

                    x = evt.clientX - chart.plotLeft - offset.left;
                    y = evt.clientY - chart.plotTop - offset.top;
                    var xAxis = chart.xAxis[0];
                    //remove old plot line and draw new plot line (crosshair) for this chart
                    var xAxis1 = chart1.xAxis[0];
                    xAxis1.removePlotLine("myPlotLineId");
                    xAxis1.addPlotLine({
                        value: chart.xAxis[0].translate(x, true),
                        width: 1,
                        color: 'red',
                        //dashStyle: 'dash',
                        id: "myPlotLineId"
                    });
                    //remove old crosshair and draw new crosshair on chart2
                    var xAxis2 = chart2.xAxis[0];
                    xAxis2.removePlotLine("myPlotLineId");
                    xAxis2.addPlotLine({
                        value: chart.xAxis[0].translate(x, true),
                        width: 1,
                        color: 'red',
                        //dashStyle: 'dash',
                        id: "myPlotLineId"
                    });

                    var xAxis3 = chart3.xAxis[0];
                    xAxis3.removePlotLine("myPlotLineId");
                    xAxis3.addPlotLine({
                        value: chart.xAxis[0].translate(x, true),
                        width: 1,
                        color: 'red',
                        //dashStyle: 'dash',
                        id: "myPlotLineId"
                    });

                    //if you have other charts that need to be syncronized - update their crosshair (plot line) in the same way in this function.
                });
            }

            //compute a reasonable tick interval given the zoom range -
            //have to compute this since we set the tickIntervals in order
            //to get predictable synchronization between 3 charts with
            //different data.
            function computeTickInterval(xMin, xMax) {
                var zoomRange = xMax - xMin;

                if (zoomRange <= 2)
                    currentTickInterval = 0.5;
                if (zoomRange < 20)
                    currentTickInterval = 1;
                else if (zoomRange < 100)
                    currentTickInterval = 5;
            }

            //explicitly set the tickInterval for the 3 charts - based on
            //selected range
            function setTickInterval(event) {
                var xMin = event.xAxis[0].min;
                var xMax = event.xAxis[0].max;
                computeTickInterval(xMin, xMax);

                chart1.xAxis[0].options.tickInterval = currentTickInterval;
                chart1.xAxis[0].isDirty = true;
                chart2.xAxis[0].options.tickInterval = currentTickInterval;
                chart2.xAxis[0].isDirty = true;
                chart3.xAxis[0].options.tickInterval = currentTickInterval;
                chart3.xAxis[0].isDirty = true;
            }

            //reset the extremes and the tickInterval to default values
            function unzoom() {
                chart1.xAxis[0].options.tickInterval = defaultTickInterval;
                chart1.xAxis[0].isDirty = true;
                chart2.xAxis[0].options.tickInterval = defaultTickInterval;
                chart2.xAxis[0].isDirty = true;
                chart3.xAxis[0].options.tickInterval = defaultTickInterval;
                chart3.xAxis[0].isDirty = true;

                chart1.xAxis[0].setExtremes(null, null);
                chart2.xAxis[0].setExtremes(null, null);
                chart3.xAxis[0].setExtremes(null, null);
            }

            var data = {
                "meta": {
                    "query": {
                        "unitcode": "si-std",
                        "verbose": 1,
                        "latitude": 37.675483,
                        "longitude": -121.693869
                    },
                    "field_timezone_offset": -7,
                    "field_timezone_offset_string": "-07:00",
                    "field_timezone_offset_numeric": -25200,
                    "irrigation": {
                        "system": {
                            "drive_motor_cost": null,
                            "drive_motor_rate": null,
                            "drive_motor_unit": null,
                            "flow_rate": 750.0,
                            "flow_rate_unit": "gpm",
                            "irrigated_area": 130.0,
                            "irrigated_area_unit": "ac",
                            "nozzle_type": 1,
                            "system_type": 2
                        },
                        "water": {
                            "flow_type": 1,
                            "max_soil_moisture_allowed": 39.4,
                            "min_soil_moisture_allowed": 31.2,
                            "set_irrigation_amount": null,
                            "set_irrigation_unit": "n/a",
                            "water_cost": 34.0,
                            "water_unit": "gal"
                        }
                    },
                    "root_zone": {
                        "wilting_point": ".1",
                        "saturation": ".47",
                        "allowable_depletion": ".76"
                    },
                    "season": {
                        "irrigation_amount": 78964,
                        "irrigation_unit": "g/ac",
                        "irrigation_cost": 560.35,
                        "electric_amount": 78964,
                        "electric_unit": "g/ac",
                        "electric_cost": 560.35
                    },

                    "growth_stages": [{
                            "start": 1498867200,
                            "end": 1499126400,
                            "id": "VT",
                            "display_label": "VT"
                        },
                        {
                            "start": 1499126400,
                            "end": 1499644800,
                            "id": "V1",
                            "display_label": "V1"
                        },
                        {
                            "start": 1499644800,
                            "end": 1500076800,
                            "id": "V2",
                            "display_label": "V2"
                        },
                        {
                            "start": 1500076800,
                            "end": 1500681600,
                            "id": "V3",
                            "display_label": "V3"
                        },
                        {
                            "start": 1500681600,
                            "end": 1501459200,
                            "id": "VKL",
                            "display_label": "VKL"
                        }

                    ]
                },

                "data": [{
                    "apiDate": 1498780800000,
                    "apiDateF": "Fri, 30 Jun 2017 00:00:00 GMT",
                    "fieldDate": 1498780800000,
                    "fieldDateF": "Fri, 30 Jun 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50 -Math.round(Math.random() * 100),
                    "forecast": false,
                    "irrigation": null,

                }, {
                    "apiDate": 1498867200000,
                    "apiDateF": "Sat, 01 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1498867200000,
                    "fieldDateF": "Sat, 01 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": null,
                }, {
                    "apiDate": 1498953600000,
                    "apiDateF": "Sun, 02 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1498953600000,
                    "fieldDateF": "Sun, 02 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": null
                }, {
                    "apiDate": 1499040000000,
                    "apiDateF": "Mon, 03 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1499040000000,
                    "fieldDateF": "Mon, 03 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": null
                }, {
                    "apiDate": 1499126400000,
                    "apiDateF": "Tue, 04 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1499126400000,
                    "fieldDateF": "Tue, 04 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1499212800000,
                    "apiDateF": "Wed, 05 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1499212800000,
                    "fieldDateF": "Wed, 05 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": {
                        "field_activity_id": "65fffed4-1537-49a7-ac95-eac5cd572009",
                        "label": "Allison",
                        "unit": "in",
                        "created": 1507569438,
                        "modified": null,
                        "value": 1.23,
                        "activity_time_end": 1501372820483,
                        "activity_time": 1501372800000,
                        "activity_type": 311
                    }
                }, {
                    "apiDate": 1499299200000,
                    "apiDateF": "Thu, 06 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1499299200000,
                    "fieldDateF": "Thu, 06 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": null
                }, {
                    "apiDate": 1499385600000,
                    "apiDateF": "Fri, 07 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1499385600000,
                    "fieldDateF": "Fri, 07 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1499472000000,
                    "apiDateF": "Sat, 08 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1499472000000,
                    "fieldDateF": "Sat, 08 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1499558400000,
                    "apiDateF": "Sun, 09 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1499558400000,
                    "fieldDateF": "Sun, 09 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": {
                        "field_activity_id": "65fffed4-1537-49a7-ac95-eac5cd572009",
                        "label": "Activity A",
                        "unit": "in",
                        "created": 1507569438,
                        "modified": null,
                        "value": 1.23,
                        "activity_time_end": 1501372820483,
                        "activity_time": 1501372800000,
                        "activity_type": 311
                    }
                }, {
                    "apiDate": 1499644800000,
                    "apiDateF": "Mon, 10 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1499644800000,
                    "fieldDateF": "Mon, 10 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1499731200000,
                    "apiDateF": "Tue, 11 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1499731200000,
                    "fieldDateF": "Tue, 11 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1499817600000,
                    "apiDateF": "Wed, 12 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1499817600000,
                    "fieldDateF": "Wed, 12 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1499904000000,
                    "apiDateF": "Thu, 13 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1499904000000,
                    "fieldDateF": "Thu, 13 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1499990400000,
                    "apiDateF": "Fri, 14 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1499990400000,
                    "fieldDateF": "Fri, 14 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1500076800000,
                    "apiDateF": "Sat, 15 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1500076800000,
                    "fieldDateF": "Sat, 15 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1500163200000,
                    "apiDateF": "Sun, 16 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1500163200000,
                    "fieldDateF": "Sun, 16 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": null
                }, {
                    "apiDate": 1500249600000,
                    "apiDateF": "Mon, 17 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1500249600000,
                    "fieldDateF": "Mon, 17 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1500336000000,
                    "apiDateF": "Tue, 18 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1500336000000,
                    "fieldDateF": "Tue, 18 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1500422400000,
                    "apiDateF": "Wed, 19 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1500422400000,
                    "fieldDateF": "Wed, 19 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1500508800000,
                    "apiDateF": "Thu, 20 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1500508800000,
                    "fieldDateF": "Thu, 20 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": null
                }, {
                    "apiDate": 1500595200000,
                    "apiDateF": "Fri, 21 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1500595200000,
                    "fieldDateF": "Fri, 21 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1500681600000,
                    "apiDateF": "Sat, 22 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1500681600000,
                    "fieldDateF": "Sat, 22 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1500768000000,
                    "apiDateF": "Sun, 23 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1500768000000,
                    "fieldDateF": "Sun, 23 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1500854400000,
                    "apiDateF": "Mon, 24 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1500854400000,
                    "fieldDateF": "Mon, 24 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1500940800000,
                    "apiDateF": "Tue, 25 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1500940800000,
                    "fieldDateF": "Tue, 25 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1501027200000,
                    "apiDateF": "Wed, 26 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1501027200000,
                    "fieldDateF": "Wed, 26 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": {
                        "field_activity_id": "65fffed4-1537-49a7-ac95-eac5cd572009",
                        "label": "Activity C",
                        "unit": "in",
                        "created": 1507569438,
                        "modified": null,
                        "value": 1.23,
                        "activity_time_end": 1501372820483,
                        "activity_time": 1501372800000,
                        "activity_type": 311
                    }
                }, {
                    "apiDate": 1501113600000,
                    "apiDateF": "Thu, 27 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1501113600000,
                    "fieldDateF": "Thu, 27 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1501200000000,
                    "apiDateF": "Fri, 28 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1501200000000,
                    "fieldDateF": "Fri, 28 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": {
                        "field_activity_id": "65fffed4-1537-49a7-ac95-eac5cd572009",
                        "label": "Activity D",
                        "unit": "in",
                        "created": 1507569438,
                        "modified": null,
                        "value": 1.23,
                        "activity_time_end": 1501372820483,
                        "activity_time": 1501372800000,
                        "activity_type": 311
                    }
                }, {
                    "apiDate": 1501286400000,
                    "apiDateF": "Sat, 29 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1501286400000,
                    "fieldDateF": "Sat, 29 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }, {
                    "apiDate": 1501372800000,
                    "apiDateF": "Sun, 30 Jul 2017 00:00:00 GMT",
                    "fieldDate": 1501372800000,
                    "fieldDateF": "Sun, 30 Jul 2017 00:00:00 GMT",
                    "wind_speed": 8,
                    "wind_speed_unit": "kph",
                    "air_temp": 28,
                    "air_temp_unit": "C",
                    "et_acc_period": ".12",
                    "et0_acc_period": ".27",
                    "precip_acc_period": 0,
                    "precip_prob": 50-Math.random() * 100,
                    "forecast": false,
                    "irrigation": false
                }]
            };

            //console.log(data);

            // Let's create the data series for each of the charts
            // top chart - depletion line

            seriesAOptions.push({
                name: "Depletion",
                data: data['data'].map(function (x) {
                   return {x:x.fieldDate,
                            y:Math.abs(1 - (Math.random()) * 100),
                            name:'precipitation' // add name property as "precipitation" it will decide what tooltip would show.
                            };
                }),
                pointStart: Date.UTC(2017, 6, 2),
                pointInterval: 24 * 3600 * 1000 * 2,
                zoneAxis: 'x',
                zones: [{
                    value: Date.UTC(2017, 6, 14)
                }, {
                    dashStyle: 'dot'
                }],
                color: {
                    linearGradient: [0, 0, 0, 200],
                    stops: [
                        [0, 'rgb(0, 118, 255)'],
                        [0.5, 'rgb(168, 235, 204)'],
                        [1, 'rgb(255, 89, 0)']
                    ]
                }
            });
            seriesAOptions.push({
                name: "Irrigation Events",
                data: data['data'].map(function (x) {
                    if (x.irrigation) {
                        return {
                            x: x.fieldDate,
                            y: Math.abs(1 - (Math.random()) * 100),
                            name:'irrigation',// add name property as "precipitation"
                            label: x.irrigation.label,
                            marker: {
                                symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                            },
                            field_activity_id: x.irrigation.field_activity_id,
                            unit: x.irrigation.unit,
                            value: Math.abs(1 - (Math.random()) * 100), //x.irrigation.value,
                            activity_time_end: x.irrigation.activity_time_end,
                            activity_time: x.fieldDate,
                            readable: x.fieldDateF,
                            zIndex:5
                        }
                    }
                }),
                lineWidth: 0,
                zIndex:5
            });
            seriesAOptions.push({
                name: "Precip Events",
                data: data['data'].map(function (x) {
                if(x.precip_prob>0)
                 return {               
                            x: x.fieldDate,
                            y: Math.abs(1 - (Math.random()) * 100),
                            label:"My precep chance is " + x.precip_prob,
                            name:"Precip",
                            acc: x.precip_acc_period,
                            marker: {
                                symbol: 'url(http://www.highcharts.com/demo/gfx/snow.png)'
                            },
                            precip_prob_unit: '%',
                            precip_acc_period_unit: 'in',
                            readable: x.fieldDateF
                    }
                }),
                lineWidth: 0,
                zindex:5
            });
            seriesAOptions.push({
                name: 'dummy_data',
                //put this in so that x axis is consistent between 3 charts to begin with
                color: 'rgba(119, 152, 191, .5)',
                showInLegend: false,
                data: [
                    [1498780800000, 0.0],
                    [1501372800000, 0.0]
                ]

            });

            // Removed undefined (why does it do this? Must be something I am doing wrong...)

            seriesAOptions[1].data = seriesAOptions[1].data.filter(function (n) {
                return n != undefined
            });
           seriesAOptions[2].data = seriesAOptions[2].data.filter(function (n) {
                return n != undefined
            });

            // Let's add in growth stages

            seriesBOptions.push({
                name: "Growth Stages",
                data: data.meta.growth_stages.map(function (x) {
                    return {
                        x: x.start * 1000,
                        x2: x.end * 1000,
                        y: 0,
                        id: x.id,
                        color: "#FFF",
                    }
                }),
                borderColor: '#4A90E2',
                pointWidth: 18,
                dataLabels: {
                    enabled: true,
                    color: '#4A90E2',
                    formatter: function () {
                        return this.point.id
                    }
                }


            });

            seriesBOptions.push({
                name: 'dummy_data',
                //put this in so that x axis is consistent between 3 charts to begin with
                color: 'rgba(119, 152, 191, .5)',
                showInLegend: false,
                data: [
                    [1498780800000, 0.0],
                    [1501372800000, 0.0]
                ]

            });

            // Lastly lets add in the real and reference ET
            // Real ET
            seriesCOptions.push({
                name: "Actual ET",
                data: data['data'].map(function (x) {
                    return {
                        x: x.fieldDate,
                        y: parseInt(Math.abs(1 - (Math.random()) * 100))
                    }
                })
            });
            // Real ET
            seriesCOptions.push({
                name: "Reference ET",
                data: data['data'].map(function (x) {
                    return {
                        x: x.fieldDate,
                        y: parseInt(Math.abs(1 - (Math.random()) * 100))
                    };
                })
            });

            seriesCOptions.push({
                name: 'dummy_data',
                //put this in so that x axis is consistent between 3 charts to begin with
                color: 'rgba(119, 152, 191, .5)',
                showInLegend: false,
                data: [
                    [1498780800000, 0.0],
                    [1501372800000, 0.0]
                ]

            });

            var chart1 = new Highcharts.chart('chart1', {
                chart: {
                    type: 'spline',

                    zoomType: 'x',
                         events: {
                    load: function() {
                      var options = this.options.tooltip;
                      this.myTooltip = new Highcharts.Tooltip(this, options);
                    }
                  },
                    plotBackgroundColor: { //define bg gradient
                        linearGradient: [0, 0, 0, 400],
                        stops: [
                            [0.5, 'rgb(255,255,255)'],
                            [0.5000001, 'rgb(255, 248, 238)'],
                            [0.58, 'rgb(255, 248, 238)'],
                            [0.5800001, 'rgb(255, 241, 220)'],
                            [0.66, 'rgb(255, 242, 222)'],
                            [0.6600001, 'rgb(255, 230, 193)'],
                            [0.74, 'rgb(255, 230, 193)'],
                            [0.7400001, 'rgb(255, 210, 140)'],
                            [0.82, 'rgb(255, 210, 140)'],
                            [0.8200001, 'rgb(255, 172, 102)']
                        ]
                    },
                    isZoomed: false

                },


                title: {
                text: container_title,
                align: 'left',
                margin: 0,
                x: 30
              },
                exporting: {
                enabled: false
              },

                xAxis: {
                    type: 'datetime',
                    labels: {
                        format: '{value:%d %b %Y}'
                    },
                    //today

                    plotLines: [{
                        color: '#9B9B9B',
                        width: 1,
                        value: Date.UTC(2017, 6, 14),
                    }],
                    events: {
                        afterSetExtremes: function () {

                            if (!this.chart.options.chart.isZoomed) {
                                var xMin = this.chart.xAxis[0].min;
                                var xMax = this.chart.xAxis[0].max;
                                chart2.options.chart.isZoomed = true;
                                chart3.options.chart.isZoomed = true;
                                chart2.xAxis[0].setExtremes(xMin, xMax, true);

                                chart3.xAxis[0].setExtremes(xMin, xMax, true);
                                chart2.options.chart.isZoomed = false;
                                chart3.options.chart.isZoomed = false;
                            }
                        }
                    }
                },
                yAxis: {
                  min: 0,
                  max: 100,
                  gridLineWidth: 0,
                    ceiling: 120,
                    reversed: true,
                    min: 0,
                    max: 100,
                    tickInterval: 50,
                    title: {
                        text: null,
                        lineWidth: 0,
                        minorGridLineWidth: 0,
                        lineColor: 'transparent',
                        floor: 0,
                        ceiling: 100
                    },
                    labels: {
                      format: '{value} %'
                    },
                    //Allowable Depletion line
                    plotLines: [                    
                        {
                    value: 50,
                    width: 3,
                    color: '#f9a747',
                    label: {
                      text: '<h5 data-toggle="modal" class="line_allowable btn_toggle" href="#modal-form1"><span>Allowable Depletion</span><sapn style="margin-left:5px" class="glyphicon glyphicon-edit"></span></h5>',
                      useHTML: true,
                      style: {
                        color:'rgb(255, 172, 102)',
                        zIndex:1
                      },
                      align: 'right',
                      x:-10,
                      y:-10
                    },
                  },
                                  //Permanent Wilting Point Line       
                {
                  value: 98,
                  width: 1,
                  color: '#FFFFFF',
                  label: {
                  text: '<h5 data-toggle="modal" class="line_permanent btn_toggle" href="#modal-form2">Permanent Wilting Point</h5>',        
                    useHTML: true,
                    style: {
                      color: 'white',
                      fontSize:14
                    },
                    align: 'right',
                    y:-20,
                    x:-10
                  },
                },
                //Saturation Line        
                {
                  value: 0,
                  width: 1,
                  color: '#CFD4D8',
                  label: {
                    text: '<h5 data-toggle="modal" class="line_saturation btn_toggle" href="#modal-form">Saturation</h5>',
                    useHTML: true,
                    style: {
                      color: 'gray',
                      fontSize:14
                    },
                    align: 'right',
                    y:-20,
                    x:-10
                  },
                }
                    ],

                },
                credits: {
                    enabled: false
                },

                legend: {
                    enabled: false
                },
                series: seriesAOptions,
              plotOptions: {
                marker: {
                  enabled: false,
                  radius: 6
                },
                series: {
                  stickyTracking: false,
                  events: {
                    click: function(evt) {//keep the showing tooltip after clicking event
                      this.chart.myTooltip.options.enabled = true;
                      var chart = this.chart;
                      chart.myTooltip.refresh(evt.point, evt);
                      this.chart.myTooltip.options.enabled = false
                      $('.highcharts-tooltip').mouseout(function(){//hide tooltip when mouse out
                        $('.highcharts-tooltip').hide() 
                      })
                      $('.highcharts-tooltip').mouseover(function(){//show tooltip when mouse over
                        $('.highcharts-tooltip').show() 
                      })
                    },
                    mouseOut: function() {            
                      //this.chart.myTooltip.options.enabled = false;
                      
                    }    
                  },
                   point: {
                      events: {
                          click:function(){
                                state = false;
                                $('.highcharts-tooltip').show();
                          }
                      }}
                }
              },
              tooltip: {
                style: {
                  pointerEvents: 'auto'// it makes hover event on the tooltip.
                },
    backgroundColor: '#FFF',
    padding:0,
    useHTML: true,
    enabled: false,
    zIndex:5,
    borderColor:'rgba(228, 229, 230, 0.01)',
    formatter: function() {
    if(this.point.name=='irrigation'){//show Irrigation Event tooltip
        return '<div class="ibox third-e-margins">'+
        '<div class="ibox-title">'+
        '<h5 class="text-center vertical-center">'+
        '<span class="span1 text-center glyphicon glyphicon-menu-left">'+
        '</span>'+
        '<span class="span2 text-center">Irrigation Event</span>'+
        '<span class="span3 text-center   glyphicon glyphicon-menu-right">'+'</span>'+
        '</h5>'+
        '</div>'+
        '<div class="ibox-content">'+
        '<div class="row">'+
'<div class="form-horizontal">'+
    '<span class="col-sm-4 col-xs-4 text-right">Amount:</span>'+
    '<div class="col-sm-8 col-xs-8">1 in.</div>'+
    '<span class="col-sm-4 col-xs-4 text-right">Start:</span>'+
    '<div class="col-sm-8 col-xs-8">'+
    'Jun 28,2017 - 8 A.M'+
    '</div>'+
    '<span class="col-sm-4 col-xs-4 text-right">End:</span>'+
    '<div class="col-sm-8 col-xs-8">Jun 30,2017 - 12 P.M</div>'+
    '<span class="col-sm-4 col-xs-4 text-right">Energy Cost:</span>'+
    '<div class="col-sm-8 col-xs-8">$100.00</div>'+
    '<span class="col-sm-4 col-xs-4 text-right">Water Use:</span>'+
    '<div class="col-sm-8 col-xs-8">9 gal.</div>'+
  '</div>'+
  '</div>'+
  '</div>'+
  '<div class="ibox_bottom">'+ 
   '<div class="col-sm-6 col-xs-6 text-center color_blue btn_control">'+  
    '<h5 class="text-center vertical-center">'+   
     '<span style="width:40%" class="text-right glyphicon glyphicon-pencil">'+
     '</span>'+
      '<span style="width:10%"></span>'+  
       '<span  style="width:50%" class="text-left asdf">Edit</span>'+ 
    '</h5>'+    
    '</div>'+  
    '<div class="col-sm-6 col-xs-6 text-center color_blue btn_control">'+ 
      '<h5 class="text-center vertical-center">'+  
       '<span style="width:30%" class="text-right glyphicon glyphicon-trash">'+ 
       '</span>'+
       '<span style="width:10%"></span>'+ 
       '<span style="width:60%" class="text-left">Delete</span>'+ 
       '</h5>'+ 
    '</div>'+
 '</div>'};
 if(this.point.name=='Precip'){//Show Future Precipitation Event tooltip
    var myDate = new Date(this.x);
    var mDate = myDate.getDate()+1;
      return '<div class="float-e-margins">'+
        '<div class="ibox-title">'+
        '<h5 class="text-center vertical-center">'+
        '<span class="span1 glyphicon text-center glyphicon glyphicon-menu-left"></span>'+
        '<span class="span2 text-center">Future Precipitation Event</span>'+
        '<span class="span3 text-center  glyphicon glyphicon glyphicon-menu-right"></span>'+
        '</h5>'+
        '</div>'+
        '<div class="ibox-content">'+
        '<div class="row">'+
        '<div class="col-sm-12">'+
        'Date:'+monthNames[myDate.getMonth()]+' '+mDate+
        ', '+myDate.getFullYear()+
        '</div>'+
        '</div>'+
        '<div class="row">'+
        '<div class="col-sm-12">'+
        'Amount: '+chart3.series[0].data[this.point.index].y+' In. ('+
        Math.round(this.y)+
        '% chance)'+
        '</div>'+
        '</div>'+
        '</div>';
 }
 return false;
    }
                },
                point: {
                  events: {
                      mouseOver: function () {
                      var chart = this.series.chart;
                      chart.setTitle({ text: container_title + this.y+"%"});
                      }
                    }
                  },

            }, function (chart) { //add this function to the chart definition to get synchronized crosshairs
                syncronizeCrossHairs(chart);
            });

            //Growth Stage container
            var chart2 = new Highcharts.chart('chart2', {
                chart: {
                    type: 'xrange',
                    zoomType: 'x',
                    resetZoomButton: {
                        theme: {
                            fill: 'white',
                            stroke: '#4A90E2',
                            color: '#4A90E2',
                            r: 0,
                            states: {
                                hover: {
                                    fill: '#4A90E2',
                                    style: {
                                        color: 'white'
                                    }
                                }
                            }
                        }
                    },
                    isZoomed: false
                },
                tooltip: {
                    enabled: true
                },
                credits: {
                    enabled: false
                },

                title: {
                    text: xrange_title,
                    align: 'left',
                    margin: 0,
                    x: 10,
                    y: 10
                },
                xAxis: {
                    type: 'datetime',
                    events: {
                        afterSetExtremes: function () {
                            if (!this.chart.options.chart.isZoomed) {
                                var xMin = this.chart.xAxis[0].min;
                                var xMax = this.chart.xAxis[0].max;
                                chart1.options.chart.isZoomed = true;
                                chart3.options.chart.isZoomed = true;
                                chart1.xAxis[0].setExtremes(xMin, xMax, true);

                                chart3.xAxis[0].setExtremes(xMin, xMax, true);
                                chart1.options.chart.isZoomed = false;
                                chart3.options.chart.isZoomed = false;

                            }
                        }
                    },
                    labels: {
                        format: '{value:%d %b %Y}'
                    },
                },

                yAxis: {
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
                },
                series: seriesBOptions
            }, function (chart) { //add this function to the chart definition to get synchronized crosshairs
                syncronizeCrossHairs(chart);
            });

            var chart3 = new Highcharts.chart('chart3', {
                chart: {
                    type: 'spline',
                    isZoomed: false,
                    zoomType: 'x',
                },
                title: {
                    text: null
                },
                xAxis: {
                    //today
                    plotLines: [{ // mark the weekend
                        color: '#9B9B9B',
                        width: 1,
                        value: Date.UTC(2017, 6, 14),
                    }],
                    type: 'datetime',
                    labels: {
                        format: '{value:%b %e}'
                    },
                    events: {
                        afterSetExtremes: function () {
                            if (!this.chart.options.chart.isZoomed) {
                                var xMin = this.chart.xAxis[0].min;
                                var xMax = this.chart.xAxis[0].max;
                                chart1.options.chart.isZoomed = true;
                                chart2.options.chart.isZoomed = true;
                                chart1.xAxis[0].setExtremes(xMin, xMax, true);

                                chart2.xAxis[0].setExtremes(xMin, xMax, true);
                                chart1.options.chart.isZoomed = false;
                                chart2.options.chart.isZoomed = false;

                            }
                        }
                    }
                },
                yAxis: {
                    labels: {
                        format: '{value} In'
                    },
                },
                plotOptions: {
                    line: {
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 2
                            }
                        },
                        marker: {
                            enabled: false
                        },
                    },

                },

                series: seriesCOptions,

                credits: {
                    enabled: false
                },

            }, function (chart) { //add this function to the chart definition to get synchronized crosshairs
                syncronizeCrossHairs(chart);
            });
            $('#reset').click(function () {
                chart1.zoomOut();
                chart2.zoomOut();
                chart3.zoomOut();
            });

            $('#zoom').click(function () {
                //chart1.xAxis[0].setExtremes(Date.UTC(2017, 6, 2), Date.UTC(2017, 6, 4), false);
                //chart1.yAxis[0].setExtremes(null, null);

                //chart2.xAxis[0].setExtremes(Date.UTC(2017, 6, 2), Date.UTC(2017, 6, 4), false);
                //chart2.yAxis[0].setExtremes(null, null);

                //chart3.xAxis[0].setExtremes(Date.UTC(2017, 6, 2), Date.UTC(2017, 6, 4), false);
                //chart3.yAxis[0].setExtremes(null, null);

                //  $('#container').highcharts().xAxis[0].zoom(5,11);
                //  $('#container').highcharts().yAxis[0].zoom(50,100);
                // $('#container').highcharts().redraw();
            });
        });
        $(document).ready(function(){
          $('#chart1').click(function(){
            if(state) $('.highcharts-tooltip').hide()
            else $('.highcharts-tooltip').show()
            state = !state;
          })
          $('.btn_toggle').click(function(){
            state = true;
          })
        })