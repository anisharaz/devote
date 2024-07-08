import { Button } from "@repo/ui";
import Link from "next/link";
import KindLogout from "./KindLogut";
import {
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import AuthonticationPipe from "../pipes/AuthonticationPipe";

async function Registrar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isAuthenticatedStatus = await isAuthenticated();
  const getUserData = await getUser();

  return (
    <div className="main-body flex flex-col items-center gap-6">
      <AuthonticationPipe AdminCheck={true}>
        <div>
          <div>
            <div className="pt-4 text-white text-xl">
              <div>ADMIN INFO</div>
              <div>
                {isAuthenticatedStatus ? (
                  <div
                    className="p-4 border flex flex-col gap-2 bg-zinc-800/50 rounded-lg"
                    style={{
                      width: "800px",
                    }}
                  >
                    <div>
                      {getUserData?.given_name + " " + getUserData?.family_name}
                    </div>
                    <div>{getUserData?.email}</div>
                    <KindLogout />
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-start p-4 border gap-2">
                    <div>Need To Login As Admin</div>
                    <LoginLink>
                      <Button variant={"secondary"}>Login</Button>
                    </LoginLink>{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="text-xl pt-4 text-white">ACTIONS</div>
          <div
            className="flex justify-center gap-4 p-4 border bg-zinc-800/50 rounded-lg"
            style={{
              width: "800px",
            }}
          >
            {isAuthenticatedStatus ? (
              <>
                <Link href={"registrar/registervoter"}>
                  <Button className="text-xl" size={"lg"}>
                    Register A Voter
                  </Button>
                </Link>
                <Link href={"registrar/registercandidates"}>
                  <Button className="text-xl" size={"lg"}>
                    Register A Candidate
                  </Button>
                </Link>
                <Link href={"registrar/viewvotes"}>
                  <Button className="text-xl" size={"lg"}>
                    View Votes
                  </Button>
                </Link>
              </>
            ) : (
              <div className="text-xl text-white">Need To Login As Admin</div>
            )}
          </div>
        </div>
      </AuthonticationPipe>
    </div>
  );
}

export default Registrar;
