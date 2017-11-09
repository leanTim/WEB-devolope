// 该文件是用来写echarts这个图表的文件
$(function () {
  //柱状图
  var firstDom = document.querySelector('.zhu_chart');
  var myChartOne = echarts.init(firstDom);

  var optionOne = {
      
      color: ['#ff0000'],
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      title: {
        text: '2017年注册人数'
      },
      legend: {
        data: ['人数']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              data : ['1月', '2月', '3月', '4月', '5月', '6月'],
              axisTick: {
                  alignWithLabel: true
              }
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              name:'人数',
              type:'bar',
              barWidth: '60%',
              data:[1000, 1800, 3200, 2800, 1400, 1200]
          }
      ]
  };
  
  myChartOne.setOption(optionOne);



  // 饼图
  var secondDom = document.querySelector('.pie_chart');
  var myChartTwo = echarts.init(secondDom);

  optionTwo = {
    title : {
        text: '热门品牌销售',
        subtext: '2017年11月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['air Jordan','ADIDAS','New Balance','Li Ning','NIKE']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'air Jordan'},
                {value:310, name:'ADIDAS'},
                {value:234, name:'New Balance'},
                {value:135, name:'Li Ning'},
                {value:1548, name:'NIKE'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

myChartTwo.setOption(optionTwo);




})
