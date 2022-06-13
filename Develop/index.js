//Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require("./utils/generateMarkdown.js");

// TODO: Create an array of questions for user input
// const questions = [];

const promptUser = () => {
    return inquirer.prompt([
        // project title
        {
            type: 'input',
            name: 'title',
            message: "What is your project's title?"
        },
        {
            type: "input",
            name: "description",
            message: "Enter a description of your project."
        },
        {
            type: "input",
            name: "installation",
            message: "Enter installation instructions."
        },
        {
            type: "input",
            name: "usage",
            message: "Enter usage instructions."
        },
        {
            type: "input",
            name: "contribution",
            message: "Enter contribution guidelines."
        },
        {
            type: "input",
            name: "tests",
            message: "Enter test instructions."
        },
        {
            type: "list",
            name: "license",
            message: "Choose a license for your project: ",
            choices: [
                "Apache 2.0",
                "Boost Software License 1.0",
                "Eclipse Public License 1.0",
                "IBM Public License Version 1.0",
                "ISC License"
            ]
        },
        {
            type: "input",
            name: "githubUsername",
            message: "Enter your github username: "
        }
    ])
}

// TODO: Create a function to write README file
function writeToFile(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile("./GeneratedReadme.md", data, err => {
            if(err) {
                reject(err);
                // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }

            resolve({
                ok: true,
                message: 'File created'
            })
        })
    })

}

// TODO: Create a function to initialize app
function init() {
    promptUser()
        .then(data => {
            return generateMarkdown(data);
        })
        .then(data => {
            return writeToFile(data);
        });
}

// Function call to initialize app
init();
