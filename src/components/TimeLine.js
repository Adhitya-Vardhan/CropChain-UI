import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
} from "@material-tailwind/react";

export function TimeLine() {
  return (
    <>
      <div className="flex justify-center">
        <Typography variant="h1" className="my-20px">
          {" "}
          Course of Action{" "}
        </Typography>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2">
          <Timeline>
            <TimelineItem>
              <TimelineConnector />
              <TimelineHeader className="h-3">
                <TimelineIcon />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="leading-none"
                >
                  Registering Users
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography
                  variant="small"
                  color="gary"
                  className="font-normal text-gray-600"
                >
                  Kvk Manager is the main adim of this permissioned chain he
                  adds the farmers and the users by adding their metamask wallet
                  address and the aadhar id to the chain.
                </Typography>
              </TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineConnector />
              <TimelineHeader className="h-3">
                <TimelineIcon />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="leading-none"
                >
                  Farmer Uploads the Image
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography
                  variant="small"
                  color="gary"
                  className="font-normal text-gray-600"
                >
                  Farmer upload the image of the plant , this image is first
                  viewed by the AI which gusses the disease and gives the
                  solution for the image uploaded
                </Typography>
              </TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineConnector />
              <TimelineHeader className="h-3">
                <TimelineIcon />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="leading-none"
                >
                  Scientist Reviews the Image
                </Typography>
              </TimelineHeader>
              <TimelineBody className="pb-8">
                <Typography
                  variant="small"
                  color="gary"
                  className="font-normal text-gray-600"
                >
                  scientists see the ai solution and cross verifies it with his
                  suggested solution, after that the images goes into the final
                  list of images where all the eligible memebers in the network
                  vote the answer
                </Typography>
              </TimelineBody>
            </TimelineItem>
            <TimelineItem>
              <TimelineHeader className="h-3">
                <TimelineIcon />
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="leading-none"
                >
                  Authority points
                </Typography>
              </TimelineHeader>
              <TimelineBody>
                <Typography
                  variant="small"
                  color="gary"
                  className="font-normal text-gray-600"
                >
                  For each verification of the solution and voting of the
                  solution the authority points of the individual increases ,
                  and up on wrong interaction the authoriy points gets deducted.
                </Typography>
              </TimelineBody>
            </TimelineItem>
          </Timeline>
        </div>
      </div>
    </>
  );
}
