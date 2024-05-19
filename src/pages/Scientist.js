import React from "react";
import Layout from "../components/Layout";
import UploadImage from "../components/UploadImage";
import { Typography, Button } from "@material-tailwind/react";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import StatisticsCard from "../components/StatisticsCard";
import StatisticsChart from "../components/StatisticsChart";
import { statisticsCardsData } from "../utils/statisticsCardsData";
import { statisticsChartsData } from "../utils/statisticsChartsData";
import { Link } from "react-router-dom";

export default function Scientist() {
  return (
    <div>
      <Layout headerType="scientist">
        <div className="px-10 pt-5 ">
          <Typography variant="small" color="blue-gray">
            the graphs and the statistical data menthioned here is only for the
            ideation purpose , doesnot intend to the true values of the On Chain
            data, for which pipe line will be created in the next verion.
          </Typography>
        </div>
        <div className="mt-5 mb-5">
          <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
              <StatisticsCard
                key={title}
                {...rest}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-6 h-6 text-white",
                })}
                footer={
                  <Typography className="font-normal text-blue-gray-600">
                    <strong className={footer.color}>{footer.value}</strong>
                    &nbsp;{footer.label}
                  </Typography>
                }
              />
            ))}
          </div>
          <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
            {statisticsChartsData.map((props) => (
              <StatisticsChart
                key={props.title}
                {...props}
                footer={
                  <Typography
                    variant="small"
                    className="flex items-center font-normal text-blue-gray-600"
                  >
                    <ClockIcon
                      strokeWidth={2}
                      className="h-4 w-4 text-blue-gray-400"
                    />
                    &nbsp;{props.footer}
                  </Typography>
                }
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Typography variant="h1" className="my-5px">
            Review Images
          </Typography>
        </div>
        <div className="px-10 pt-10">
          <Typography variant="paragraph" color="blue-gray">
            The Farmer uploads the images , which are first seen by the AI and a
            Solution is proposed by it, then the images fall in close images
            section where the scientist need to verify that solution provided by
            the AI. For Reviewing every image the scients gets some authority
            points, If that solution is found to be wrong in the further steps
            of the verifiaction process , an additional authority points will be
            deducted.
          </Typography>
          <div className="flex justify-center pt-4 pb-10">
            <Link to="../openimages">
              <Button variant="outlined" className="flex items-center gap-2">
                Review
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
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <Typography variant="h1" className="my-5px">
            Upload the Image
          </Typography>
        </div>
        <div className="px-10 pt-10 ">
          <Typography variant="paragraph" color="blue-gray">
            {" "}
            Please upload your image to the chain by using the this stepper form
            , please follow the flow step by step any misplacement of the steps
            leads to the rejection of you transaction request to the chain you
            will get notified by the notifications on each step of the process
            which tell you that the step is successfully executed, some of them
            take time to be executed successfully so please be patient and
            follow the instructions. Make sure to have enough Test ETH in your
            metamask account.Else go to{" "}
            <a
              className="text-blue-600 "
              target="_blank"
              href="https://www.alchemy.com/faucets/ethereum-sepolia"
            >
              https://www.alchemy.com/faucets/ethereum-sepolia
            </a>{" "}
            to get the required test eth{" "}
          </Typography>
        </div>
        <UploadImage />
        <div className="px-10 pb-10 ">
          <Typography variant="paragraph" color="blue-gray">
            For storing of images in Decentralised space IPFS is being used.
            Which in some cases might take some time to upload your file and
            some times it may fail, so if the image upload is not getting
            success responce then please take some time and the retry later.To
            want to know more about the Descentralised storage space refer to{" "}
            <a
              className="text-blue-600"
              target="_blank"
              href="https://ipfs.tech/"
            >
              https://ipfs.tech/
            </a>
          </Typography>
        </div>
      </Layout>
    </div>
  );
}
