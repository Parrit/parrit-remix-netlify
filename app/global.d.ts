// global.d.ts
interface Cookiebot {
  consents: {
    given: string[];
  };
}

interface Window {
  Cookiebot?: Cookiebot;
}
