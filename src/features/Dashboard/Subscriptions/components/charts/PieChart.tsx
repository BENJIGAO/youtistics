import ReactEChartsCore from "echarts-for-react/lib/core";
import { EChartsOption } from "echarts";
import * as echarts from "echarts/core";

interface ITopicOccurencesForChart {
  name: string;
  value: number;
}

interface IPieChartProps {
  data: ITopicOccurencesForChart[];
}

const PieChart = ({ data }: IPieChartProps) => {
  const option: EChartsOption = {
    title: {
      text: "Referer of a Website",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "right",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "75%",
        data: data,
        label: {
          show: false,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <ReactEChartsCore
      style={{ height: "100%" }}
      echarts={echarts}
      option={option}
    />
  );
};

export default PieChart;
