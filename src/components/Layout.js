import React from "react";
import { MultiLevelSidebar } from "./MultiLevelSidebar";
import { FooterWithSocialLinks } from "./FooterWithSocialLinks";
import { SpeedDial } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";

export default function Layout({ children, headerType }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <div className="sticky top-0 h-screen">
          <MultiLevelSidebar />
        </div>
        <div className="flex flex-col min-h-screen w-full ">
          <div className="flex-grow"> {children}</div>
          <div className="pb-10 pt-5 px-5 ">
            <Typography variant="h5" color="blue-bray">
              Considering the Dapp hosted on the Test netowrk , dont pollute the
              network will unnecessary interactions with the chain, use it for
              legitemate purposes considering the cost to put the network up bu
              the community.
            </Typography>
          </div>
          <div className="mt-auto">
            <FooterWithSocialLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
