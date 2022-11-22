const fs = require("fs");
const axios = require("axios");
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
      const linksArray = [];
      for (let link of links) {
        const linkText = link.match(/\[(.*?)\]/)[1];
        const linkHref = link.match(/\((.*?)\)/)[1];
        linksArray.push({
          href: linkHref,
          text: linkText,
          file: passedPath,
        });
      }
      resolve(linksArray);
    });
  });
};

const validateLinks = (links) => {
  let promises = [];
  const axiosPromises = links.map((link) => {
    promises.push(
      new Promise((resolve, reject) => {
        axios
          .get(link.href)
          .then((response) => {
            link.status = response.status;
            link.statusText = response.statusText;
            resolve(link);
          })
          .catch(() => {
            link.statusText = "Fail";
            link.error = "404";
            resolve(link);
          });
      })
    );
  });
  return Promise.all(promises);
};

const mdLinks = (passedPath, validate) => {
  if (validate) {
    if (validate.validate == true) {
      return searchOnDirectory(passedPath).then((links) =>
        validateLinks(links)
      );
    }
  } else {
    return searchOnDirectory(passedPath);
  }
};

module.exports = {
  mdLinks,
};
