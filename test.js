const { mdLinks } = require("./index.js");

// mdLinks("./archivos", { validate: true }).then((data) => console.log(data));
// mdLinks("./archivos").then((data) => console.log(data));
mdLinks("C:/Users/57301/Documents/BOG005-md-links/archivos").then((data) =>
  console.log(data)
);

// mdLinks("./archivos/2.md").then((data) => console.log(data));
// mdLinks("./archivos/a/3.md").then((data) => console.log(data));
// mdLinks("./archivos/a/b/4.md").then((data) => console.log(data));
