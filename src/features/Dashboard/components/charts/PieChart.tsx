import ReactEChartsCore from "echarts-for-react/lib/core";
import { EChartsOption } from "echarts";
import * as echarts from "echarts/core";

interface ITooltipFormatterParams {
  name: string;
  value: number;
  percent: number;
}
interface ITopicOccurencesForChart {
  name: string;
  value: number;
}

interface IPieChartProps {
  title: string;
  data: ITopicOccurencesForChart[];
}

const PieChart = ({ title, data }: IPieChartProps) => {
  const option: EChartsOption = {
    title: {
      text: title,
      left: "center",
      textStyle: {
        fontFamily: "Roboto",
        fontSize: 20,
      },
    },
    tooltip: {
      formatter: (untypedParams: any, _ticket: string): HTMLElement[] => {
        const params = untypedParams as ITooltipFormatterParams;
        const categoryLabel = document.createElement("div");
        const percentage = document.createElement("div");

        categoryLabel.innerText = params.name;
        percentage.innerText = `${params.percent.toString()}% (${
          params.value
        })`;
        percentage.style.fontWeight = "bold";

        return [categoryLabel, percentage];
      },
      textStyle: {
        fontFamily: "Roboto",
      },
    },
    legend: {
      orient: "vertical",
      left: "right",
      textStyle: {
        fontFamily: "Roboto",
        fontSize: 14,
      },
    },
    /**
     * Color scheme uses a warm/cold color combination and
     * a palette generator to pick distinguishable colors between
     * the two primary colors (one warm, one cold).
     * Ref: https://dashboards.mysidewalk.com/style-guide-for-dashboards/pie-charts
     * Ref: https://learnui.design/tools/data-color-picker.html#palette
     */
    color: [
      "#1565c0",
      "#815fc4",
      "#c153b5",
      "#f04a96",
      "#ff546f",
      "#ff7243",
      "#ff9800",
    ],
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
