import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import console from "console-browserify";
import { useWeb3Contract, useMoralis } from "react-moralis";
import Upload from "../utils/Upload.json";

export default function DisplayCard({ item }) {
  const [open, setOpen] = useState(false);
  //   const [url, setUrl] = useState("");
  //   const [output, setOutput] = useState("");

  //   const [solution, setSolution] = useState("");

  //   const address = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

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

  //   const handleOpen = async (event) => {
  //     event.preventDefault();
  //     handleButtonClick();
  //     setOpen(!open);
  //   };

  //   async function handleSetOnSuccess(tx) {
  //     await tx.wait(1);
  //     console.log("Solution updated");
  //   }

  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img src={item} alt={`Image `} />
      </CardHeader>
      <CardBody>
        {/* <Typography variant="h5" color="blue-gray" className="mb-2 truncate ">
          {data.add}
        </Typography> */}
        {/* <Typography>{item}</Typography> */}
      </CardBody>
      <CardFooter className="pt-0"></CardFooter>
    </Card>
  );
}
