import {
  getKindeServerSession,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@repo/ui";

async function AuthonticationPipe({
  children,
  AdminCheck,
}: {
  children: React.ReactNode;
  AdminCheck: boolean;
}) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const auth = await isAuthenticated();
  const user = await getUser();

  if (AdminCheck) {
    return (
      <>
        {auth ? (
          user?.email === process.env.ADMIN_EMAIL || "HardCoded_admin_email" ? (
            children
          ) : (
            <div className="text-3xl font-bold">Not An Admin</div>
          )
        ) : (
          <div className="text-3xl font-bold flex gap-4 flex-col justify-center items-center">
            <div>Not Logged In, Login here</div>
            <LoginLink>
              <Button variant={"secondary"} size={"lg"}>
                Login
              </Button>
            </LoginLink>{" "}
          </div>
        )}
      </>
    );
  } else {
    return (
      <>
        {auth ? (
          children
        ) : (
          <div className="text-3xl font-bold flex gap-4 flex-col justify-center items-center">
            <div>Not Logged In, Login here</div>
            <LoginLink>
              <Button variant={"secondary"} size={"lg"}>
                Login
              </Button>
            </LoginLink>{" "}
          </div>
        )}
      </>
    );
  }
}

export default AuthonticationPipe;
