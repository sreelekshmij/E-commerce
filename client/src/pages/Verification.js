import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Verification = () => {
  const [verify, setVerify] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const handleVerify = async () => {
    const response = await axios.post(`http://localhost:8080/v1/auth/verify`, {
      token,
    });
    // console.log(response);
    if (response.status === 200) {
      return setVerify(true);
    } else {
      return setVerify(false);
    }
  };
  handleVerify();
  console.log(verify)

  return (
    <>
      {verify ? (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
          <div className="max-w-xl px-5 text-center">
            <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
              Email Verified
            </h2>
            <p className="mb-2 text-lg text-zinc-500">
              We are glad, that you're with us. Click below to Login
            </p>
            <Link
              to="/login"
              className="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
            >
              Open the App →
            </Link>
          </div>
        </div>
      ) : (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
          <div className="max-w-xl px-5 text-center">
            <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
              Email Not Verified. Contact support
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Verification;
