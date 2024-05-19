import { useState } from "react";
import React from "react";
import {
  Collapse,
  Button,
  Card,
  Input,
  Checkbox,
  Typography,
  CardBody,
  List,
  Alert,
} from "@material-tailwind/react";
import Layout from "./Layout";
import { FarmerItem } from "./FarmerItem";
import { Addresses } from "../utils/Addresses";
import Upload from "../utils/Upload.json";
import { toast, ToastContainer } from "react-toastify";
import console from "console-browserify";
import { useWeb3Contract } from "react-moralis";
import "react-toastify/dist/ReactToastify.css";

export default function FarmerList() {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  const [far, setFar] = useState("");
  const [address, setAddress] = useState("");
  const [aadhar, setAadhar] = useState("");

  const renderFarmers = () => {
    return far.map((item, i) => (
      <>
        <div key={`a-${i}`} className="p-2">
          <FarmerItem item={item} />
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
    functionName: "get_farmers",
  });

  const fetchFarmer = async () => {
    await fetch();
    if (isFetching) {
      console.log("its fetching");
    }
    if (data) {
      console.log(data);
      setFar(data);
    }
  };

  const { runContractFunction: addFarmer } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "add_farmer",
    params: { _farmer: address, _adhar_id: aadhar },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addFarmer({
      onSuccess: (tx) => handleSetOnSuccess(tx),
      onError: (error) => console.log(error),
    });
  };

  async function handleSetOnSuccess(tx) {
    await tx.wait(1);
    toast("farmer added successfully");
  }

  return (
    <>
      <Layout>
        <div>
          <div className="pt-5 pb-10">
            <div className="flex justify-center">
              <Typography className="pb-5 " variant="h1">
                {" "}
                Register a new Farmer{" "}
              </Typography>
            </div>
            <div className="flex justify-center">
              <Button onClick={toggleOpen}>Add Farmer</Button>
            </div>

            <Collapse open={open}>
              <Card
                className="my-4 mx-auto w-8/12"
                color="transparent"
                shadow={false}
              >
                <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto">
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Address
                    </Typography>
                    <Input
                      onChange={(e) => setAddress(e.target.value)}
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Aadhar
                    </Typography>
                    <Input
                      onChange={(e) => setAadhar(e.target.value)}
                      type="password"
                      size="lg"
                      placeholder="********"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                  <Checkbox
                    label={
                      <Typography
                        variant="small"
                        color="gray"
                        className="flex items-center font-normal"
                      >
                        I agree the
                        <a
                          href="#"
                          className="font-medium transition-colors hover:text-gray-900"
                        >
                          &nbsp;Terms and Conditions
                        </a>
                      </Typography>
                    }
                    containerProps={{ className: "-ml-2.5" }}
                  />
                  <Button onClick={handleSubmit} className="mt-6" fullWidth>
                    Add Farmer
                  </Button>
                  <Typography
                    color="gray"
                    className="mt-4 text-center font-normal"
                  >
                    Already added?{" "}
                    <a href="#" className="font-medium text-gray-900">
                      modify
                    </a>
                  </Typography>
                </form>
              </Card>
            </Collapse>
          </div>{" "}
          <div className="px-10 pb-10">
            <Typography variant="paragraph">
              Kvk Manager also known as the admin of this permissioned Block
              chain , he is the only one who can grant the users to access and
              make some chanes to the chain data, he adds the users using their
              Wallet address and Aadhar Id so as the consensus is tied to his
              identity.The added ones can change the data on chain so be careful
              while who you giving acess to the chain
            </Typography>
          </div>
          <div className="flex justify-center">
            <Typography variant="h1" className="pb-10">
              {" "}
              Fetch the Farmers{" "}
            </Typography>
          </div>
          <div className="px-10 pt-5 pb-10">
            <Typography variant="paragraph">
              Here you will get all the Farmers who are added to chain and theri
              data like ID,Address,Images verified , his level etc.. you can
              click on the read more to get these data about that particualr
              scientist. WORD OF CAUTION - some times the added chain data needs
              some time to reflect on the website as the transaction needs to be
              verified.
            </Typography>
          </div>
          <Button
            fullWidth
            ripple={true}
            onClick={fetchFarmer}
            className="mx-4 my-2"
          >
            {" "}
            Fetch{" "}
          </Button>
          <div className="flex pb-10">
            <Card className="mx-auto mt-8 mb-2 w-2/5 overflow-hidden rounded-md">
              <List className="my-2 p-0">
                {isFetching ? (
                  <p>Loading...</p>
                ) : far && far.length > 0 ? (
                  renderFarmers()
                ) : (
                  <p>No farmers fetched yet</p>
                )}
              </List>
            </Card>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
}
