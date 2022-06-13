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
