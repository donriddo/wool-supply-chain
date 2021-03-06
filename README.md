# Wool Supply Chain

This repository contains an Ethereum DApp that demonstrates the Supply Chain flow for `wool` from when it is planted by the farmer till when it's worn as cloth.

## Problem

Right now, it's really difficult to tell apart which cloth is the original or which is fake. We have seen fake Gucci's and fake Fendi's. Only few people who are well acquainted with these materials can tell them apart. Also, there's no way to keep track of the different stages that the end product - the cloth, has passed through.

## Solution

This Supply Chain DApp aims to provide transparency and a means of authenticity to the above problem. By keeping track of how the cloth was made from when it was planted as wool till when it is worn as cloth, consumers can verify with certainty the authenticity what they have purchased. They can also see the different parties that are involved in producing the cloth.

There are 4 actors involved in this supply chain:

1. Farmer

2. Wool Processor

3. Fabric Designer

4. Buyer / Consumer

The UML diagrams below illustrates the relationships and actions performed by each actor and how it affects the state of the wool.

## Activity Diagram
![Activity diagram](images/Clothing_Business_Activity_diagram.jpeg)

## Sequence Diagram
![Sequence diagram](images/Clothing_Business_Sequence_diagram.jpeg)

## State Diagram
![State diagram](images/Clothing_Business_State_diagram.jpeg)

## Data model
![Data model](images/Clothing_Business_Data_Model.jpeg)


## Steps to run the application

0. Make sure you have Truffle installed (https://www.trufflesuite.com/docs/truffle/getting-started/installation). Also have Metamask chrome extension installed (https://metamask.io/)

1. Clone this repository

2. run `npm install`

3. `cd` into app and again `npm install`

4. Go back to the project root and run `truffle develop`

5. From the develop console, run `compile`

6. Run `test` to ensure all the tests are passing

7. Run `migrate`

8. From a separate tab on your terminal and in the project root, run `npm run client`

9. Go to `localhost:8081` on your browser to interact with the app.

10. Enjoy!


### This DApp has been deployed onto the Rinkeby test network. Find details below

Transaction Hash: **0x7e36108674547428d422157e0d7850d8b303e25f9867b3eaf925dab4f7ac5f0d**

Contract Address: **0x3841A5d26f46cd49dDCa40B5928e8732C356CA15**

#### Here are the development tools used

Remix IDE - (Helped in quickly deploying and testing out the sub-contracts and ensure everything is working fine)

Truffle v5.1.34 (core: 5.1.34) - used its webpack box as it contains all the starter code needed and I only just had to jump into implementation right away

Solidity v0.5.16 (solc-js)

Node v10.16.3

Web3.js v1.2.1

Dependencies:

```json
  {
    "@truffle/hdwallet-provider": "^1.0.43",
    "dotenv": "^8.2.0"
  }
```
