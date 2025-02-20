import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { AssetShow } from "./components/AssetShoww";
import { getMyWallet } from "./queries/queries";
import Link from "next/link";
import { WalletList } from "./components/WalletList";

export default async function MyWalletListPage({
  searchParams,
}: {
  searchParams: Promise<{ wallet_id: string }>;
}) {
  const { wallet_id } = await searchParams;
  console.log('wallet_id', wallet_id);

  if (!wallet_id) {
    return <WalletList />;
  }

  const wallet = (await getMyWallet(wallet_id)) || { assets: [] };
  console.log('wallet', wallet);
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
              <TableRow key={key}>
                <TableCell>
                  <AssetShow asset={walletAsset.asset} />
                </TableCell>
                <TableCell>R$ {walletAsset.asset.price}</TableCell>
                <TableCell>{walletAsset.shares}</TableCell>
                <TableCell>
                  <Button
                    color="light"
                    as={Link}
                    href={`/assets/${walletAsset}?wallet_id=${wallet_id}`}
                  >
                    Comprar/Vender
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
