import { AssetShow } from "@/app/components/AssetShoww";
import OrderForm from "@/app/components/OrderForm";
import { TabsItem } from "@/app/components/TabsItem";
import { OrderType } from "@/app/models";
import { Card, Tabs } from "flowbite-react";
import { AssetChartComponent } from "./AssetComponent";
import { getAsset } from "@/app/queries/queries";
import { WalletList } from "@/app/components/WalletList";

export default async function AssetDashBoard({
  params,
  searchParams,
}: {
  params: Promise<{ assetSymbol: string }>;
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { assetSymbol } = await params;
  console.log("assetSymbol", assetSymbol);

  if (!assetSymbol) {
    return <WalletList />;
  }

  const { wallet_id: walletId } = await searchParams;
  console.log("walletId", walletId);

  if (!walletId) {
    return <WalletList />;
  }

  const asset = await getAsset(assetSymbol);
  console.log("asset", asset);

  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <div className="flex flex-col space-y-2">
        <AssetShow asset={asset} />
        <div className="ml-2 font-bold text-2xl">R$ {asset.price}</div>
      </div>
      <div className="grid grid-cols-5 flex-grow gap-2">
        <div className="col-span-2">
          <Card>
            <Tabs>
              <TabsItem
                active
                title={<div className="text-blue-700">Comprar</div>}
              >
                <OrderForm
                  asset={asset}
                  walletId={walletId}
                  type={OrderType.BUY}
                />
              </TabsItem>
              <TabsItem
                active
                title={<div className="text-red-700">Venda</div>}
              >
                <OrderForm
                  asset={asset}
                  walletId={walletId}
                  type={OrderType.SELL}
                />
              </TabsItem>
            </Tabs>
          </Card>
        </div>
        <div className="col-span-3 flex flex-grow">
          <AssetChartComponent asset={asset} />
        </div>
      </div>
    </div>
  );
}
