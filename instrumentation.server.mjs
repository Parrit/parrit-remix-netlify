import * as Sentry from "@sentry/remix";

Sentry.init({
    dsn: "https://c8a47fcd86fce0c2b5913396f6b08533@o4508546853830656.ingest.us.sentry.io/4508546855272448",
    tracesSampleRate: 1,
    autoInstrumentRemix: true
})