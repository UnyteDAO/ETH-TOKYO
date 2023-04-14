import { ImportCandidate } from "ipfs-core-types/src/utils";
import { create } from "ipfs-http-client";

// InfuraのプロジェクトIDを設定
const projectId = "2OEyixJ9bhNc8ilnjG7qyV7IXwL"; // <---------- your Infura Project ID

const projectSecret = "1b8c0b6c542ea6beab46de4b4a7f69ca"; // <---------- your Infura Secret
// (for security concerns, consider saving these values in .env files)

const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

export const uploadToIPFS = async (encryptedData: ImportCandidate) => {
  const { path } = await ipfs.add(encryptedData);
  return path;
};
