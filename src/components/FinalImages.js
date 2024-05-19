import React from "react";
import Layout from "./Layout";
import { useState } from "react";
import Upload from "../utils/Upload.json";
import { useWeb3Contract } from "react-moralis";
import console from "console-browserify";
import { Button, Typography } from "@material-tailwind/react";
import "react-toastify/dist/ReactToastify.css";
import FinalCard from "./FinalCard";

export default function FinalImages() {
  const [img, setImg] = useState([]);

  const {
    runContractFunction: fetch,
    data,
    isFetching,
  } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "get_final_images",
  });

  const fetchOpen = async () => {
    await fetch();
    if (isFetching) {
      console.log("its fetching");
    }
    if (data) {
      console.log(data);
      setImg(data);
    }
  };

  const renderImages = () => {
    return img.map((item, i) => (
      <>
        <div key={`a-${i}`} className="p-2 md:p-4">
          <FinalCard item={item} />
        </div>
      </>
    ));
  };

  return (
    <>
      <Layout>
        <div className="flex justify-center">
          <Typography variant="h1" className="pb-5">
            {" "}
            Fetch The Images{" "}
          </Typography>
        </div>
        <div className="px-10 pb-10 ">
          <Typography variant="paragraph" color="blue-gray">
            The images which are completed being reviewd by the ai , scientist
            and some with the other reviewrs are shown here. WORK OF CAUTION-
            please turst the solution where a minimum of 5 -6 users have
            verified the image
          </Typography>
        </div>
        <div>
          <Button
            fullWidth
            ripple={true}
            onClick={fetchOpen}
            className="mx-4 my-2"
          >
            {" "}
            Fetch{" "}
          </Button>
          <div className=" h-[calc(100vh-3rem)] overflow-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
            {isFetching ? (
              <p>Loading...</p>
            ) : img && img.length > 0 ? (
              renderImages()
            ) : (
              <p>No images fetched yet</p>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
