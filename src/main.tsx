import { Provider } from "./chakra-ui/provider";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import * as Sentry from "@sentry/react";
// import setupLogRocketReact from "logrocket-react";
import LogRocket from "logrocket";
import { H } from "highlight.run";

// rendering code.

LogRocket.init("oapdqp/image-modifier");

LogRocket.identify("mohsin316", {
  name: "Mohsin Miyaji",
  email: "mohsin.kmiyaji@gmail.com",
});

// after calling LogRocket.init()
// setupLogRocketReact(LogRocket);

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
  enableLogs: true,
});

H.init("3ej763ve", {
  serviceName: "frontend-app",
  tracingOrigins: true,
  networkRecording: {
    enabled: true,
    recordHeadersAndBody: true,
    urlBlocklist: [
      // insert full or partial urls that you don't want to record here
      // Out of the box, Highlight will not record these URLs (they can be safely removed):
      "https://www.googleapis.com/identitytoolkit",
      "https://securetoken.googleapis.com",
    ],
  },
});

H.identify("mohsin316", {
  id: "very-secure-id",
  phone: "867-5309",
  bestFriend: "jenny",
  email: "mohsin.kmiyaji@gmail.com",
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
