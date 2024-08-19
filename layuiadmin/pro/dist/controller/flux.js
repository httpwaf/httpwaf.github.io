
layui.define(function(e) {
	layui.use(["admin", "carousel", "laydate"],
	function() {
		var e = layui.$,
		a = (layui.admin, layui.carousel),
		t = layui.element,
		l = layui.device();
		
		var laydate = layui.laydate;	
		laydate.render({
            elem: '#date'
            , type: 'date'
            ,theme: '#1E9FFF'
            , done: function (value, date, endDate) {
                if (value != null && value != undefined && value != "") {                	  
                    //alert(value);
                } 
            }
    });
        	
        	
		e(".layadmin-carousel").each(function() {
			var t = e(this);
			a.render({
				elem: this,
				width: "100%",
				arrow: "none",
				interval: t.data("interval"),
				autoplay: t.data("autoplay") === !0,
				trigger: l.ios || l.android ? "click": "hover",
				anim: t.data("anim")
			})
		}),
		t.render("progress")
	}),
	layui.use(["admin", "carousel", "echarts"],
	function() {
		var e = layui.$,
		a = layui.admin,
		t = layui.carousel,
		l = layui.echarts,
		i = [],
		n = [{
			title: {
				text: "",
				x: "center",
				textStyle: {
					fontSize: 14
				}
			},
			tooltip: {
				trigger: "axis"
			},
			legend: {
				data: ["", ""]
			},
			xAxis: [{
				type: "category",
				boundaryGap: !1,
				//data : x2data
				data: ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]
			}],
			yAxis: [{
            type: 'value',
            name: '流量',           
            axisLabel: {
                formatter: '{value}M'
            }
        },
        {
            type: 'value',
            name: 'IP数',
            axisLabel: {
                formatter: '{value}个'
            }
        }],
			series: [{
				name: "流量",
				type: "line",
				barWidth: 20,
				markPoint: {
					data: [{
						type: "max",
						name: "\u6700\u5927\u503c"
					},
					{
						type: "min",
						name: "\u6700\u5c0f\u503c"
					}]
				},
				/*markLine: {
					data: [{
						type: "average",			
						name: "\u5e73\u5747\u503c"
					}]
				},	*/	
				smooth: !0,
				itemStyle: {
					normal: {
						/*color: function(e) {
										var a = ["#C1232B", "#B5C334", "#FCCE10", "#E87C25", "#27727B", "#FE8463", "#9BCA63", "#FAD860", "#F3A43B", "#60C0DD", "#D7504B", "#C6E579", "#F4E001", "#F0805A", "#26C0C0"];
										return a[e.dataIndex]
									},
						color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        {offset: 0, color: '#83bff6'},
                        {offset: 0.5, color: '#188df0'},
                        {offset: 1, color: '#188df0'}
                    ]
                ),		*/	
								
						areaStyle: {
							type: "default"
						}
					}
				},
				//data : y2data
				data: [0, {
            value: 0,
            itemStyle: {
            	normal: {
                color: '#a90000'
              }
            }
        }, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			},
			{
				name: "IP",
				type: "line",
				markPoint: {
					data: [{
						type: "max",
						name: "\u6700\u5927\u503c"
					},
					{
						type: "min",
						name: "\u6700\u5c0f\u503c"
					}]
				},
				/*markLine: {
					data: [{
						type: "average",			
						name: "\u5e73\u5747\u503c"
					}]
				},*/
				yAxisIndex: 1,
				//data: []
				data: [55, 22, 33, 44, 55, 66, 33, 33, 22, 22, 22, 22, 33, 22, 33, 22, 33, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
			}]
		},
		{
			title: {
				text: "一周趋势",
				x: "center",
				textStyle: {
					fontSize: 14
				}
			},
			tooltip: {
				trigger: "axis",
				formatter: "{b}<br>\u65b0\u589e\u7528\u6237\uff1a{c}"
			},
			xAxis: [{
				type: "category",
				data: ["11-07", "11-08", "11-09", "11-10", "11-11", "11-12", "11-13"]
			}],
			yAxis: [{
				type: "value"
			}],
			series: [{
				type: "line",
				data: [200, 300, 400, 610, 150, 270, 380]
			}]
		}],
		o = e("#LAY-index-dataview").children("div"),
		r = function(e) {
			i[e] = l.init(o[e], layui.echartsTheme),
			i[e].setOption(n[e]),
			a.resize(function() {
				i[e].resize()
			}),
			i[e].on('click', function (params) {
				var year = new Date();
				var str  = year.getFullYear() + '-' + params.name;
				
				CoreUtil.sendAjax(filtername + "?onlyfilter=1&date=" + str,null,function (res) {
            window.location.reload();
            
        },"GET",false);
		
				 
			})
		};
		
		
		
		CoreUtil.sendAjax(tablename,null,function (res) {
			
			      if (res.data != null){  
            	  //loadTop();
            	  //loadTable(tablename,"#LAY-app-content-list",res.data,res.title);  
        
            } 	  
                   
            if(res.xdata != null && res.ydata1 != null ){             	 
               n[0].xAxis[0].data  = res.xdata;	
               n[0].series[0].data = res.ydata1;
               n[0].series[1].data = res.ydata2;
               n[0].title.text = "";
               r(0);
            }
            
  },"GET",false);
		
			
		
         
		if (o[0]) {
			r(0);
			var u = 0;
			t.on("change(LAY-index-dataview)",
			function(e) {
				r(u = e.index);
			}),
			layui.admin.on("side",
			function() {
				setTimeout(function() {
					r(u)
				},
				300)
			}),
			layui.admin.on("hash(tab)",
			function() {
				layui.router().path.join("") || r(u)
			})
		}
	}),
	

		layui.use("table",
	function() {
		var e = (layui.$, layui.table);	
		e.render({
			elem: "#LAY-home-homepage-console1",
			url: "/bigdata/table1.json?token="+ token,
			cols: [[
			{
				type: "numbers",
				fixed: "left",
				width: 80
			},
			{
				field: "src_ip",
				title: "IP地址",
				width: 120
			},
			{
				field: "geoip",
				title: "地理位置",			
			},
			{
				field: "risk",
				title: "风险等级",
				width: 100,
				templet: function(e) {
					return "中" == e.risk ? '<del style="color: #5FB878;">' + e.risk + "</del>": "高" == e.risk ? '<span style="color: #FFB800;">' + 
					       e.risk + "</span>": '<span style="color: #FF5722;">' + e.risk + "</span>"
				}
			}]],
			skin: "line"
		})
	}),
	e("flux", {})
});