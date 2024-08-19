layui.define(function(e) {
	layui.use(["admin", "carousel"],
	function() {
		var e = layui.$,
		a = (layui.admin, layui.carousel),
		t = layui.element,
		l = layui.device();
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
				text: "\u4eca\u65e5\u6d41\u91cf\u8d8b\u52bf",
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
				data: ["06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"]
			}],
			yAxis: [{
				    type: 'value',
            name: '流量',           
            axisLabel: {
                formatter: '{value}M'
            }
			}],
			series: [{
				name: "流量出",
				type: "line",
				smooth: !0,
				itemStyle: {
					normal: {
						areaStyle: {
							type: "default"
						}
					}
				},
				data: [11111, 22112, 31133, 4414, 555, 666, 3333, 33333, 55555, 66666, 33333, 3333, 6666, 11888, 26666, 38888, 56666, 42222, 39999, 28888, 17777, 9666, 6555, 5555, 3333, 2222, 3111, 6999, 5888, 2777, 1666, 999, 888, 777]
			},
			{
				name: "流量进",
				type: "line",
				smooth: !0,
				itemStyle: {
					normal: {
						areaStyle: {
							type: "default"
						}
					}
				},
				data: [1111, 21112, 33, 44, 55, 66, 333, 3333, 5555, 12666, 3333, 333, 666, 1188, 2666, 3888, 6666, 4222, 3999, 2888, 1777, 966, 655, 555, 333, 222, 311, 699, 588, 277, 166, 99, 88, 77]
			}]
		},
		{
			title: {
				text: "一周流量趋势",
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
			})
		};
		
		CoreUtil.sendAjax("/bigdata/todayflux.json?token=" + token,null,function (res) {
			
			      if(res.todayflow != null && res.todayip != null ){    
			       	   $("#lcount4").html(res.todayip + "个");
			       	   $("#lcount5").html(res.todayflow + "M");
			       	   if (res.todayflow > 1000) {
			       	   	  $("#lcount5").html(res.todayflow/1000 + "G");
			       	   }
			       	   
			      }
                   
            if(res.xdata != null && res.ydata1 != null ){             	 
               n[0].xAxis[0].data  = res.xdata;	
               n[0].series[0].data = res.ydata1;
               n[0].series[1].data = res.ydata2;
               n[0].title.text = "今日流量趋势";
               r(0);
            }
            if(res.x2data != null && res.y2data != null ){             	 
               n[1].xAxis[0].data  = res.x2data;	
               n[1].series[0].data = res.y2data;              
               n[1].title.text = "一周流量趋势（兆）";
               r(1);
            }
           },"GET",false);
		
		element.on('tab(tab-title)', function(data){	   
	
		    var e = (layui.$, layui.table);
		    var mt =  Date.parse(new Date());
		    var myurl = "abc.json?" + mt /1000;
		    var myelem = "#LAY-index-topSearch"
		
		    myurl = "/bigdata/table" + data.index + ".json?token=" + token + "&" + mt /1000;
		    myelem = "#table" + data.index;
		    
		    $(function () {
	          CoreUtil.sendAjax(myurl,null,function (res) {
            if(res.data != null){           
             
               loadTable(myurl,myelem,res.data,res.title);
          
            }  
            
            if(res.x2data != null && res.y2data != null ){             	 
               n[1].xAxis[0].data  = res.x2data;	
               n[1].series[0].data = res.y2data;              
               n[1].title.text = "一月数据趋势";
               r(1);
            }
                      
            if(res.xdata != null && res.ydata1 != null ){             	 
               /*n[0].xAxis[0].data  = res.xdata;	
               n[0].series[0].data = res.ydata1;
               n[0].series[1].data = res.ydata2;
               n[0].title.text = "";
               r(0);*/
            }
            
           },"GET",false);
	      });
			});
		
		
         
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
	layui.use(["carousel", "echarts"],
	function() {
		var e = layui.$,
		a = (layui.carousel, layui.echarts),
		t = [],
		l = [{
			title: {
				text: "\u8bbf\u5ba2\u5730\u533a\u5206\u5e03",
				subtext: "\u4e0d\u5b8c\u5168\u7edf\u8ba1"
			},
			tooltip: {
				trigger: "item"
			},
			dataRange: {
				orient: "horizontal",
				min: 0,
				max: 6e4,
				text: ["\u9ad8", "\u4f4e"],
				splitNumber: 0
			},
			series: [{
				name: "\u8bbf\u5ba2\u5730\u533a\u5206\u5e03",
				type: "map",
				mapType: "china",
				selectedMode: "multiple",
				itemStyle: {
					normal: {
						label: {
							show: !0
						}
					},
					emphasis: {
						label: {
							show: !0
						}
					}
				},
				data: [{
					name: "\u897f\u85cf",
					value: 60
				},
				{
					name: "\u9752\u6d77",
					value: 167
				},
				{
					name: "\u5b81\u590f",
					value: 210
				},
				{
					name: "\u6d77\u5357",
					value: 252
				},
				{
					name: "\u7518\u8083",
					value: 502
				},
				{
					name: "\u8d35\u5dde",
					value: 570
				},
				{
					name: "\u65b0\u7586",
					value: 661
				},
				{
					name: "\u4e91\u5357",
					value: 8890
				},
				{
					name: "\u91cd\u5e86",
					value: 10010
				},
				{
					name: "\u5409\u6797",
					value: 5056
				},
				{
					name: "\u5c71\u897f",
					value: 2123
				},
				{
					name: "\u5929\u6d25",
					value: 9130
				},
				{
					name: "\u6c5f\u897f",
					value: 10170
				},
				{
					name: "\u5e7f\u897f",
					value: 6172
				},
				{
					name: "\u9655\u897f",
					value: 9251
				},
				{
					name: "\u9ed1\u9f99\u6c5f",
					value: 5125
				},
				{
					name: "\u5185\u8499\u53e4",
					value: 1435
				},
				{
					name: "\u5b89\u5fbd",
					value: 9530
				},
				{
					name: "\u5317\u4eac",
					value: 51919
				},
				{
					name: "\u798f\u5efa",
					value: 3756
				},
				{
					name: "\u4e0a\u6d77",
					value: 59190
				},
				{
					name: "\u6e56\u5317",
					value: 37109
				},
				{
					name: "\u6e56\u5357",
					value: 8966
				},
				{
					name: "\u56db\u5ddd",
					value: 31020
				},
				{
					name: "\u8fbd\u5b81",
					value: 7222
				},
				{
					name: "\u6cb3\u5317",
					value: 3451
				},
				{
					name: "\u6cb3\u5357",
					value: 9693
				},
				{
					name: "\u6d59\u6c5f",
					value: 62310
				},
				{
					name: "\u5c71\u4e1c",
					value: 39231
				},
				{
					name: "\u6c5f\u82cf",
					value: 35911
				},
				{
					name: "\u5e7f\u4e1c",
					value: 55891
				}]
			}]
		}],
		i = e("#LAY-index-pagethree-home").children("div"),
		n = function(e) {
			t[e] = a.init(i[e], layui.echartsTheme),
			t[e].setOption(l[e]),
			window.onresize = t[e].resize
		};
		i[0] && n(0)
	}),
	layui.use("table",
	function() {
		var e = (layui.$, layui.table);
		e.render({
			elem: "#table10",
			url: "./json/console/top-search.js",
			page: !0,
			cols: [[{
				type: "numbers",
				fixed: "left"
			},
			{
				field: "keywords",
				title: "\u5173\u952e\u8bcd",
				minWidth: 300,
				templet: '<div><a href="https://www.baidu.com/s?wd={{ d.keywords }}" target="_blank" class="layui-table-link">{{ d.keywords }}</div>'
			},
			{
				field: "frequency",
				title: "\u641c\u7d22\u6b21\u6570",
				minWidth: 120,
				sort: !0
			},
			{
				field: "userNums",
				title: "\u7528\u6237\u6570",
				sort: !0
			}]],
			skin: "line"
		}),
		e.render({
			elem: "#table1",
			url: "./json/console/top-card.js",
			page: !0,
			cellMinWidth: 120,
			cols: [[{
				type: "numbers",
				fixed: "left"
			},
			{
				field: "title",
				title: "\u6807\u9898",
				minWidth: 300,
				templet: '<div><a href="{{ d.href }}" target="_blank" class="layui-table-link">{{ d.title }}</div>'
			},
			{
				field: "username",
				title: "\u53d1\u5e16\u8005"
			},
			{
				field: "channel",
				title: "\u7c7b\u522b"
			},
			{
				field: "crt",
				title: "\u70b9\u51fb\u7387",
				sort: !0
			}]],
			skin: "line"
		}),
		e.render({
			elem: "#LAY-home-homepage-console",
			url: "/bigdata/homerisk.json?token=" + token,
			height: '200',
			cols: [[
			{
				field: "time",
				title: "时间",
				width: 120,
				templet: '<div><a lay-href="/airisk" class="layui-table-link">{{ d.time }}</div>'  
			},
			{
				field: "src_ip",
				title: "IP地址",
				width: 130
			},
			{
				field: "msg",
				title: "事件",			
			},
			{
				field: "risk",
				title: "风险",
				width: 60,
				templet: function(e) {
					return "中" == e.risk ? '<del style="color: #5FB878;">' + e.risk + "</del>": "高" == e.risk ? '<span style="color: #FFB800;">' + 
					       e.risk + "</span>": '<span style="color: #FF5722;">' + e.risk + "</span>"
				}
			}]],
			skin: "line"
		})
	}),
	e("console", {})
});