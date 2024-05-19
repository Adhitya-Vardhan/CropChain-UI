import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

export default function ImagesLayout() {
  const [type, setType] = React.useState("card");

  return (
    <Card className=" h-[calc(100vh-3rem)] w-full ">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center"
      >
        <div className="mb-4 h-20 p-6 text-white">
          <img
            alt="paypal "
            className="w-14 "
            src="https://docs.material-tailwind.com/icons/paypall.png"
          />
        </div>
        <Typography variant="h5" color="white">
          Plant Images
        </Typography>
      </CardHeader>
      <CardBody>
        <Tabs value={type} className="overflow-visible">
          <TabsHeader className="relative z-0 ">
            <Tab value="card" onClick={() => setType("open")}>
              Open
            </Tab>
            <Tab value="paypal" onClick={() => setType("close")}>
              Close
            </Tab>
            <Tab value="paypal" onClick={() => setType("final")}>
              Final
            </Tab>
          </TabsHeader>
          {/* <TabsBody
            className="!overflow-x-hidden !overflow-y-visible"
            animate={{
              initial: {
                x: type === "card" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "card" ? 400 : -400,
              },
            }}
          > */}
          <TabsBody
            className="!overflow-x-hidden !overflow-y-visible"
            animate={{
              initial: {
                x:
                  type === "open"
                    ? 0 // Open
                    : type === "closed"
                    ? 100 // Closed
                    : 200, // Final (more negative)
              },
              mount: {
                x: 0,
              },
              unmount: {
                x:
                  type === "open"
                    ? 0 // Stay put for Open
                    : type === "closed"
                    ? 100 // Slide left for Closed
                    : 200, // Slide further left for Final (off-screen)
              },
            }}
          >
            <TabPanel value="card" className="p-0">
              <form className="mt-12 flex flex-col gap-4">
                <Button size="lg"> Open Fetch </Button>

                <Typography
                  variant="small"
                  color="gray"
                  className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
                >
                  <LockClosedIcon className="-mt-0.5 h-4 w-4" /> All
                  interactions are monitored
                </Typography>
              </form>
            </TabPanel>
            {/* this is the break Point */}
            <TabPanel value="paypal" className="p-0">
              <form className="mt-12 flex flex-col gap-4">
                <Button size="lg">Close Fetch</Button>
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center justify-center gap-2 font-medium opacity-60"
                >
                  <LockClosedIcon className="-mt-0.5 h-4 w-4" /> All
                  Interactions are monitored
                </Typography>
              </form>
            </TabPanel>
            <TabPanel value="card" className="p-0">
              <form className="mt-12 flex flex-col gap-4">
                <Button size="lg"> Final Fetch </Button>

                <Typography
                  variant="small"
                  color="gray"
                  className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
                >
                  <LockClosedIcon className="-mt-0.5 h-4 w-4" /> All
                  interactions are monitored
                </Typography>
              </form>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}
