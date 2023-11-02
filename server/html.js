import React from "react";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";
import { renderToString } from "react-dom/server";

import createFetchRequest from "./request";
import App from "../src/App";
import Home from "../src/pages/Home";
import About from "../src/pages/About";

const routes = [
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        element: Home,
      },
      {
        path: "about",
        element: About,
      },
    ],
  },
];

export async function renderHtml(req) {
  let { query, dataRoutes } = createStaticHandler(routes);
  let fetchRequest = createFetchRequest(req);
  let context = await query(fetchRequest);

  // If we got a redirect response, short circuit and let our Express server
  // handle that directly
  if (context instanceof Response) {
    throw context;
  }

  let router = createStaticRouter(dataRoutes, context);
  return renderToString(
    <StaticRouterProvider router={router} context={context} />
  );
}
