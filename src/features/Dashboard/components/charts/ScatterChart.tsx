import ReactEChartsCore from "echarts-for-react/lib/core";
import { EChartsOption } from "echarts";
import * as echarts from "echarts/core";
import { nFormatter } from "common/utils/generalUtils";

interface ITooltipFormatterParams {
  name: string;
  value: number;
  data: (string | number)[];
}

interface IScatterChartParams {
  data: [number, number, string][];
}

const ScatterChart = ({ data }: IScatterChartParams) => {
  const option: EChartsOption = {
    title: {
      text: "Subscribers vs Views",
      left: "center",
      textStyle: {
        fontFamily: "Roboto",
        fontSize: 20,
      },
    },
    xAxis: {
      name: "Subscribers",
      nameLocation: "middle",
      nameTextStyle: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        color: "#000000",
      },
      nameGap: 30,
      axisLabel: {
        formatter: (value: number): string => {
          return nFormatter(value.toString(), 1);
        },
      },
    },
    yAxis: {
      name: "Views",
      nameLocation: "middle",
      nameTextStyle: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        color: "#000000",
      },
      nameGap: 50,
      axisLabel: {
        formatter: (value: number): string => {
          return nFormatter(value.toString(), 1);
        },
      },
    },
    tooltip: {
      formatter: (untypedParams: any, _ticket: string): HTMLElement[] => {
        const params = untypedParams as ITooltipFormatterParams;
        const channelLabel = document.createElement("div");
        const subscriberViewLabel = document.createElement("div");

        channelLabel.innerText = params.data[2].toString();
        channelLabel.style.fontWeight = "bold";
        subscriberViewLabel.innerText = `Subscribers: ${nFormatter(
          params.data[0].toString(),
          1
        )}\nViews: ${nFormatter(params.data[1].toString(), 1)}`;

        return [channelLabel, subscriberViewLabel];
      },
      textStyle: {
        fontFamily: "Roboto",
      },
    },
    series: [
      {
        symbolSize: 10,
        data: data,
        type: "scatter",
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

export default ScatterChart;
