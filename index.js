const fs = require("fs");
const axios = require("axios");
const path = require("path");

const searchOnDirectory = (passedPath) => {
  return new Promise((resolve, reject) => {
    let promises = [];
    fs.readdir(passedPath, (err, files) => {
      if (err) {
        reject("Invalid path");
        return;
      }
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
                searchOnDirectory(passedPath + "/" + file)
                  .then((data) => {
                    resolve(data);
                  })
                  .catch((err) => {
                    throw err;
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

const stats = (links) => {
  const total = links.length;
  const hrefs = links.map((link) => link.href);
  const uniqueLinksObject = new Set(hrefs);
  const uniqueLinks = [...uniqueLinksObject].length;
  return { Total: total, Unique: uniqueLinks };
};

const brokenLinks = (links) => {
  const statss = stats(links);
  const linksArray = links.filter((link) => link.statusText == "Fail");
  return { ...statss, broken: linksArray.length };
};

const mdLinks = (passedPath, validate) => {
  if (validate) {
    if (validate.validate == true) {
      return searchOnDirectory(passedPath)
        .then((links) => validateLinks(links))
        .catch((error) => {
          throw error;
        });
    }
  } else {
    return searchOnDirectory(passedPath).catch((error) => {
      throw error;
    });
  }
};

module.exports = {
  mdLinks,
  stats,
  brokenLinks,
};
