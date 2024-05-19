import {
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import console from "console-browserify";
import { useWeb3Contract, useMoralis } from "react-moralis";
import Upload from "../utils/Upload.json";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import BN from "bn.js";

export default function FinalCard({ item }) {
  const [open, setOpen] = useState(false);

  const { runContractFunction: fetch, data } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "display_final_output",
    params: {
      _url: item,
    },
  });

  function hexToDec(hexValue) {
    if (hexValue) {
      const decimalNumber = new BN(hexValue.substring(2), 16).toString();
      return decimalNumber;
    }
  }

  const handleButtonClick = async () => {
    await fetch();
    console.log("Fetching in process ");
    if (data) {
      console.log(data);
    }
  };

  const handleOpen = async () => {
    handleButtonClick();
    setOpen(!open);
  };

  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={item} alt={`Image `} />
      </CardHeader>
      <CardBody></CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleOpen} variant="gradient">
          Open
        </Button>

        <Dialog open={open} size="md" handler={handleOpen}>
          {data ? (
            <>
              {" "}
              <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                  {" "}
                  <Typography className="mb-1" variant="h4">
                    <p> {data.owner} </p>
                  </Typography>
                </DialogHeader>
              </div>
              <DialogBody>
                <img
                  src={item}
                  className="h-50 w-full object-cover object-center"
                  alt="card-image"
                />

                <Typography className="-mb-1" color="blue-gray">
                  <p>AI Solution:{data.AI_sol}</p> <br />
                  <p>Reviewer sol:{data.reviewer_sol} </p>
                  <p>reviewer:{data.reviewer}</p>
                </Typography>
                <Typography className="-mb-1" color="blue-gray">
                  <p>
                    Verification_Count:
                    {hexToDec(data.verificationCount?._hex)}{" "}
                  </p>{" "}
                  <br />
                  <p>OK:{hexToDec(data.true_count?._hex)}</p> <br />
                  <p>NOT OK:{hexToDec(data.false_count?._hex)}</p>
                </Typography>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" onClick={handleOpen}>
                  close
                </Button>
              </DialogFooter>{" "}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Dialog>
      </CardFooter>
      <ToastContainer />
    </Card>
  );
}
