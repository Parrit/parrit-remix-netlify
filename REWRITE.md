# Parrit Remix-Netlify

## Motivation - the sequence of events

1. As some of you may be aware, our previous database [ElephantSQL has reached end of life.](https://www.elephantsql.com/blog/end-of-life-announcement.html) This meant in order to keep the lights on, we would need to swap to a new database.
2. In order to swap to a new database, we needed to be able to make new deploys.
3. Parrit was orignally written at the beginning of React. It was a project we used, in part, to teach us this newfangled technology. Because of this and because of the lack of dedicated support, Parrit has been recieving minimal upgrades throughout its lifecycle.
4. Many of the application hydration patterns we chose at the beginning of the project made it difficult to implement some of our more requested features. Additionally, the SPA nature of the application meant we could not show up on google search results.
5. With the [sunset of Create React App](https://dev.to/eslachance/stop-using-create-react-app-7in) we had some fundamental tech debt that needed to be paid before we could modernize our tech stack in order to take advantage of 10 years of web development best practices iteration.

## Solution - server side rendering (SSR)

Remix (now being merged with React Router) stood out to us as the most portable SSR implementation. Remix has the same accessibility ethos we strive for in our open-source pairing project.

### Imperfect fit

As we developed Parrit in the heyday of SPA, we didn't think the fundamental interaction would need much revision or consideration. It turns out that SSR means we are doing things a little strangely. We've done our best to emulate the experience you've come to know, but there may be some glitches here-and-there. If you're willing to help us work through them, we're willing to provide our time to make it work.

### It seems slower...
One major difference you may notice is that we are waiting for the data to sync between the backend and the frontend. Prior to this update, we were simply bulk-updating the project state in a fire-and-forget model. Modern web fundamentals pushed us to use a REST-ful approach to our data access. That means we are less able to be optimistic about UI changes since **we now care about the ids of nested/child objects.** We've tried to limit these loading screens to less-frequent operations.

### My password doesn't work anymore...
The Spring Bean that was handling passwords did so in an opaque way. It was inconsistent about which hashing algorithm it would apply. As Spring Boot got upgrades, this algorithm would change. We've tried to implement hashing in a way that catches all project password algorithms stored in the ElephantSQL database, but if yours stops working- please do reach out.

## Release Notes
Here are the literal differences found in this new package

1. No more Java
   1. SSR contains both the server code and the UI code, eliminating this dependency
2. Netlify deployed
   1. Prior deploy was on a single droplet in the DigitalOcean. Much respect to the droplet for being able to handle the traffic that it did.
3. Xata.io database
   1. Quirky smaller DBaaS with some interesting reverse-lookup APIs
4. Remix/Vite - based application
   1. SSR functionality means that we can more easily start making an SEO play
   2. This requires us to keep the frontend in-sync with the backend, so you may notice some more loading screens.
5. Github + Netlify CI pipeline
   1. We eliminated a dependency on CodeShip by using Github as our CI pipeline
6. Modern password encryption
   1. You will notice some slowdown when logging in or creating a new project since modern security practices require an arbitrarily difficult hashing algorithm.