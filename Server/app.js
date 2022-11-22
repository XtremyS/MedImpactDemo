//* PATH MODULE
const path = require("path");

//* FILE SYSTEM MODULE FOR READING HTML FILE
const fs = require("fs");

//* PATH FOR READING HTML FILE FRONT END
const indexPath = path.resolve(__dirname, "../BMH-Client/src/index.html");

//* ENV MODULE //! IF NODEJS THROWS ERROR EMPTY STRING ADD ONE . TO ENV PATH
const dotenv = require("dotenv").config({ path: "../Server/config.env" });

//* DB MODULE
require("./DB/connection");

//* DB USER DATA INSTANCE
const User = require("./DBSchema/doc_schema");

//* EXPRESS JS MODULE
const express = require("express");
const app = express();

//* SERVER PORT NUMBER
const port = process.env.PORT || 5000;
app.use(express.json());

//* IMPORTING AUTH MODULE
app.use(require("./Router/auth"));

//* CONVERTING DATA FROM DB INTO JSON FORMAT
app.use(express.json());

//* HEROKU RELATED MODULE
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

//* META DETA FOR SEO
const DefaultMetaData = {
  title: "Spaarks - Local connect, promote business, nearby friends",
  keywords:
    "local,local marketing,marketing,spaarks, spaarksweb,spaark,spaarks web, spaarkweb,spaark web,nearby,nearby business,job,work,want work,friends,make friends,makefriend,announce,market,seller,buyer,vendor,sales",
  description:
    "Have a small business? Do local marketing with Spaarks. Get Customers. Promote your Service. Post local jobs. Find work nearby. Make friends in neighbourhood.",
};

//* METHOD TO GET GET HTML FILE FROM FRONT END
UpdateIndexHtml = (data) => {
  let htmlData = fs.readFileSync(indexPath, "utf8");
  htmlData = htmlData
    .replace(
      "<title>Spaarks: Local Search, Find local stores- Clothes, Salon, Daily Service Near You  </title>",
      `<title>${data.title}</title>`
    )
    .replace(
      `<meta name="title" content="Spaarks - Local connect, promote business, nearby friends">`,
      `<meta name="title" content="${data.title}">`
    )
    .replace(
      `<meta name="keywords" content="local,local marketing,marketing,spaarks, spaarksweb,spaark,spaarks web, spaarkweb,spaark web,nearby,nearby business,job,work,want work,friends,make friends,makefriend,announce,market,seller,buyer,vendor,sales">`,
      `<meta name="keywords" content="${data.keywords}">`
    )
    .replace(
      '<meta name="description" content="Have a small business? Do local marketing with Spaarks. Get Customers. Promote your Service. Post local jobs. Find work nearby. Make friends in neighbourhood.">',
      `<meta name="description" content="${data.description}">`
    )
    .replace(
      `<meta property="og:title" content="Spaarks - Local connect, promote business, make friends">`,
      `<meta property="og:title" content="${data.title}">`
    )
    .replace(
      '<meta property="og:description" content="Have a small business? Do local marketing with Spaarks. Get Customers. Promote your Service. Post local jobs. Find work nearby. Make friends in neighbourhood.">',
      `<meta property="og:description" content="${data.description}">`
    )
    .replace(
      `<meta property="twitter:url" content="https://www.spaarksweb.com/">`,
      `<meta property="twitter:url" content="${url}"></meta>`
    )
    .replace(
      `<meta property="twitter:title" content="Spaarks - Local connect, promote business, make friends">`,
      `<meta property="twitter:title" content="${data.title}">`
    )
    .replace(
      '<meta property="twitter:description" content="Have a small business? Do local marketing with Spaarks. Get Customers. Promote your Service. Post local jobs. Find work nearby. Make friends in neighbourhood.">',
      `<meta property="twitter:description" content="${data.description}">`
    )
    .replace(
      `<meta property="og:url" content="https://www.spaarksweb.com/">`,
      `<meta property="og:url" content="${url}"></meta>`
    )
    .replace(
      `<meta property="og:image" content="https://res.cloudinary.com/ososbackend/image/upload/v1655979585/angular/images/default_y32zoq_bb6epg.webp">`,
      `<meta property="og:image" content="${imgUrl}">`
    )
    .replace(
      `<meta property="og:image" content="https://res.cloudinary.com/ososbackend/image/upload/v1655979585/angular/images/default_y32zoq_bb6epg.webp">`,
      `<meta property="twitter:image" content="${imgUrl}">`
    )
    .replace(
      `<meta property="twitter:card" content="summary_large_image">`,
      `<meta property="twitter:card" content="${imgUrl}">`
    );
  return htmlData;
};

//* THIS METHOD HELPS RENDERING ALL PAGES IN SINGLE PAGE APPLICATION
// app.get("/*", async (req, res, next) => {
//   res.send(await UpdateIndexHtml(DefaultMetaData));
// });

//* LISTING PORT
app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});
