import { XataClient } from "src/xata";

export default () => {
  return new XataClient({
    apiKey: process.env.XATA_API_KEY,
    branch: process.env.XATA_BRANCH,
  });
};
