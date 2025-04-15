import { useRef } from 'react';
import * as echarts from 'echarts';
import { useEffect } from 'react';

interface ChartPropsType {
    title: string
}

const Chart: React.FC<ChartPropsType> = ({title}) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<echarts.ECharts | null>(null);

    useEffect(() => {
        // 初始化图表
        if (chartRef.current) {
            chartInstance.current = echarts.init(chartRef.current);
        }

        // 清理函数
        return () => {
            if (chartInstance.current) {
                chartInstance.current.dispose();
                chartInstance.current = null;
            }
        };
    }, []); // 只在组件挂载时初始化

    useEffect(() => {
        // 更新图表配置
        if (chartInstance.current) {
            const option = {
                title: {
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

            chartInstance.current.setOption(option);
        }
    }, [title]); // 当 title 改变时更新

    // 处理窗口大小变化
    useEffect(() => {
        const handleResize = () => {
            if (chartInstance.current) {
                chartInstance.current.resize();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div 
            ref={chartRef} 
            style={{width: '30rem', height: '30rem'}}
        />
    );
}

export default Chart;