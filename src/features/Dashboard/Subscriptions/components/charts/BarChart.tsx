import ReactEChartsCore from "echarts-for-react/lib/core";
import { EChartsOption } from "echarts";
import * as echarts from "echarts/core";

const BarChart = () => {
  const option: EChartsOption = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };

  return (
    <ReactEChartsCore echarts={echarts} option={option} notMerge lazyUpdate />
  );
};

export default BarChart;
