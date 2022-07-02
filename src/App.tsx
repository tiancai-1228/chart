import "./styles.css";
import ReactWithD3Chart from "./Chart";
export default function App() {
  const data = [
    {
      name: "Nike",
      已實現獲利: 200,
      已實現虧損: -80
    },
    {
      name: "Adidas",
      總交易成本: 136
    }
  ];
  return (
    <div className="App">
      <h1>圖表標題</h1>
      <h2>
        那明感頭政、合行利更有動不！議突創天海來、發心們有多，把有灣展子幾上國陸不真傳數
      </h2>
      <div className="chart"></div>
      <ReactWithD3Chart data={data} />
    </div>
  );
}
