[![Netlify Status](https://api.netlify.com/api/v1/badges/6f43fea8-e2ed-4356-823e-66607621761d/deploy-status)](https://app.netlify.com/sites/parrit/deploys)

# 📣 UPDATE: The default hosted Parrit instance has changed addresses. We're now at https://parrit.io

# Parrit

A historical recommendation engine for daily pair rotation management, with an interactive visual aide of each pairing team.
Visit the app: https://parrit.io/

## Tech Stack

- Remix.run
- React
- Xata.io
- Netlify
- Sentry (for bug detection)

## Core Contributors

Big shoutout to the following people for helping to guide the direction that Parrit took. Core contributors also please feel free to add others to the core contributor list for those who significantly shape the direction of Parrit.

- [Anthony Dreessen](mailto:anthonydreessen@gmail.com) - Product Owner, Product Management + Full-stack Development
- [Darcie Fitzpatrick](mailto:darciefitzpatrick@gmail.com) - Product Design, Product Management + User Research
- [Cat Zhang](mailto:cielzee@gmail.com) - Product Management + Product Design
- [Joseph Greubel](mailto:joegreubel1@gmail.com) - Front-end Development, Back-end Development
- [Michael Oleske](mailto:moleske@pivotal.io) - Back-end Development

Take a look at the tech talk we presented about the making of Parrit: https://youtu.be/YVMuMK5Ru_A

## Running Server Locally

### Step 1: Xata

We use Xata as our data backend. Why? Because AI recommended it.

#### Quickstart

1. `npm install -g @xata.io/cli`
2. `xata auth login`

In order to connect to the core databases you'll need to be part of the Parrit Xata team. Reach out if you aren't already. You can also get started with your own Xata database for free.

### Step 2: Netlify

1. Install the [Netlify CLI](https://docs.netlify.com/cli/get-started/):

```sh
npm i -g netlify-cli
```

If you have previously installed the Netlify CLI, you should update it to the latest version:

```sh
npm i -g netlify-cli@latest
```

2. Sign up and log in to Netlify:

```sh
netlify login
```

3. Run the development server

```sh
netlify dev
```

Open up [http://localhost:8888](http://localhost:8888), and you're ready to go!

### Step 3: Done!

That really should be all it takes to get up and running if you've been added to the correct accounts. If that doesn't work, [contact AJ](mailto:anthonydreessen@gmail.com)

### Serve your site locally

To serve your site locally in a production-like environment, run

```sh
netlify serve
```

Your site will be available at [http://localhost:8888](http://localhost:8888). Note that it will not auto-reload when you make changes.

## Deployment

We have Netlify deploys automatically set up through github workflow. Deploying to a branch should get you a preview environment. Deploying to `main` should deploy the production site.

### In case of error

if Netlify deploys break, you can try to recreate the error locally using these commands

```sh
# preview deployment
netlify deploy --build

# production deployment
netlify deploy --build --prod
```

## Remix Resources

- [Remix Docs](https://remix.run/docs)
- [Netlify Functions Overview](https://docs.netlify.com/functions/overview)
