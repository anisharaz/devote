import "@repo/ui";
import AdminAction from "./components/AdminActions";
import AuthonticationPipe from "../../pipes/AuthonticationPipe";

export default async function Registrar() {
  return (
    <>
      <div className="main-body flex flex-col justify-center items-center p-2">
        <AuthonticationPipe AdminCheck={true}>
          <div className="border p-4 rounded-xl bg-zinc-800/10">
            <div className="text-white text-3xl py-2 underline underline-offset-4">
              Register A voter
            </div>
            <AdminAction />
          </div>
        </AuthonticationPipe>
      </div>
    </>
  );
}
