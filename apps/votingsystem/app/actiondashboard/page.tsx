import { Button } from "@repo/ui";
import Link from "next/link";

function ActionsDashboard() {
  return (
    <div className="main-body flex justify-center pt-10">
      <div className="flex flex-col gap-3 text-white font-bold">
        <div className="text-3xl">Actions</div>
        <Link href={"/getverificationemail"}>
          <Button size={"lg"}>Get Verification Email</Button>
        </Link>
        <Link href={"/voting"}>
          <Button size={"lg"} variant={"secondary"}>
            Vote A Candidate
          </Button>
        </Link>
        <Link href={"/verify"}>
          <Button size={"lg"}>Get Voting Token</Button>
        </Link>
        <Link href={"/downloadidentity"}>
          <Button size={"lg"} variant={"secondary"}>
            Download ID Certificate
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default ActionsDashboard;
