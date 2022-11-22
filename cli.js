const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "list",
      name: "Nombre",
      message: "¿Cuál es tu nombre?",
      // default: "Sin nombre",
      choices: ["red", "blue", "pink"],
    },
  ])
  .then((answers) => {
    console.log("answer: ", answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
    }
  });
