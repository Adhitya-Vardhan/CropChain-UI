import React from "react";
import axios from "axios";
import { useState } from "react";
import {
  Stepper,
  Step,
  Button,
  Typography,
  Input,
} from "@material-tailwind/react";
import {
  CogIcon,
  UserIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import { useWeb3Contract, useMoralis } from "react-moralis";
import Upload from "../utils/Upload.json";
import console from "console-browserify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadImage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);

  const { account } = useMoralis();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [imageHash, setImageHash] = useState(null);
  const [solution, setSolution] = useState(null);

  async function handleSetOnSuccess(tx) {
    await tx.wait(1);
  }

  const { runContractFunction: uploadImage } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "upload_image",
    params: { _user: account, _url: imageHash },
  });

  const { runContractFunction: aiSolution } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "AI_solution",
    params: {
      _url: imageHash,
      _solution: solution,
    },
  });

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const data = event.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
      };
    } else {
      console.log("please select a file");
    }

    event.preventDefault();
  };

  const handleUpload = async (event) => {
    // Logic to upload the file
    event.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
            pinata_secret_api_key: process.env.REACT_APP_PINATA_SECRET_API_KEY,
            "content-Type": "multipart/form-data",
          },
        });

        var hash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        setImageHash(hash);

        var sol = "this is a plant and this has a disesase named x ";
        setSolution(sol);
        toast("file uploaded");
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleGetLink = async (event) => {
    event.preventDefault();
    await uploadImage({
      onSuccess: (tx) => handleSetOnSuccess(tx),
      onError: (error) => console.log(error),
    });
    console.log(imageHash);
    toast("added to chain");
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    await aiSolution({
      onSuccess: (tx) => handleSetOnSuccess(tx),
      onError: (error) => console.log(error),
    });

    toast("successfully completed");
  };

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);

  return (
    <div className="mt-3 w-full px-24 py-4 pt-10 pb-10 ">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>
          <UserIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-50 text-center">
            <Input type="file" onChange={handleFileChange} />
          </div>
        </Step>
        <Step onClick={() => setActiveStep(1)}>
          <CogIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Button
              onClick={handleUpload}
              variant="gradient"
              className="flex items-center gap-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
              Upload File
            </Button>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(2)}>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Button onClick={handleGetLink}> chain </Button>
          </div>
        </Step>
        <Step onClick={() => setActiveStep(3)}>
          <BuildingLibraryIcon className="h-5 w-5" />
          <div className="absolute -bottom-[4.5rem] w-max text-center">
            <Button onClick={handleConfirm}> Conform </Button>
          </div>
        </Step>
      </Stepper>

      <div className="mt-32 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
}
