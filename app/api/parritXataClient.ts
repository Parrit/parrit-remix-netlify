import { XataClient } from "src/xata";

export default () =>
  new XataClient({
    apiKey: process.env.XATA_API_KEY,
    branch: process.env.XATA_BRANCH,
  });
