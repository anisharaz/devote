import { HomePageMainAction } from "./components/MainActionButtons";

export default async function Home() {
  return (
    <>
      <div className="bg-orange-400 main-body text-white">
        <div className="text-6xl pl-52 pt-40 pb-5 flex flex-col gap-4">
          <div className="underline underline-offset-8">
            Home of Blockchain Based E-Voting
          </div>
          <div className="text-4xl text-gray-300">
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
