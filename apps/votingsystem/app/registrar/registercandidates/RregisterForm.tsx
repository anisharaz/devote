"use client";

import { Button } from "@repo/ui";
import { useState } from "react";
import { RegisterCandidate } from "../../actions/database";
import { Loader2 } from "lucide-react";

function RegisterForm({
  level,
  presignedurl,
  fields,
}: {
  level: {
    name: string;
    levelid: string;
  }[];
  presignedurl: string;
  fields: Record<string, string>;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [candidateData, setCandidateData] = useState({
    name: "",
    statement: "",
    levelId: "",
    WalletAddress: "",
  });
  const fileChange = (e: any) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (
      candidateData.name &&
      candidateData.statement &&
      candidateData.levelId &&
      candidateData.WalletAddress &&
      file
    ) {
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);
      const response = await fetch(presignedurl, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        alert("Image Upload Failed Try Again !");
      } else {
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const imageLocation =
          xmlDoc.getElementsByTagName("Location")[0]?.childNodes[0]?.nodeValue;
        let IMGURL = new URL(imageLocation as string);
        IMGURL.hostname = "dalrhzyq3imlu.cloudfront.net";
        const res = await RegisterCandidate({
          ...candidateData,
          image: IMGURL.toString(),
        });
        setLoading(false);
        alert(res.msg);
        setCandidateData({
          name: "",
          statement: "",
          levelId: "",
          WalletAddress: "",
        });
      }
    } else {
      alert("Please fill all the fields");
      setLoading(false);
    }
  };
  return (
    <form
      className="flex flex-col gap-4 border p-6 rounded-xl bg-zinc-800/10"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="text-2xl font-medium text-white" htmlFor="name">
          Name
        </label>
        <br />
        <input
          id="name"
          type="text"
          value={candidateData.name}
          onChange={(e) =>
            setCandidateData({ ...candidateData, name: e.target.value })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label className="text-2xl font-medium text-white" htmlFor="statement">
          Slogan
        </label>
        <br />
        <input
          id="statement"
          type="text"
          value={candidateData.statement}
          onChange={(e) =>
            setCandidateData({ ...candidateData, statement: e.target.value })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label htmlFor="image" className="text-2xl font-medium text-white">
          Image <span className="text-red-500 text-lg">*Only JPG</span>
        </label>
        <input
          type="file"
          id="image"
          onChange={fileChange}
          accept=".jpg"
          className="block w-full mt-5 text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        />
      </div>
      <div>
        <label className="text-2xl font-medium text-white" htmlFor="level">
          Voting Level
        </label>
        <br />
        <select
          id="level"
          onChange={(e) => {
            setCandidateData({ ...candidateData, levelId: e.target.value });
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Select Level</option>
          {level.map((item) => {
            return (
              <option value={item.levelid} key={item.levelid}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label className="text-2xl font-medium text-white" htmlFor="waddress">
          Wallet Address
        </label>
        <br />
        <input
          id="waddress"
          type="text"
          value={candidateData.WalletAddress}
          onChange={(e) =>
            setCandidateData({
              ...candidateData,
              WalletAddress: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {loading ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait..
        </Button>
      ) : (
        <Button type="submit" size={"lg"}>
          Submit
        </Button>
      )}
    </form>
  );
}

export default RegisterForm;
