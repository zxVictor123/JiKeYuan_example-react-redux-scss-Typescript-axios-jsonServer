import { useRef } from 'react';
import * as echarts from 'echarts';
import { useEffect } from 'react';


interface ChartPropsType {
    title: string
}
const Chart:React.FC<ChartPropsType> = ({title}) => {
    const chartRef = useRef<HTMLDivElement | null>(null)
useEffect(() => {
const chartDom = chartRef.current;
const myChart = echarts.init(chartDom);

const option = {
  title:{
        text: title
    },
  xAxis: {
    type: 'category',
    data: ['vue','react','angular','selver']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [90,110,90,120],
      type: 'bar'
    }
  ]
};

option && myChart.setOption(option);

    },[])
    return <div ref={chartRef} style={{width: '30rem', height: '30rem'}}></div>
}
export default Chart