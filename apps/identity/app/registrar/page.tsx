import { Button } from "@repo/ui";
import Link from "next/link";
import KindLogout from "./KindLogut";

function Registrar() {
  return (
    <div className="main-body">
      <div className="text-center text-2xl text-white pt-4 underline underline-offset-4">
        Actions
      </div>
      <div className="flex justify-center gap-4 p-4">
        <Link href={"registrar/registervoter"}>
          <Button size={"lg"}>Register A Voter</Button>
        </Link>
        <Link href={"registrar/viewvotes"}>
          <Button size={"lg"}>View Votes</Button>
        </Link>
        <KindLogout />
      </div>
    </div>
  );
}

export default Registrar;
