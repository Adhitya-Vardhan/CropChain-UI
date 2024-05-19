import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

export function FarmerTab() {
  const data = [
    {
      label: "Intro",
      value: "Intro",
      desc: `This is a Decentralises Application built on top the Ethereum network, deployed on one of the Test nets of the Etherreum, the smart contract defines all the rules of the blockChain 
       it is wriiten using Solidity.`,
    },
    {
      label: "Images",
      value: "Images",
      desc: `The images are categorised in to 3 types Open,Close and Final images, the images uploaded and revirewd by Ai gets added to the Open list, The ones which are after reviewed by a scientist get added to close list and then these are reviewed by the verifiers , those are added to final images`,
    },

    {
      label: "Consensus",
      value: "Consensus",
      desc: `Proof of Authority is used as the consensus mechanism wherre the authotiy points are associated with the identity of the user, any wrong interaction is gonna effect the identity i.e the identity of the person is at stake `,
    },

    {
      label: "Rules",
      value: "Rules",
      desc: `the smart contract is defined with a certain set of rules for each actor on the chain  , even if he tries ot do some other interactions the smart contract is gonna reject those transactions`,
    },

    {
      label: "Data Storage",
      value: "Data Storage",
      desc: `The images gets directly stored in the IPFS network which is a decentralised file storage system , where the data is located thorugh the hash of the data i.e it is data based routing system rather than location based`,
    },
  ];

  return (
    <div className=" px-3 pt-10 pb-10 ">
      <Tabs id="custom-animation" value="html">
        <TabsHeader>
          {data.map(({ label, value }) => (
            <Tab key={value} value={value}>
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody
          animate={{
            initial: { y: 250 },
            mount: { y: 0 },
            unmount: { y: 250 },
          }}
        >
          {data.map(({ value, desc }) => (
            <TabPanel key={value} value={value}>
              {desc}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
