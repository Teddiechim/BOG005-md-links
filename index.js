const fs = require("fs");
const path = require("path");

const searchOnDirectory = (passedPath) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    fs.readdir(passedPath, (err, files) => {
      if (path.extname(passedPath) === ".md") {
        readAndValidate(passedPath).then((data) => {
          resolve(data);
        });
      } else {
        for (let file of files) {
          promises.push(
            new Promise((resolve, reject) => {
              if (path.extname(file) === ".md") {
                readAndValidate(passedPath + "/" + file).then((data) => {
                  resolve(data);
                });
              } else {
                searchOnDirectory(passedPath + "/" + file).then((data) => {
                  resolve(data);
                });
              }
            })
          );
        }
        Promise.all(promises).then((values) => {
          const newValues = values.reduce((acc, val) => acc.concat(val), []);
          resolve(newValues);
        });
      }
    });
  });
};

const readAndValidate = (passedPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(passedPath, "utf8", (err, data) => {
      if (err) reject(err);
      const links = data.match(/\[(.*?)\]\((.*?)\)/g);
      const splitByBrackets = links.map((link) => link.split("]("));

      const formatedData = splitByBrackets.map((link) => ({
        href: link[1],
        text: link[0],
        file: passedPath,
      }));
      resolve(formatedData);
    });
  });
};

const mdLinks = (passedPath) => {
  return searchOnDirectory(passedPath);
};

module.exports = {
  mdLinks,
};
