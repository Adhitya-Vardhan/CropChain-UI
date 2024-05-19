import React from "react";
import Layout from "./Layout";
import { Button } from "@material-tailwind/react";
import CloseImages from "./CloseImages";

export default function Close() {
  return (
    <>
      <Layout headerType="farmer">
        <div>
          <Button fullWidth ripple={true} className="mx-4 my-2">
            {" "}
            Fetch{" "}
          </Button>
          <CloseImages />
        </div>
      </Layout>
    </>
  );
}
