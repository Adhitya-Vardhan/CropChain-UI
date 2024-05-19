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
import { useState } from "react";
import console from "console-browserify";
import { useWeb3Contract, useMoralis } from "react-moralis";
import Upload from "../utils/Upload.json";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function OpenCard({ item }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState("");

  const [solution, setSolution] = useState("");

  const { runContractFunction: updateSolution } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "review_image",
    params: {
      //_user: address,
      _url: item,
      _solution: solution,
    },
  });

  const { runContractFunction: fetch, data } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "display_open_output",
    params: {
      _url: item,
    },
  });

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

  const handleSubmit = async () => {
    await updateSolution({
      onSuccess: (tx) => handleSetOnSuccess(tx),
      onError: (error) => console.log(error),
    });
  };

  async function handleSetOnSuccess(tx) {
    await tx.wait(1);
    toast("Solution updated");
  }

  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={item} alt={`Image `} />
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
                <div className="grid gap-6">
                  <Typography className="-mb-1" color="blue-gray" variant="h6">
                    <p> {data.AI_sol}</p>
                  </Typography>
                  <Textarea
                    label="Solution"
                    onChange={(e) => setSolution(e.target.value)}
                    value={solution}
                  />
                </div>
              </DialogBody>
              <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" onClick={handleOpen}>
                  cancel
                </Button>
                <Button variant="gradient" color="gray" onClick={handleSubmit}>
                  send message
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
