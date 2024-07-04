"use client";
import { Button } from "@repo/ui";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SendVoterVerificationEmail } from "../actions/database";

function GetRegistrationVerificationEmailForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [aadhar, setAadhar] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await SendVoterVerificationEmail({
      aadhar: aadhar,
    });
    if (res.success) {
      alert(res.msg);
    } else {
      setError(res.msg);
    }
    setLoading(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="aadhar" className="text-2xl font-medium text-white">
        Enter Aadhar Number
      </label>
      <br />
      <input
        type="text"
        id="aadhar"
        onChange={(e) => {
          setError("");
          setAadhar(e.target.value);
        }}
        value={aadhar}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
      {loading ? (
        <Button className="w-full mt-4" disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait..
        </Button>
      ) : (
        <Button variant={"secondary"} type="submit" className="w-full mt-4">
          Get Email
        </Button>
      )}
      {error && (
        <div className="bg-white text-wrap min-w-full text-red-500 rounded-xl p-1 mt-2">
          {error}
        </div>
      )}
    </form>
  );
}

export default GetRegistrationVerificationEmailForm;
