// hello there!
//
// I'm a serverless function that you can deploy as part of your site.
// I'll get deployed to AWS Lambda, but you don't need to know that.
// You can develop and deploy serverless functions right here as part
// of your site. Netlify Functions will handle the rest for you.

import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  if (!event.queryStringParameters) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Hello World`,
      }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${event.queryStringParameters["name"]}`,
    }),
  };
};

export { handler };
