import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
} from "flowbite-react";
import { getAssets } from "../queries/queries";
import { WalletList } from "../components/WalletList";
import { AssetsSync } from "../components/AssetsSync";
import { TableAssetRow } from "./TableAssetRow";

export default async function OrdersListPage({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id } = await searchParams;
  console.log("wallet_id", wallet_id);

  if (!wallet_id) {
    return <WalletList />;
  }

  const assets = await getAssets();
  console.log("assets", assets);
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Ativos</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Comprar ou Vender</TableHeadCell>
          </TableHead>
          <TableBody>
            {assets.map((asset, key) => (
              <TableAssetRow key={key} asset={asset} walletId={wallet_id} />
            ))}
          </TableBody>
        </Table>
      </div>
      <AssetsSync assetsSymbols={assets.map((asset) => asset.symbol)} />
    </div>
  );
}
