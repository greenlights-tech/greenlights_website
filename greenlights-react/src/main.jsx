import React from "react";
import ReactDOM from "react-dom/client";
import { HomePage } from "./pages/HomePage";
import { IntroProvider } from "./context/IntroContext";
import { TalentPage } from "./pages/TalentPage";
import { ClientPage } from "./pages/ClientPage";
import { ContactPage } from "./pages/ContactPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { BlogPage } from "./pages/BlogPage";
import "./styles/main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      { path: "talent", element: <TalentPage /> },
      { path: "opdrachtgever", element: <ClientPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "privacy", element: <PrivacyPage /> },
      { path: "blog", element: <BlogPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <IntroProvider>
      <RouterProvider router={router} />
    </IntroProvider>
  </React.StrictMode>
);
