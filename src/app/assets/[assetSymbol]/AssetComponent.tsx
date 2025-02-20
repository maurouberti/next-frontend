"use client";

import { AssetShow } from "@/app/components/AssetShoww";
import { ChartComponent, ChartComponentRef } from "@/app/components/ChartComponent";
import { Asset } from "@/app/models";
import { Time } from "lightweight-charts";
import { useRef } from "react";

export function AssetChartComponent(props: {
  asset: Asset;
  data?: { time: Time; value: number }[];
}) {
  const chartRef = useRef<ChartComponentRef>(null);

  return (
    <ChartComponent
      ref={chartRef}
      header={<AssetShow asset={props.asset} />}
      data={props.data}
    />
  );
}
