import { useState } from "react";
import React from "react";
import { Button, Card, Typography, List } from "@material-tailwind/react";
import console from "console-browserify";
import { useWeb3Contract } from "react-moralis";
import Layout from "./Layout";
import { ScientistItem } from "./ScientistItem";
import Upload from "../utils/Upload.json";

export default function ScientistList() {
  const [sci, setSci] = useState("");

  const {
    runContractFunction: fetch,
    data,
    isFetching,
  } = useWeb3Contract({
    abi: Upload.abi,
    contractAddress: process.env.REACT_APP_CONTRACT,
    functionName: "get_scientits",
  });

  const fetchScientist = async () => {
    await fetch();
    if (isFetching) {
      console.log("its fetching");
    }
    if (data) {
      console.log(data);
      setSci(data);
    }
  };

  const renderScientist = () => {
    return sci.map((item, i) => (
      <>
        <div key={`a-${i}`} className="p-2">
          <ScientistItem item={item} />
        </div>
      </>
    ));
  };

  return (
    <Layout>
      <div className="mt-5px">
        <div className="flex justify-center">
          <Typography variant="h1">FETCH SCIENTIST </Typography>
        </div>
        <div className="px-10 pt-5 pb-10">
          <Typography variant="paragraph">
            Here you will get all the scientists who are added to chain and
            theri data like ID,Address,Images verified , his level etc.. you can
            click on the read more to get these data about that particualr
            scientist. WORD OF CAUTION - some times the added chain data needs
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
          {" "}
          Fetch{" "}
        </Button>

        {/* <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"> */}
        <div className="flex">
          <Card className=" mx-auto mt-8 mb-2 w-2/5 overflow-hidden rounded-md">
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
    </Layout>
  );
}
