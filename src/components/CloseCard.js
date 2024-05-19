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
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import console from "console-browserify";
import { useWeb3Contract, useMoralis } from "react-moralis";
import Upload from "../utils/Upload.json";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function CloseCard({ item }) {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState();

  const handleOpen = async () => {
    handleButtonClick();
    setOpen(!open);
  };

  const { runContractFunction: fetch, data } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "display_close_output",
    params: {
      _url: item,
    },
  });

  const { runContractFunction: verifySolution } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "verify_image",
    params: {
      _url: item,
      _choice: choice,
    },
  });

  async function handleSetOnSuccess(tx) {
    await tx.wait(1);
    toast("voted");
  }

  const handleVerify = async () => {
    await verifySolution({
      onSuccess: (tx) => handleSetOnSuccess(tx),
      onError: (error) => console.log(error),
    });
  };

  const handleButtonClick = async () => {
    await fetch();
    console.log("Fetching in process ");
    if (data) {
      console.log(data);
    }
  };

  const handleVote = async (vote) => {
    setChoice(vote);
  };

  useEffect(() => {
    if (choice !== undefined) {
      handleVerify();
    }
  }, [choice]);

  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={item} alt="card-image" />
      </CardHeader>
      <CardBody></CardBody>
      <CardFooter className="pt-0">
        <Button onClick={handleOpen} variant="gradient">
          Read More
        </Button>

        <Dialog open={open} size="md" handler={handleOpen}>
          {data ? (
            <>
              {" "}
              <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                  {" "}
                  <Typography className="mb-1" variant="h4">
                    <p> {data.owner}</p>
                  </Typography>
                </DialogHeader>
              </div>
              <DialogBody>
                <img
                  src={item}
                  className="h-50 w-full object-cover object-center"
                  alt="card-image"
                />
                <div className="grid gap-6">
                  <Typography className="-mb-1" color="blue-gray" variant="h6">
                    <p> AI : {data.AI_sol}</p>
                  </Typography>
                  <Typography className="-mb-1" color="blue-gray" variant="h6">
                    <p> Sci : {data.reviewer_sol}</p>
                  </Typography>
                </div>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button
                  variant="text"
                  color="gray"
                  onClick={() => {
                    handleVote(true);
                  }}
                >
                  OK
                </Button>
                <Button
                  variant="gradient"
                  color="gray"
                  onClick={() => {
                    handleVote(false);
                  }}
                >
                  NOT OK
                </Button>
              </DialogFooter>
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
