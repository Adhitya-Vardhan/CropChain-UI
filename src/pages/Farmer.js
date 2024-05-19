import React, { useState } from "react";
import Layout from "../components/Layout";
import { Button } from "@material-tailwind/react";
import UploadImage from "../components/UploadImage";
import { Typography } from "@material-tailwind/react";
import { FarmerTab } from "../components/FarmerTab";
import { ButtonGroup } from "@material-tailwind/react";
import { CardSkeleton } from "../components/CardSkeleton";
import Upload from "../utils/Upload.json";
import DisplayCard from "../components/DisplayCard";
import {
  useWeb3Contract,
  useMoralis,
  useWeb3ExecuteFunction,
} from "react-moralis";
import console from "console-browserify";
import FinalCard from "../components/FinalCard";

export default function Farmer() {
  const [img, setImg] = useState("");
  const { account } = useMoralis();
  const [meth, setMeth] = useState("");

  const renderImages = () => {
    return img.map((item, i) => (
      <>
        <div key={`a-${i}`} className="p-2 md:p-4">
          {meth === "display_final" ? (
            <FinalCard item={item} />
          ) : (
            <DisplayCard item={item} />
          )}
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
    functionName: meth,
    params: {
      _user: account,
    },
  });

  const fetchImg = async () => {
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
      <Layout headerType="farmer">
        <div className="flex justify-center">
          <Typography className="mt-2px pt-10" variant="h1">
            INSTRUCTIONS
          </Typography>
        </div>

        <FarmerTab />

        <div className=" mx-2 rounded-lg pt-10">
          <div className="flex justify-center">
            <Typography variant="h1"> UPLOAD THE IMAGE </Typography>
          </div>
          <div className="px-10 pt-10 ">
            <Typography variant="paragraph" color="blue-gray">
              {" "}
              Please upload your image to the chain by using the this stepper
              form , please follow the flow step by step any misplacement of the
              steps leads to the rejection of you transaction request to the
              chain you will get notified by the notifications on each step of
              the process which tell you that the step is successfully executed,
              some of them take time to be executed successfully so please be
              patient and follow the instructions. Make sure to have enough Test
              ETH in your metamask account.Else go to{" "}
              <a
                className="text-blue-600 "
                target="_blank"
                href="https://www.alchemy.com/faucets/ethereum-sepolia"
              >
                https://www.alchemy.com/faucets/ethereum-sepolia
              </a>{" "}
              to get the required test eth{" "}
            </Typography>
          </div>
          <UploadImage />{" "}
          <div className="px-10 pb-10 ">
            <Typography variant="paragraph" color="blue-gray">
              For storing of images in Decentralised space IPFS is being used.
              Which in some cases might take some time to upload your file and
              some times it may fail, so if the image upload is not getting
              success responce then please take some time and the retry later.To
              want to know more about the Descentralised storage space refer to{" "}
              <a
                className="text-blue-600"
                target="_blank"
                href="https://ipfs.tech/"
              >
                https://ipfs.tech/
              </a>
            </Typography>
          </div>
          <div className="flex justify-center pb-8">
            <img
              src="https://media.licdn.com/dms/image/D4D12AQH6ok_fpukKCQ/article-inline_image-shrink_1000_1488/0/1686472829595?e=1721260800&v=beta&t=O_3HkT4I5tQF7sl7bMRRC8fV53DblQK5hsGIO6ZIemY"
              alt="IPFS Pic"
            />
          </div>
          <div className="flex justify-center">
            <Typography variant="h1" className="pb-5">
              {" "}
              Fetch you Images{" "}
            </Typography>
          </div>
          <div className="px-10 pb-10 ">
            <Typography variant="paragraph" color="blue-gray">
              The images uploaded by the farmer are classified in to 3 groups
              i.e OPEN , CLOSE and FINAL. THe image which is just reviewed by
              the ai will still be in the opne image section, The one Which is
              reviewed by the scientist will be in the being reviewed section
              and at last the ones which are verified by the other verifiers in
              the chain are in final images section where the solution of the
              image is verified by all the members in the chain.Click the
              respected buttons to fetch your images
            </Typography>
          </div>
          <ButtonGroup
            className="pb-8"
            fullWidth
            ripple={true}
            variant="outlined"
          >
            <Button
              onClick={() => {
                setMeth("display_open");
                fetchImg();
              }}
            >
              Uploaded
            </Button>
            <Button
              onClick={() => {
                setMeth("display_close");
                fetchImg();
              }}
            >
              Being Reviewed
            </Button>
            <Button
              onClick={() => {
                setMeth("display_final");
                fetchImg();
              }}
            >
              Final
            </Button>
          </ButtonGroup>
          <div className="pb-10">
            {img && img.length > 0 ? (
              <div className=" h-[calc(100vh-3rem)] overflow-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                {renderImages()}
              </div>
            ) : (
              <>
                <p>No images fetched yet</p>
                <div className=" flex justify-center gap-8 mt-8">
                  {" "}
                  <CardSkeleton />
                  <CardSkeleton />
                  <CardSkeleton />{" "}
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
