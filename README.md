# Parrit

A historical recommendation engine for daily pair rotation management, with an interactive visual aide of each pairing team.
Visit the app: https://parrit.io/

## Tech Stack

- Supabase
- Netlify
- Remix.run
- ReactJS

## Local Development

### Initialize local database

[Docs Reference](https://supabase.com/docs/guides/cli/getting-started)

1. [Install supabase cli](https://supabase.com/docs/guides/cli/getting-started)
2. [Install Docker](https://docs.docker.com/get-docker/)
3. `supabase start` (this will take awhile on first launch)
4. you can stop supabase with `supabase stop`
5. link your project with `supabase link`
6. clone the remote project with `supabase db pull`


### Create local .env file

1. In the root of your project create a file labeled `.env`
2. Add `SUPABASE_URL = '{SUPABASE_DB_URL}'` 
3. Add `SUPABASE_KEY = '{SUPABASE_ANON_KEY}'`
4. These values are printed as `DB URL` and `anon key` when you run `supabase start` 

### Start localhost

1. `npm i netlify-cli -g`
2. `netlify dev`

## Core Contributors

Big shoutout to the following people for helping to guide the direction that Parrit took. Core contributors also please feel free to add others to the core contributor list for those who significantly shape the direction of Parrit.

- [Anthony Dreessen](mailto:anthonydreessen@gmail.com) - Product Owner, Product Management + Full-stack Development
- [Darcie Fitzpatrick](mailto:darciefitzpatrick@gmail.com) - Product Design, Product Management + User Research
- [Cat Zhang](mailto:cielzee@gmail.com) - Product Management + Product Design
- [Joseph Greubel](mailto:joegreubel1@gmail.com) - Front-end Development, Back-end Development
- [Michael Oleske](mailto:moleske@pivotal.io) - Back-end Development

Take a look at the tech talk we presented about the making of Parrit: https://youtu.be/YVMuMK5Ru_A

## Want to contribute?

- See [Contributing](./docs/Contributing.md)
