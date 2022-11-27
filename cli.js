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
  log(
    chalk.white.bgGreen.bold(
      "To use md-links insert a valid path of the directory you want to read"
    )
  );

  inquirer
    .prompt([
      {
        name: "path",
        message: "Insert a validate path",
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
          console.log(chalk.white.bgRed.bold("invalid path"));
        });
    })
    .catch((error) => {
      console.log(chalk.white.bgRed.bold("invalid path"));
    });

  // inquirer
  //   .prompt([
  //     {
  //       type: "list",
  //       name: "Nombre",
  //       message: "Do you want to see some of our options?",
  //       choices: ["Validate", "Stats", "Validate and Stats"],
  //     },
  //   ])
  //   .then((answers) => {
  //     mdLinks(answers.path).then((data) => console.log(data));
  //   })
  //   .catch((error) => {
  //     if (error.isTtyError) {
  //     }
  //   });
});

// const argv = process.argv;
// const route = process.argv[2];

// const cli = (route, argv) => {
//   if (route === undefined) {
//     console.log("Ingresa una ruta válida");
//   } else if (argv.includes("--validate")) {
//     mdLinks("./archivos", { validate: true }).then((data) => console.log(data));
//   }
// };

// cli(route, argv);

// mdLinks("./archivos", { validate: true }).then((data) => console.log(data));

// console.log(`Hello world ${args}`);

// inquirer
//   .prompt([
//     {
//       type: "list",
//       name: "Nombre",
//       message: "¿Cuál color favorito?",
//       // default: "Sin nombre",
//       choices: ["red", "blue", "pink"],
//     },
//   ])
//   .then((answers) => {
//     console.log("answer: ", answers);
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//     }
//   });
