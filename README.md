### Challenge: "Trust" for work colleagues in anonymous economies
- Trust is essential when requesting work in DAOs.
  - Does the person have the necessary skills to complete the task?
  - Can the person commit to a specific timeframe? etc.
- Currently, there are only two ways to determine someone's trustworthiness:
  - ① Confirming a team member's activities and evaluations from previous projects
  - ② Trusting the self-reported achievements and work products of the other person.
- Method ① only applies to people within one's immediate circle, and method ② does not provide objective and reliable information.
- Method ②Trusting self-reported achievements and outcomes
![image](https://user-images.githubusercontent.com/40339533/232256784-0e0e5d94-9af3-446f-9c35-358a95c7a195.png)


### Solution: A decentralized member evaluation system
- A teammate of a user writes an evaluation.
- The contents of the evaluation are encrypted and stored.
- To confirm the evaluation, one can purchase a unique token and send it to the user's wallet, which allows the evaluation to be decrypted and viewed.
- Those who disclose evaluations can return the tokens they receive to the community or the evaluator as a creator fee (similar to NFT creator fees).
![image](https://user-images.githubusercontent.com/40339533/232256793-c1c6b6fc-5909-4dac-b32b-b2363b33cc27.png)

![image](https://user-images.githubusercontent.com/40339533/232257266-b5a9aad9-c951-4376-ad6f-d3518f69b178.png)


### Vision: A world where trust can be exchanged without trust
- A mechanism for transferring people's evaluations as "reliable information from a third party."
  - The person who wrote the evaluation is disclosed before purchase.
  - The specific contents of the evaluation and the evaluator are not linked (=who entered which evaluation remains unknown until the end).
- By collecting fair evaluations from work partners, a world where DAOs and project launches can judge "Who should we entrust with this work?" fairly can be realized.
  - Leaves no room for false self-reports.
  - A departure from the "honest person loses" world.
![image](https://user-images.githubusercontent.com/40339533/232256813-fc61d62b-7050-45f2-b1bb-d5965c859c2c.png)

### Specifications:
- Features
  - Evaluator
    - Wallet connection
    - Writing messages to specific addresses
    - Encrypting messages and saving them to IPFS
    - Saving IPFS hash values on the chain
    - ![image](https://user-images.githubusercontent.com/40339533/232257526-cf381e5b-e6af-4793-855b-2852041864c9.png)

  - Viewer
    - Wallet connection
    - Confirmation of ownership of a specific ERC20 token
    - Sending the token to the evaluation target for viewing (approve)
    - Decrypting and viewing evaluations saved in IPFS
    - ![image](https://user-images.githubusercontent.com/40339533/232257695-0b6426a4-c294-4a82-82f7-68ceb5e68cb8.png)
    - ![image](https://user-images.githubusercontent.com/40339533/232257793-45398f15-cd5f-42e6-a52e-77cc615f869a.png)
    - ![image](https://user-images.githubusercontent.com/40339533/232257809-bb7c0a34-dda6-4064-9874-d7063fb8e478.png)



  - Evaluation target
    - Checking the addresses that sent evaluations
    - Approving addresses (to prevent negative evaluations from unknown addresses)
    - Fee setting for evaluators who receive tokens
  - Tech Stack
    - Encryption/Decryption: Lit Protocol
    - Data storage on the chain: Scroll
    - Issuance and ownership confirmation of ERC20 tokens: Scroll
      - If possible, we want to use Superfluid here.
      - Paying a subscription fee with Superfluid...
