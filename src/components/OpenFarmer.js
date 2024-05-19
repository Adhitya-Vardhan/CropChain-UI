import { useState } from "react";
import React from "react";
import { Button, Card, Typography, List } from "@material-tailwind/react";
import Layout from "./Layout";
import { FarmerItem } from "./FarmerItem";
import Upload from "../utils/Upload.json";
import console from "console-browserify";
import { useWeb3Contract } from "react-moralis";

export default function FarmerList() {
  const [far, setFar] = useState("");

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

  return (
    <Layout>
      <div>
        <div className="flex justify-center">
          <Typography variant="h1" className="pb-10">
            Fetch the Farmers
          </Typography>
        </div>
        <div className="px-10 pt-5 pb-10">
          <Typography variant="paragraph">
            Here you will get all the Farmers who are added to chain and theri
            data like ID,Address,Images verified , his level etc.. you can click
            on the read more to get these data about that particualr scientist.
            WORD OF CAUTION - some times the added chain data needs some time to
            reflect on the website as the transaction needs to be verified.
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

        <div className="flex">
          <Card className="mx-auto mt-8 mb-2 w-1/2 overflow-hidden rounded-md">
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
    </Layout>
  );
}
