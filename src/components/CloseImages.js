import React from "react";
import CloseCard from "./CloseCard";
import Layout from "./Layout";
import { Button, Typography } from "@material-tailwind/react";
import Upload from "../utils/Upload.json";
import { useWeb3Contract } from "react-moralis";
import console from "console-browserify";
import { useState } from "react";

export default function CloseImages() {
  const [img, setImg] = useState([]);

  const renderImages = () => {
    return img.map((item, i) => (
      <>
        <div key={`a-${i}`} className="p-2 md:p-4">
          <CloseCard item={item} />
        </div>
      </>
    ));
  };

  const {
    runContractFunction: fetch,
    data,
    isFetching,
  } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "get_final_images",
  });

  const fetchFinal = async () => {
    await fetch();
    if (isFetching) {
      console.log("its fetching");
    }
    if (data) {
      console.log(data);
      setImg(data);
    }
  };

  return (
    <>
      <Layout>
        <div className="flex justify-center">
          <Typography variant="h1" className="pb-5">
            {" "}
            See Images{" "}
          </Typography>
        </div>
        <div className="px-10 pb-10 ">
          <Typography variant="paragraph" color="blue-gray">
            The images uploaded by the farmer are classified in to 3 groups i.e
            OPEN , CLOSE and FINAL. THe image which is just reviewed by the ai
            will be in the opne image section. and the ones which are reviewd by
            scientists will be in CloseImage section now here we need to vote
            for the choice ok or not ok with the image
          </Typography>
        </div>
        <div>
          <Button
            fullWidth
            ripple={true}
            onClick={fetchFinal}
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
