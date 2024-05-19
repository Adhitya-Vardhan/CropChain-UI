import {
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Button,
  Dialog,
  CardBody,
  CardHeader,
} from "@material-tailwind/react";
import { useState } from "react";
import console from "console-browserify";
import { useWeb3Contract, useMoralis } from "react-moralis";
import Upload from "../utils/Upload.json";
import "react-toastify/dist/ReactToastify.css";
import BN from "bn.js";

export function ScientistItem({ item }) {
  const [open, setOpen] = useState(false);

  const { runContractFunction: fetch, data } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "display_scientist",
    params: {
      _user: item,
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
      JSON.stringify(data);
      console.log(data);
    }
  };

  const handleOpen = async () => {
    handleButtonClick();
    setOpen(!open);
  };

  return (
    <ListItem>
      <ListItemPrefix>
        <Avatar variant="circular" alt="candice" src="./scientist1.png" />
      </ListItemPrefix>
      <div>
        <Typography variant="h6" color="blue-gray">
          {item}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          Scientist
        </Typography>
      </div>
      <Button
        onClick={handleOpen}
        variant="text"
        className="flex items-center gap-2"
      >
        See{" "}
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
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </Button>

      <Dialog open={open} size="md" handler={handleOpen}>
        {data ? (
          <>
            <Card className="w-full max-w-[48rem] flex-row">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-2/5 shrink-0 rounded-r-none"
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1677604598034-6430d238a80d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2NpZW50aXN0fGVufDB8fDB8fHww"
                  alt="card-image"
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography
                  variant="h6"
                  color="gray"
                  className="mb-4 uppercase"
                >
                  Scientist Address :
                </Typography>
                <Typography color="blue-gray" className="mb-2">
                  {data.scientist_add}
                </Typography>
                <Typography color="gray" className="mb-8 font-normal">
                  id:{hexToDec(data.scientist_id?._hex)} <br />
                  Level: {hexToDec(data.level?._hex)} <br />
                  Authority Points: {hexToDec(data.auth_points?._hex)} <br />
                  AadharId: {hexToDec(data.adhar_id?._hex)} <br />
                  CRC: {hexToDec(data.correctReportCount?._hex)}
                </Typography>
                <Typography color="gray" className="mb-8 font-normal">
                  IMAGES : <br />
                  Verified: {data.image_VR.length}
                </Typography>
                <a href="#" className="inline-block">
                  <Button
                    variant="text"
                    onClick={handleOpen}
                    className="flex items-center gap-2"
                  >
                    close
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </a>
              </CardBody>
            </Card>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Dialog>
    </ListItem>
  );
}
