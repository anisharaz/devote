import { Button } from "@repo/ui";
import { GetVoter } from "../../actions/database";
import Link from "next/link";
import CertDownloadForm from "./CertDownloadForm";

async function MyIdentity({ params }: { params: { PublicKey: string } }) {
  const voter = await GetVoter(params.PublicKey);
  if (!voter)
    return (
      <div className="main-body flex flex-col items-center p-4 gap-4">
        <div className="text-3xl">Your are not registered or Verified</div>
        <Button size={"lg"} variant={"default"}>
          <Link href={"/verify"}>Verify Here</Link>
        </Button>
        <br />
        <div className="text-xl text-white">
          If registered enter aadhar to download certificate
        </div>
        <CertDownloadForm />
      </div>
    );
  return <div>{params.PublicKey}</div>;
}

export default MyIdentity;
