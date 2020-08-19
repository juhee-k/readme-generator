const fs = require('fs')
const axios = require("axios");
const inquirer = require("inquirer");
const generateMarkdown = require('./utils/generateMarkdown.js');

// array of questions for user
const questions = [
  {
  name: 'username',
  message: 'Enter your GitHub username: ',
  default: "juhee-k"
  },

    {
    type: 'input',
    name: 'rmTitle',
    message: 'What is the project title?',
    default: "awesome-readme-generator"
    },
    {
    type: 'input',
    name: 'rmDesc',
    message: 'What is the project description?',
    default: "best CLI app in the world!"
    },
    {
    type: 'input',
    name: 'inst',
    message: 'What are the installation instructions?',
    default: "npm i and then npm run start after installation"
  },
  {
    type: 'input',
    name: 'cont',
    message: 'What are the contents?'
  },
  {
  type: 'list',
  name: 'rmLic',
  message: 'What is the license?',
  choices: [
    {name: "MIT", value: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)"},
    {name: "Apache", value: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)"},
    {name: "Boost", value: "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)"}
  ],
  default: "MIT"
  },
  {
    type: 'input',
    name: 'test',
    message: 'What are the tests?',
    default: "npm run test"
  },
  {
    type: 'input',
    name: 'qs',
    message: 'Any questions?',
    default: "no"
  },
  {
    type: 'input',
    name: 'con',
    message: 'Who are the contributors?',
    default: "just me"
  }

];

// function to write README file
function writeToFile(fileName, data) {

fs.writeFile(fileName + '.md', data, error => error ? console.error(error): console.log(`${fileName + '.md'} generated!`))

}

// function to initialize program
function init() {

inquirer
.prompt(questions)
.then(function(response) {
  console.log(response)
  const queryUrl = `https://api.github.com/users/${response.username}`;
  
axios
.get(queryUrl)
.then(function(res) {

  const readmeTemplate = `
# ${response.rmTitle}

## Licensed Under
${response.rmLic}

## Table Contents
${response.cont}

## Installation Instruction
\`\`\`
${response.inst}
\`\`\`

## Description
\`\`\`
${response.rmDesc}
\`\`\`

## Questions
${response.qs}

## Contributor
${response.con}

  `
  writeToFile(response.rmTitle, readmeTemplate, err=> console.log(err|| "Success!"));  
  console.log(res.data);

  });
});

}

// function call to initialize program
init();
