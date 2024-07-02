import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import "@repo/ui";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@repo/ui";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Link from "next/link";
import AdminAction from "./components/AdminActions";

export default async function Registrar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <>
      <div className="main-body flex flex-col justify-center items-center p-2">
        {(await isAuthenticated()) ? (
          <div>
            {user?.email == process.env.ADMIN_EMAIL ? (
              <div className="flex flex-col justify-center items-center gap-3">
                <div>
                  <Button variant={"secondary"}>
                    <LogoutLink>Logout</LogoutLink>
                  </Button>
                </div>
                <AdminAction />
              </div>
            ) : (
              <div className="text-4xl bg-blue-300 p-4 rounded-3xl text-black underline underline-offset-8">
                <div>Your Are Not An Admin Registrar</div>
                <div className="flex gap-3 justify-center mt-4">
                  <Button>
                    <LogoutLink>Logout</LogoutLink>
                  </Button>
                  <Button>
                    <Link href={"/"}>Home</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="text-xl bg-blue-300 p-4 rounded-3xl text-black underline underline-offset-8">
              Your Are not Logged in
            </div>
            <Button size={"lg"}>
              <LoginLink>Sign in</LoginLink>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
