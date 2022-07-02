import React, { useState } from "react";
import CustomTooltip from "./CustomTooltip";
import { BarChart, Bar, YAxis, Tooltip, Legend, ReferenceLine } from "recharts";
import "./Chart.css";
type DataItem = {
  name: string;
  value: number;
};

type ChartProps = {
  data: DataItem[];
};

type toolipDataProps = {
  text: string;
  value: string;
  x?: string;
  isVisible: boolean;
  isClick: boolean;
};

const Chart = ({ data }: ChartProps) => {
  const [barColor, setBarColor] = useState({
    profit: false,
    loss: false,
    all: false
  });

  const [toolipData, setToolipData] = useState<toolipDataProps>({
    text: "",
    value: "",
    x: "",
    isVisible: false,
    isClick: false
  });

  const moustOver = (text: string, value: string, x: string) => {
    if (!toolipData.isClick) {
      setBarColor({
        loss: text !== "已實現虧損",
        profit: text !== "已實現獲利",
        all: text !== "總交易成本"
      });
      setToolipData({
        ...toolipData,
        isVisible: true,
        text: text,
        value: value,
        x: x
      });
    }
  };

  const moustOut = () => {
    if (!toolipData.isClick) {
      setBarColor({ loss: false, profit: false, all: false });
      setToolipData({
        ...toolipData,
        isVisible: false,
        text: "",
        value: "",
        x: undefined
      });
    }
  };

  return (
    <div className="content">
      <BarChart width={200} height={300} data={data} stackOffset="sign">
        <Bar
          dataKey="已實現獲利"
          fill="#0076FF"
          stackId="stack"
          style={{ opacity: barColor.profit ? "0.5" : "1" }}
          onMouseOver={(e) => {
            moustOver("已實現獲利", e.已實現獲利, e.x);
          }}
          onClick={() => {
            setToolipData({ ...toolipData, isClick: !toolipData.isClick });
          }}
          onMouseOut={() => {
            moustOut();
          }}
        />
        <Bar
          dataKey="已實現虧損"
          fill="#221FC0"
          stackId="stack"
          style={{ opacity: barColor.loss ? "0.5" : "1" }}
          onMouseOver={(e) => {
            moustOver("已實現虧損", e.已實現虧損, e.x);
          }}
          onClick={() => {
            setToolipData({ ...toolipData, isClick: !toolipData.isClick });
          }}
          onMouseOut={() => {
            moustOut();
          }}
        />
        <Bar
          dataKey="總交易成本"
          fill="#FF8900"
          stackId="stack"
          style={{ opacity: barColor.all ? "0.5" : "1" }}
          onMouseOver={(e) => {
            moustOver("總交易成本", e.總交易成本, e.x);
          }}
          onMouseOut={() => {
            moustOut();
          }}
          onClick={() => {
            setToolipData({ ...toolipData, isClick: !toolipData.isClick });
          }}
        />
        <YAxis
          domain={["dataMin", "dataMax"]}
          tickLine={false}
          axisLine={false}
          allowDataOverflow={false}
        />
        {toolipData.isVisible && (
          <Tooltip
            position={{ y: -46, x: toolipData.x }}
            cursor={false}
            wrapperStyle={{
              visibility: "visible"
            }}
            content={
              <CustomTooltip text={toolipData.text} value={toolipData.value} />
            }
          />
        )}

        <Legend wrapperStyle={{ position: "relative", marginTop: "0px" }} />
        <ReferenceLine y={0} stroke="gray" />
      </BarChart>
    </div>
  );
};

export default Chart;
