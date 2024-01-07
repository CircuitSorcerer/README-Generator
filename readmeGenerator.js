const inquirer = require('inquirer');
const fs = require('fs');

const fileName = 'README.md'
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
        message: 'What is your Github username?',
        name: 'user',
    },

    {
        type: 'input',
        message: 'Enter Links, separate with commas.',
        name: 'links',
    },

    {
        type: 'list',
        message: 'Screenshot?',
        name: 'screenshot',
        choices: ['Yes', 'No'],
    }

    //contents
];

function generateReadmeContent(data) {
    let components = [];

    // Title
    if (data.title !== '') {
        title = `# ${data.title}`
    } else {
        title = `# Project Title`
    }
    components.push(title);

    // Description
    let description = `## Description\n`;
    if (data.description !== '') {
        description += `${data.description}`;
    } else {
        description += `No Description Avaialable`;
    }
    components.push(description);

    // Image
    if (data.screenshot === 'No') {
        image = "";
    } else {
        image = "## Page Screenshot\n![Screenshot](./assets/images/screenshot.png)";
        components.push(image);
    }

    // Installation
    if (data.installation !== '') {
        installation = `## Installation\n${data.installation}`;
        components.push(installation);
    }

    // Usage
    if (data.usage !== '') {
        usage = `## Usage\n${data.usage}`
        components.push(usage);
    }
    

    // Credits
    let credits = '';
    let string = data.credits;
    if (string !== '') {
        stringArray = string.split(',').map((credit) => `- ${credit.trim()}`)
        credits = `## Credits\n${stringArray.join('\n')}`;
        components.push(credits);
    }
    
    // License

    // Features
    let features = ''
    string = data.features;
    if (string !== '') {
        stringArray = string.split(',').map((feature) => `- ${feature.trim()}`)
        features = `## Features\n${stringArray.join('\n')}`;
        components.push(features);
    }

    //Github User
    let user = ''
        if (data.user !== '') {
            user = `## [${data.user}](https://github.com/${data.user})`;
            components.push(user);
        }
        
    
    // Tests
    let tests = ''
    string = data.tests;
    if (string !== '') {
        stringArray = string.split(',').map((test) => `- ${test.trim()}`)
        tests = `## Tests\n${stringArray.join('\n')}`;
        components.push(tests)
    }

    return components.join('\n\n');
};

function writeToFile(fileName, content) {
    fs.writeFile(fileName, content, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`README successfully generated and saved to ${fileName}`);
      }
    });
};

function init() {
    inquirer
        .prompt(questions)
        .then((data) => {
            const readmeContent = generateReadmeContent(data);
            writeToFile(fileName, readmeContent);
        });
};

module.exports = {
    generateReadmeContent,
    writeToFile,
    init,
};