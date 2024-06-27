import "@repo/ui/indexcss";
import { NavBar } from "@repo/ui";
import Link from "next/link";
import { Button } from "@repo/ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import WalletButton from "./components/Walletbutton";
import { HomePageMainAction } from "./components/MainActionButtons";
export default async function Home() {
  return (
    <>
      <NavBar>
        <div className="flex gap-2 justify-center items-center">
          <Button>
            <Link href={"/myidentity"}>MY Identity</Link>
          </Button>
          <Button>
            <Link href={"/registrar"}>Registrar</Link>
          </Button>
          <WalletButton />
        </div>
      </NavBar>
      <div className="bg-orange-400 main-body text-white">
        <div className="text-6xl pl-52 pt-40 pb-5 flex flex-col gap-4">
          <div className="underline underline-offset-8">
            Identity Center for Blockchain Based E-Voting
          </div>
          <div className="text-4xl text-black">
            A secure, transparent, and tamper-proof voting system
          </div>
        </div>
        <div className="pt-10 pl-52">
          <div className="flex gap-2 items-center">
            <HomePageMainAction />
          </div>
        </div>
      </div>
    </>
  );
}
