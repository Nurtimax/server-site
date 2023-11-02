import express from "express";
import fs from "fs";
import path from "path";

import { renderHtml } from "./html";

const app = express();

app.use("^/$", (req, res) => {
  fs.readFile(
    path.resolve("./build/index.html"),
    "utf-8",
    async (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Some error happened");
      }
      const html = await renderHtml(req);

      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      );
    }
  );
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(3005, () => {
  console.log("port 3005 working");
});
