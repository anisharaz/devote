import { GetPreSignedUrl } from "../../lib/AWS";
import RegisterForm from "./RregisterForm";
import { prisma } from "@repo/prismadb";
export const dynamic = "force-dynamic";
async function RegisterCandidate() {
  let AvtiveVotingLevels = await prisma.activeVotingLevels.findMany();
  const AvtiveVotingLevelsNew = AvtiveVotingLevels.map((level) => {
    return {
      name: level.LevelName,
      levelid: level.id,
    };
  });
  const { url, fields } = await GetPreSignedUrl();
  return (
    <div className="main-body flex justify-center items-center">
      <RegisterForm
        level={AvtiveVotingLevelsNew}
        presignedurl={url}
        fields={fields}
      />
    </div>
  );
}

export default RegisterCandidate;
