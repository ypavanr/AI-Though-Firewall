import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export function RadarChart({ data }) {
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions({
      backgroundColor: 'transparent',
      radar: {
        indicator: [
          { name: 'Fear Amplification', max: 100 },
          { name: 'Emotional Manipulation', max: 100 },
          { name: 'Spam / Scams', max: 100 },
          { name: 'Rage Bait', max: 100 },
          { name: 'Misinformation', max: 100 },
          { name: 'Phishing Intent', max: 100 }
        ],
        splitNumber: 4,
        axisName: {
          color: '#94a3b8',
          fontSize: 10,
          fontFamily: 'monospace'
        },
        splitLine: {
          lineStyle: { color: 'rgba(255, 255, 255, 0.1)' }
        },
        splitArea: {
          show: false
        },
        axisLine: {
          lineStyle: { color: 'rgba(255, 255, 255, 0.1)' }
        }
      },
      series: [
        {
          name: 'Manipulation Profile',
          type: 'radar',
          data: [
            {
              value: data || [0, 0, 0, 0, 0, 0],
              name: 'Current Scan',
              areaStyle: {
                color: 'rgba(239, 68, 68, 0.2)'
              },
              lineStyle: {
                color: '#ef4444',
                width: 2
              },
              itemStyle: {
                color: '#ef4444'
              }
            }
          ]
        }
      ]
    });
  }, [data]);

  return <ReactECharts option={options} style={{ height: '100%', width: '100%' }} opts={{ renderer: 'svg' }} />;
}
