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
      <div className="w-full">
        <div className="grid grid-col-3">
          <div className="">
            <Adsense client="ca-pub-5961109963651073" slot="1134980782" />
          </div>
          <div className="col-span-2">
            <DRCalculator />
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
