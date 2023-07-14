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
        <div className="flex pt-10 px-10">
          <div className="w-1/2 mr-5">
            <Adsense client="ca-pub-5961109963651073" slot="1134980782" />
          </div>
          <div className="w-1/2">
            <DRCalculator />
          </div>
        </div>
        <div className="text-center text-white my-10 text-2xl">Instruction</div>
        <div className="text-center text-white mt-10">
          Since not every class has fortified shield, enable the fortified if
          you do have fortified status. For the class damage reduction, it means
          your damage reduction from bleeding, burning, posioned or affected by
          shadow damage and so on. Unique damage reduction, you could add this
          section as many as you want based on those damage reduction you have,
          etc: spells which could grant you damage reduction, or damage
          reduction from Vulerable enemies. In other words, any damage reduction
          not listed above could be added here. At the end, calculator will help
          you calculate your final damage reduction against close enemy and
          distant enemy, FYI, this calculator did not include amor system so
          damage reduction benefit from amor has been excluded so far.{" "}
        </div>
      </div>
    </ConfigProvider>
  );
}
