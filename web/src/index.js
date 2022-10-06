import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import * as Amplitude from "@amplitude/analytics-browser";
import { RouterProvider, createHashRouter } from "react-router-dom";
import Root from "./pages/root";
import FlashScreen from "./components/flashscreen";
import "./global.css";

const HomePage = React.lazy(() => import("./pages/index"));
const ErrorPage = React.lazy(() => import("./pages/error"));
const PlaylistPage = React.lazy(() => import("./pages/playlist"));
const MusicPage = React.lazy(() => import("./pages/music"));

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "playlist/:playlistId",
        element: <PlaylistPage />,
      },
      {
        path: "music/:musicId",
        element: <MusicPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
  Amplitude.init(process.env.REACT_APP_AMPLITUDE_API_KEY);
}

root.render(
  <React.StrictMode>
    <Suspense fallback={<FlashScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
