"use client";
import { Button } from "@repo/ui";
import { useState } from "react";
import { GetIdentityCert } from "../actions/database";
import { Loader2 } from "lucide-react";
import Link from "next/link";

function CertDownloadForm() {
  const [aadhar, setAadhar] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cert, setCert] = useState("");
  return (
    <div className="">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (aadhar == "") {
            alert("Enter an Aadhar number");
            return;
          }
          if (aadhar.length < 8) {
            alert("Please enter a valid Aadhar number");
            return;
          }
          setLoading(true);
          const res = await GetIdentityCert(aadhar);
          if (!res) {
            setError("Voter is not registered");
            setLoading(false);
            return;
          }
          setCert(res);
          setLoading(false);
        }}
        className="flex flex-col gap-6"
      >
        <div>
          <label htmlFor="aadhar" className="text-xl text-white font-mediu">
            Aadhar Number
          </label>
          <input
            type="text"
            id="aadhar"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait..
          </Button>
        ) : (
          <Button type="submit">Get Certificate</Button>
        )}
      </form>
      {error && (
        <div className="text-red-700 mt-4 bg-white rounded-lg px-2 py-1">
          {error}
        </div>
      )}
      {cert && (
        <>
          <br />
          <div className="text-2xl text-white">Download Before Verify</div>
          <div className="flex gap-4">
            <Button type="submit" variant={"secondary"}>
              <a
                href={`data:text/plain;charset=utf-8,${cert}`}
                download={`${aadhar}.cer`}
              >
                Download
              </a>
            </Button>
            <Button>
              <Link href={"/verify"}>Verify Now</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CertDownloadForm;
