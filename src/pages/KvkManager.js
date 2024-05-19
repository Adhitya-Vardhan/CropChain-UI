import React from "react";
import Layout from "../components/Layout";
import UploadImage from "../components/UploadImage";
import { Typography, Button } from "@material-tailwind/react";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import StatisticsCard from "../components/StatisticsCard";
import StatisticsChart from "../components/StatisticsChart";
import { statisticsCardsData } from "../utils/statisticsCardsData";
import { statisticsChartsData } from "../utils/statisticsChartsData";
import { UserAddCard } from "../components/UserAddCard";
import { Link } from "react-router-dom";

const data = [
  {
    title: "ADD FARMER",
    user: "farmer",
    discription:
      "For registering farmer we need the account address and the Aadhar Id of the farmer which is kept private",
    link: "./farmer",
  },
  {
    title: "ADD Scientist",
    user: "scientist",
    discription:
      "For registering scientist we need the account address and the Aadhar Id of the farmer which is kept private",
    link: "./scientist",
  },
];

export default function KvkManagaer() {
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
            Images
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
          <div className="flex justify-center  gap-10 pt-4 pb-10">
            <Link to="../openimages">
              <Button variant="outlined" className="flex items-center gap-2">
                Open
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
            <Link to="../closeimages">
              <Button variant="outlined" className="flex items-center gap-2">
                Close
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
            <Link to="../finalimages">
              <Button variant="outlined" className="flex items-center gap-2">
                Final
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
          <Typography variant="h1"> Register The Users </Typography>
        </div>
        <div className="flex justify-center gap-10 pb-10 ">
          {data.map((item, index) => (
            <UserAddCard key={index} data={item} />
          ))}
        </div>
        <div className="pb-10 pt-5 px-10">
          <Typography variant="paragraph" color="blue-bray">
            Kvk Manager is the main admin of the chain , the role is directly
            assigned to the deployer of the smart Contract, he adds the Farmers
            and scientists to the chain . Then only they can access and interact
            with the chain. The Basic requiremet is the he should have a wallet
            and an Aadhar Id. As the Consensus is the proof of Authority the
            Identity will be linked to it.This is how the Users interact with
            the chain:
          </Typography>
        </div>
        <div className="flex justify-center">
          <img src="./flow.png" alt="flow Chart" />
        </div>
      </Layout>
    </div>
  );
}
