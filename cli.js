#!/usr/bin/env node
const inquirer = require("inquirer");
const { mdLinks } = require("./index.js");
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
  initCLI();
});

const initCLI = () => {
  // const [, , ...args] = process.argv;
  // const path = args[0];
  // const options = args[1];
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
        })
        .catch((error) => {
          console.log(chalk.white.bgRed.bold("Invalid path"));
          initCLI();
        });
    });
};
