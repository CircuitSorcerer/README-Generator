// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

const fileName = 'README.md'
// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        message: "What's the Title",
        name: 'title',
    },

    {
        type: 'input',
        message: "Enter a Description", //Motivation, Why?, Problem solved?, Learned?
        name: 'description',
    },

    {
        type: 'input',
        message: "Enter any installation notes.",
        name: 'installation',
    },

    {
        type: 'input',
        message: "What's the intended usage?",
        name: 'usage',
    },

    {
        type: 'input',
        message: "Provide any Credits, separate with commas.",
        name: 'credits',
    },

    {
        type: 'list',
        message: "What's the chosen license?",
        name: 'license',
        choices: ['MIT', 'Open', 'Creative Commons']
    },

    {
        type: 'input',
        message: "List any features, separate with commas.",
        name: 'features',
    },

    {
        type: 'input',
        message: "List completed tests, separate with commas.",
        name: 'tests',
    },
    
    {
        type: 'input',
        message: 'What is your username?',
        name: 'user',
    },

    {
        type: 'input',
        message: 'Enter Links, separate with commas.',
        name: 'links',
    }

    //contents

    //image
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    console.log(data.credits);

    // Title
    const title = `# ${data.title}`;

    // Description
    const description = `## Description\n
    ${data.description}`;

    // Installation
    let installation = '';
    if (data.installation !== '') {
        installation = `## Installation\n
        ${data.installation}`;
    }

    // Usage
    let usage = '';
    if (data.usage !== '') {
        usage = `## Usage\n
        ${data.usage}`
    }
    

    // Credits
    function creditsTest(data) {
        let string = data.credits;
        if (string === '') {
            return credits = ''
        }
        stringArray = string.split(',').map((credit) => `- ${credit.trim()}`)
        return credits = `## Credits\n${stringArray.join('\n')}`;
    }
    creditsTest(data)
    console.log(credits);
    // License

    // Features
    function featuresTest(data) {
        let string = data.features;
        if (string === '') {
            return features = ''
        }
        stringArray = string.split(',').map((feature) => `- ${feature.trim()}`)
        return features = `## Features\n${stringArray.join('\n')}`;
    }
    featuresTest(data)

    // Tests
    function testsTest(data) {
        let string = data.tests;
        if (string === '') {
            return tests = ''
        }
        stringArray = string.split(',').map((test) => `- ${test.trim()}`)
        return tests = `## Tests\n${stringArray.join('\n')}`;
    }
    testsTest(data);

    const content = `${title}\n\n${description}\n\n${installation}\n\n${usage}\n\n${credits}\n\n${features}\n\n${tests}`
    console.log(content)
    fs.writeFile(fileName, content)

}

// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((data) => writeToFile(fileName, data));
}

// Function call to initialize app
init();