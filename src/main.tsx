import { Provider } from "./chakra-ui/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as Sentry from "@sentry/react";


Sentry.init({
  dsn: "https://01c27edf2e1714e73e8bbd380005a758@o4510187004297216.ingest.us.sentry.io/4510187008098304",

// This sets the sample rate to be 10%. You may want this to be 100% while
// in development and sample at a lower rate in production
replaysSessionSampleRate: 1,
// If the entire session is not sampled, use the below sample rate to sample
// sessions when an error occurs.
replaysOnErrorSampleRate: 1.0,
integrations: [
  Sentry.replayIntegration({
    // Additional SDK configuration goes in here, for example:
    maskAllText: true,
    blockAllMedia: true,
  }),
],
  // Enable logs to be sent to Sentry
  enableLogs: true
});



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
