const inquirer = require("inquirer");
const fs = require("fs");
// const axios = require("axios");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the title of your project?"
    },
    {
      type: "input",
      name: "description",
      message: "What does the code do?"
    },
    {
      type: "input",
      name: "installation",
      message: "How do you install the code?"
    },
    {
      type: "input",
      name: "usage",
      message: "What is the expected use for the code?"
    },
    {
        type: "input",
        name: "license",
        message: "What are the licenses required for this project?"
    },
    {
        type: "input",
        name: "contributor",
        message: "Who are the other contributors to this code?"
    },
    {
      type: "input",
      name: "github",
      message: "what is your GitHub Username?"
    },
    {
      type: "input",
      name: "repository",
      message: "What is the name the GitHub repository?"
    }
  ]);
}

function generateReadMe(answers) {
  return `
# **${answers.name}**

Description:

${answers.description}

Table of Contents:

-[Installation](Installation)
-[Usage](##Usage)
-[License](##License)
-[Contributors](##Contributors)
-[Tests](##Tests)
-[Contact Information](##Contact Information)

##Installation

${answers.installation}

##Usage

${answers.usage}

##License

${answers.license}

##Contributors

${answers.contributor}

##Tests


##Contact Information

For more information please contact Kerem Karaman.

`;
}

async function init() {
  console.log("hi")
  try {
    const answers = await promptUser();

    const file = generateReadMe(answers);

    await writeFileAsync("README.md", file);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}

init();