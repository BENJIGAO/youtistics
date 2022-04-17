import * as echarts from "echarts/core";
import { ScatterChart, PieChart, GaugeChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DatasetComponent,
} from "echarts/components";
import { SVGRenderer } from "echarts/renderers";

export const echartsBootstrap = (): void => {
  echarts.use([
    ScatterChart,
    PieChart,
    GaugeChart,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    LegendComponent,
    DatasetComponent,
    SVGRenderer,
  ]);
};
