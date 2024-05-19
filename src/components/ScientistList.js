import { useState, useEffect } from "react";
import React from "react";
import {
  Collapse,
  Button,
  Card,
  Input,
  Checkbox,
  Typography,
  List,
} from "@material-tailwind/react";
import console from "console-browserify";
import { useWeb3Contract } from "react-moralis";
import Layout from "./Layout";
import { ScientistItem } from "./ScientistItem";
import Upload from "../utils/Upload.json";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ScientistList() {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);

  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [aadharId, setAadharId] = useState("");
  const [sci, setSci] = useState([]);

  const {
    runContractFunction: fetch,
    data,
    isFetching,
  } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "get_scientits",
  });

  async function fetchScientist() {
    await fetch();
    if (isFetching) {
      console.log("its fetching");
    }
  }

  useEffect(() => {
    if (data) {
      console.log("Data fetched:", data);
      setSci(data);
    }
  }, [data]);

  const { runContractFunction: addScientist } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "add_scientist",
    params: {
      _scientist: address,
      _adhar_id: aadharId,
      _scientist_id: id,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addScientist({
      onSuccess: (tx) => handleSetOnSuccess(tx),
      onError: (error) => console.log(error),
    });
  };

  async function handleSetOnSuccess(tx) {
    await tx.wait(1);
    toast("Scientist Added");
    fetchScientist(); // Refresh the list after adding a new scientist
  }

  const renderScientist = () => {
    return sci.map((item, index) => (
      <div className="p-2" key={index}>
        <ScientistItem item={item} />
      </div>
    ));
  };

  return (
    <Layout>
      <div className="mt-5px">
        <div className="flex justify-center">
          <Typography variant="h1" className="pt-5 pb-5">
            REGISTER A SCIENTIST
          </Typography>
        </div>
        <div className="flex justify-center">
          <Button onClick={toggleOpen}>Add Scientist</Button>
        </div>
        <Collapse open={open}>
          <Card
            className="my-4 mx-auto w-8/12"
            color="transparent"
            shadow={false}
          >
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
              onSubmit={handleSubmit}
            >
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Address
                </Typography>
                <Input
                  onChange={(e) => setAddress(e.target.value)}
                  size="lg"
                  placeholder="name@mail.com"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  ID
                </Typography>
                <Input
                  onChange={(e) => setId(e.target.value)}
                  size="lg"
                  placeholder="name@mail.com"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Aadhar
                </Typography>
                <Input
                  onChange={(e) => setAadharId(e.target.value)}
                  type="password"
                  size="lg"
                  placeholder="********"
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
              <Button type="submit" className="mt-6" fullWidth>
                Add Scientist
              </Button>

              <Typography color="gray" className="mt-4 text-center font-normal">
                Already added?{" "}
                <a href="#" className="font-medium text-gray-900">
                  modify
                </a>
              </Typography>
            </form>
          </Card>
        </Collapse>

        <div className="px-10 pt-5 pb-10">
          <Typography variant="paragraph">
            Kvk Manager also known as the admin of this permissioned Blockchain,
            he is the only one who can grant the users access and make some
            changes to the chain data. He adds the users using their Wallet
            address and Aadhar Id so as the consensus is tied to his identity.
            The added ones can change the data on-chain, so be careful while
            giving access to the chain.
          </Typography>
        </div>
        <div className="flex justify-center">
          <Typography variant="h1">FETCH SCIENTIST</Typography>
        </div>
        <div className="px-10 pt-5 pb-10">
          <Typography variant="paragraph">
            Here you will get all the scientists who are added to the chain and
            their data like ID, Address, Images verified, their level, etc. You
            can click on the read more to get these data about that particular
            scientist. WORD OF CAUTION - sometimes the added chain data needs
            some time to reflect on the website as the transaction needs to be
            verified.
          </Typography>
        </div>
        <Button
          fullWidth
          ripple={true}
          onClick={fetchScientist}
          className="mx-4 my-2"
        >
          Fetch
        </Button>

        <div className="flex pb-10">
          <Card className="mx-auto mt-8 mb-2 w-2/5 overflow-hidden rounded-md">
            <List className="my-2 p-0">
              {isFetching ? (
                <p>Loading...</p>
              ) : sci && sci.length > 0 ? (
                renderScientist()
              ) : (
                <p>No scientist fetched yet</p>
              )}
            </List>
          </Card>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}
