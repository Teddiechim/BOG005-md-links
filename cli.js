#!/usr/bin/env node
const inquirer = require("inquirer");
const { mdLinks, stats, brokenLinks } = require("./index.js");
const chalk = require("chalk");
const figlet = require("figlet");
const log = console.log;

figlet("Welcome to md-links!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
  log(
    chalk.white.bgGreen.bold(
      "To use md-links insert a valid path of the directory you want to read"
    )
  );

  initCLI();
});

const options = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Options",
        choices: ["Validate", "Stats", "Validate and Stats"],
      },
    ])
    .then((answers) => {
      if (answers.choice == "Validate") {
        mdLinks("./archivos", { validate: true }).then((data) =>
          console.log(data)
        );
      } else if (answers.choice == "Stats") {
        mdLinks("./archivos", { validate: true }).then((data) =>
          console.table(stats(data))
        );
      } else if (answers.choice == "Validate and Stats") {
        mdLinks("./archivos", { validate: true }).then((data) =>
          console.table(brokenLinks(data))
        );
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
      }
    });
};

const initCLI = () => {
  inquirer
    .prompt([
      {
        name: "path",
        message: "Insert a validate path: ",
      },
    ])
    .then((answers) => {
      mdLinks(answers.path)
        .then((data) => {
          console.log(data);
          log(
            chalk.yellow.bgGreen.bold("Take a look at some of our options:") +
              chalk.yellow.bold(" choose") +
              chalk.red.bold(" 'Validate' ") +
              chalk.yellow.bold(
                "to make an HTTP request for the links, choose"
              ) +
              chalk.red.bold(" 'Stats' ") +
              chalk.yellow.bold(
                "to see some statistics of the links and choose"
              ) +
              chalk.red.bold(" 'Validate and Stats' ") +
              chalk.yellow.bold(
                "to get statistics that need validation results."
              )
          );
          options();
        })
        .catch((error) => {
          console.log(chalk.white.bgRed.bold("Invalid path"));
          initCLI();
        });
    });
};
