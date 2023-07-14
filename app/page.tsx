"use client";
import { DRCalculator } from "@/component/DRCalculator";
import { Adsense } from "@ctrl/react-adsense";
import { ConfigProvider, theme } from "antd";

export default function Home() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div className="w-full" style={{ height: "100%" }}>
        <h1
          className="text-white text-4xl text-center my-5"
          style={{
            textShadow: `0 0 7px #fff,
         0 0 10px #fff,
         0 0 21px #fff,
         0 0 42px #d3d3d3,
         0 0 82px #d3d3d3,
         0 0 92px #d3d3d3,
         0 0 102px #d3d3d3,
         0 0 151px #d3d3d3`,
            letterSpacing: 10,
          }}
        >
          Diablo Damage Reduction Calculator
        </h1>
        <div className="flex pt-10 px-10" style={{ height: "100%" }}>
          <div className="w-1/2 mr-5">
            <Adsense client="ca-pub-5961109963651073" slot="1134980782" />
          </div>
          <div className="w-1/2">
            <DRCalculator />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
