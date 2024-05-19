
# CROP-CHAIN

Decentralised Pland Disesase detection and solution verification system.This repo has the front-end code of the project. This is a research project. Technologies include Hardhat, Ipfs, web3 , moralis and Ethereum smart contract development using solidity.This uses PROOF OF AUTHORITY as its consensus mechanism.This is a permissioned chain so the admin aka KvkManager is the who can give access to the chain, who the deployer of the smart contract.

Actors Include KvkManager, Farmers and Scientist. The manager includes the farmers and Scientist to the chain. Farmers upload the images. which are first viewed by the Ai and are then reviewed by the Scientists and at last all the verifiers vote the soluions provided.By this way they come to a decision of correct solution for a given plant diesase.

# PROJECT ARCHITECTURE
![Screenshot from 2024-03-31 12-30-30](https://github.com/Adhitya-Vardhan/CropChain-UI/assets/116478666/3aa45eef-2468-437c-9a37-dd9f2b3e061c)
Flow
![op](https://github.com/Adhitya-Vardhan/CropChain-UI/assets/116478666/6af22342-42a9-40ee-b766-1f4e4974353e)


## 🔗 Links

FrontEnd deployment ->[https://adhitya-vardhan.github.io/CropChain-UI/](https://adhitya-vardhan.github.io/CropChain-UI/)


SmartContract->[https://github.com/Adhitya-Vardhan/CropChain ](https://github.com/Adhitya-Vardhan/CropChain)

Etherscan Testnet->[https://sepolia.etherscan.io/tx/0x040fea4b8a199911d5639d042280f57f3faec8baf3cddd6150cc3dd8c104da50](https://sepolia.etherscan.io/tx/0x040fea4b8a199911d5639d042280f57f3faec8baf3cddd6150cc3dd8c104da50)




## UI

Home page: 
![Screenshot from 2024-05-19 15-16-08](https://github.com/Adhitya-Vardhan/CropChain-UI/assets/116478666/345bf3eb-1fe1-4921-8b52-c8f329aa1f6c)

Farmer Page:
![Screenshot from 2024-05-19 15-15-47](https://github.com/Adhitya-Vardhan/CropChain-UI/assets/116478666/7dd8d594-b949-40c5-a379-167235eb5b24)

KvkManager Page:
![Screenshot from 2024-05-19 15-14-43](https://github.com/Adhitya-Vardhan/CropChain-UI/assets/116478666/a9b6f42e-39ab-47ec-bab8-60d77b714037)

Other Pages:
![Screenshot from 2024-05-19 15-17-16](https://github.com/Adhitya-Vardhan/CropChain-UI/assets/116478666/73c2d314-f08d-4533-b92e-6100dd727d20)
![Screenshot from 2024-05-19 15-17-16](https://github.com/Adhitya-Vardhan/CropChain-UI/assets/116478666/3a395bf6-a770-45d2-9585-0307b87b0b32)

## Private keys

create a .env fiel and intialise these variable. Generate your pinata API key after goint to Pinata website

```bash
REACT_APP_DEPLOYER -> address of the deployer
REACT_APP_PINATA_API_KEY -> secret api key
REACT_APP_PINATA_SECRET_API_KEY -> secret Api key of Pinata
REACT_APP_CONTRACT -> where the contract is deployed -> Addresss
```

## Installation

Locate to the root folder of the project.

To install all the dependencies

```bash
  npm i
```
To start the project

   ```bash 
  npm start
``` 
## License

[MIT](https://choosealicense.com/licenses/mit/)

