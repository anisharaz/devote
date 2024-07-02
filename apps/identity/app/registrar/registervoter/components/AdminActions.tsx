"use client";
import { Button } from "@repo/ui";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { CreateVoter } from "../../../actions/database";

function AdminAction() {
  const [voterData, setVoterData] = useState({
    name: "",
    email: "",
    phone: "",
    aadhar: "",
    streetaddress: "",
    pincode: "",
    state: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          if (
            voterData.name === "" ||
            voterData.email === "" ||
            voterData.phone === "" ||
            voterData.aadhar === "" ||
            voterData.streetaddress === "" ||
            voterData.pincode === "" ||
            voterData.state === "" ||
            voterData.city === ""
          ) {
            setError("All Fields Are Required");
            setLoading(false);
            return;
          }
          const msg = await CreateVoter(voterData);
          setError(msg.msg);
          setVoterData({
            name: "",
            email: "",
            phone: "",
            aadhar: "",
            streetaddress: "",
            pincode: "",
            state: "",
            city: "",
          });
          setLoading(false);
        }}
        className="flex flex-col items-center gap-3"
      >
        <div className="flex flex-col gap-3 justify-center">
          <div>
            <label
              htmlFor="name"
              className="mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <br />
            <input
              type="text"
              id="name"
              value={voterData.name}
              onChange={(e) => {
                setVoterData({ ...voterData, name: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              email
            </label>
            <br />
            <input
              type="text"
              id="email"
              value={voterData.email}
              onChange={(e) => {
                setVoterData({ ...voterData, email: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              phone
            </label>
            <br />
            <input
              type="text"
              id="phone"
              value={voterData.phone}
              onChange={(e) => {
                setVoterData({ ...voterData, phone: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="aadhar"
              className="mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              aadhar
            </label>
            <br />
            <input
              type="text"
              id="aadhar"
              value={voterData.aadhar}
              onChange={(e) => {
                setVoterData({ ...voterData, aadhar: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="streetaddress"
              className="mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              streetaddress
            </label>
            <br />
            <input
              type="text"
              value={voterData.streetaddress}
              onChange={(e) => {
                setVoterData({ ...voterData, streetaddress: e.target.value });
              }}
              id="streetaddress"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="pincode"
              className="mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              pincode
            </label>
            <br />
            <input
              type="text"
              id="pincode"
              value={voterData.pincode}
              onChange={(e) => {
                setVoterData({ ...voterData, pincode: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="state"
              className="mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              state
            </label>
            <br />
            <input
              type="text"
              id="state"
              value={voterData.state}
              onChange={(e) => {
                setVoterData({ ...voterData, state: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="city"
              className="mb-2 text-lg font-medium text-gray-900 dark:text-white"
            >
              city
            </label>
            <br />
            <input
              type="text"
              id="city"
              value={voterData.city}
              onChange={(e) => {
                setVoterData({ ...voterData, city: e.target.value });
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        {loading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
        <div className="text-red-600 bg-white px-2 rounded-lg text-2xl">
          {error}
        </div>
      </form>
    </div>
  );
}

export default AdminAction;
