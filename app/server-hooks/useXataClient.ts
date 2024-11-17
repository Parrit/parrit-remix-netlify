import { XataClient } from "src/xata";

const useXataClient = () =>
  new XataClient({
    apiKey: process.env.XATA_API_KEY,
    branch: process.env.XATA_BRANCH,
  });

export default useXataClient;
