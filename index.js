const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");
// const Choices = require("inquirer/lib/objects/choices");
let licenseChoices = ["None", "NPM"];
let licenseShieldURL = "";
let userRepoCount = 0;

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the title of your project?",
      validate: function (answer) {
        if (answer==="") {
          return 'You must type something!';
        }

        return true;
      }
    },
    {
      type: "input",
      name: "description",
      message: "What does the code do?",
      validate: function (answer) {
        if (answer==="") {
          return 'You must type something!';
        }

        return true;
      }
    },
    {
      type: "input",
      name: "installation",
      message: "How do you install the code?",
      validate: function (answer) {
        if (answer==="") {
          return 'You must type something!';
        }

        return true;
      }
    },
    {
      type: "input",
      name: "usage",
      message: "What is the expected use for the code?",
      validate: function (answer) {
        if (answer==="") {
          return 'You must type something!';
        }

        return true;
      }
    },
    {
      type: "list",
      name: "license",
      message: "What are the licenses required for this project?",
      choices: licenseChoices,
    },
    {
      type: "input",
      name: "contributor",
      message: "Who are the other contributors to this code?",
      validate: function (answer) {
        if (answer==="") {
          return 'If None, please type None!';
        }

        return true;
      }
    },
    {
        type: "input",
        name: "testing",
        message: "What are the tests that should be run on this code?",
        validate: function (answer) {
            if (answer==="") {
              return 'You must type something!';
            }
    
            return true;
          }
    },
    {
      type: "input",
      name: "github",
      message: "what is your GitHub Username?",
      validate: function (answer) {
        if (answer==="") {
          return 'You must type something!';
        }

        return true;
      }
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
      validate: function (answer) {
        if (answer==="") {
          return 'You must type something!';
        }

        return true;
      }
    }
  ]);
}

function generateShieldURL(answers){
    // console.log(answers.license)
    switch(answers.license){
        case "None": licenseShieldURL=""; break;
        case "NPM": licenseShieldURL="![NPM](https://img.shields.io/npm/l/inquirer)"; break;
    }
    // console.log(licenseShieldURL);
}

function getRepoCount(answers){
    const queryUrl = `https://api.github.com/users/${answers.github}/repos?per_page=100`;

    axios.get(queryUrl).then(function ({ data }) {
        const repoNames = data.map(function (repo) {
        userRepoCount++;
        return repo.name;

      });
          
      console.log(`${repoNames.length} repos`);
})
}

function generateReadMe(answers) {
  
  return `
# **${answers.name}**
${licenseShieldURL}

#### **Description:**

${answers.description}

#### **Table of Contents:**

- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributors](#Contributors)
- [Tests](#Tests)
- [Questions](#Questions)

## Installation

${answers.installation}

## Usage

${answers.usage}

## License

This code is covered under the ${answers.license} license.

## Contributors

${answers.contributor}

## Tests

${answers.testing}

## Questions

For more information please contact me using my [email](${answers.email}).

If you liked this, you can my other ${userRepoCount} repositories at my [GitHub profile](https://github.com/${answers.github})

![Commit Day](https://img.shields.io/github/last-commit/KKaraman/readMeGenerator?style=plastic)

`;
}

async function init() {
  console.log("Thank you for using my ReadMe Generator, let's get started!")
  try {
    const answers = await promptUser();
    generateShieldURL(answers);
    getRepoCount(answers);
    const file = generateReadMe(answers);

    await writeFileAsync("README.md", file);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}

init();