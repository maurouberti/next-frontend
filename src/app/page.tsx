import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
} from "flowbite-react";
import { getMyWallet } from "./queries/queries";
import { WalletList } from "./components/WalletList";
import { AssetsSync } from "./components/AssetsSync";
import { TableWalletAssetRow } from "./TableWalletAssetRow";

export default async function MyWalletListPage({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id } = await searchParams;
  console.log("wallet_id", wallet_id);

  if (!wallet_id) {
    return <WalletList />;
  }

  const wallet = (await getMyWallet(wallet_id)) || { assets: [] };
  console.log("wallet", wallet);
  return (
    <div className="flex flex-col space-y-5 flex-grow">
      <article className="format">
        <h1>Minha Carteira</h1>
      </article>
      <div className="overflow-x-auto w-full">
        <Table className="w-full max-w-full table-fixed">
          <TableHead>
            <TableHeadCell>Ativo</TableHeadCell>
            <TableHeadCell>Cotação</TableHeadCell>
            <TableHeadCell>Quantidade</TableHeadCell>
            <TableHeadCell>Comprar ou Vender</TableHeadCell>
          </TableHead>
          <TableBody>
            {wallet.assets.map((walletAsset, key) => (
              <TableWalletAssetRow
                key={key}
                walletAsset={walletAsset}
                walletId={wallet_id}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <AssetsSync
        assetsSymbols={wallet.assets.map(
          (walletAsset) => walletAsset.asset.symbol
        )}
      />
    </div>
  );
}
