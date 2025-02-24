[![Netlify Status](https://api.netlify.com/api/v1/badges/6f43fea8-e2ed-4356-823e-66607621761d/deploy-status)](https://app.netlify.com/sites/parrit/deploys)

# Parrit

A historical recommendation engine for daily pair rotation management, with an interactive visual aide of each pairing team.
Visit the app: https://parrit.io/

## Links

### [Live Site](https://parrit.io)

A CI-pipeline hosted instance that you can use!

### [Release Writeup](./REWRITE.md)

A note from our dev team about why we've made this dramatic change

### [GH-Pages](https://parrit.github.io/parrit-remix-netlify)

We publish our CI test runs to this site for easy viewing

## Tech Stack

- Remix.run
- React
- Xata.io
- Netlify
- Sentry (for bug detection)
- Playwright (e2e tests)
- GithubActions (general automation)

## Playwright

1. **Screenshots** of test runs are published to our [github pages site](https://parrit.github.io/parrit-remix-netlify/)
2. Detailed run success/failure information can be found in each task execution [action ref](https://github.com/Parrit/parrit-remix-netlify/actions/workflows/playwright.yml)

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

#### Install the CLI and Login

1. `npm install -g @xata.io/cli`
2. `xata auth login`

In order to connect to the core databases you'll need to be part of the Parrit Xata team. Reach out if you aren't already. You can also get started with your own Xata database for free.

#### Shema

Xata doesn't appear to have a clean way of migrating (or even exporting) the schema. What it does do is allow you to upload CSVs which become tables. Reach out for starter data or make some of your own.

#### Create the sentinel "Floating" record

easiest way is through the Xata UI

`id: -1, project: null`

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
