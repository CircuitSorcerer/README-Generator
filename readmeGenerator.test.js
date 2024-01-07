const fs = require('fs');
const inquirer = require('inquirer');
const { generateReadmeContent, writeToFile, init } = require('./readmeGenerator');

jest.mock('inquirer');

describe('README Generator', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
      });

    describe('generateReadmeContent', () => {
        it('should generate README content with all sections filled', () => {
            const testData = {
                title: 'Test Project',
                description: 'This is a test project.',
                installation: 'npm install',
                usage: 'node index.js',
                credits: 'John Doe, Jane Smith',
                license: 'MIT',
                features: 'Feature 1, Feature 2',
                tests: 'Test 1, Test 2',
                user: 'testuser',
                links: 'https://example.com',
                screenshot: 'Yes',
            };
    
            const result = generateReadmeContent(testData);
    
            expect(result).toContain('# Test Project');
            expect(result).toContain('## Description\nThis is a test project.');
            expect(result).toContain('## Installation\nnpm install');
            // Add more expectations for other sections
        });

        it('should handle missing or empty sections', () => {
            const testData = {
                title: '',
                description: '',
                installation: '',
                usage: '',
                credits: '',
                license: '',
                features: '',
                tests: '',
                user: '',
                links: '',
                screenshot: 'No',
            };
      
            const result = generateReadmeContent(testData);
      
            expect(result).toContain('# Project Title');
            expect(result).toContain('## Description\nNo Description Avaialable');
        });
    });

    describe('writeToFile', () => {
        it('should write to a file successfully', () => {
            const fileName = 'testREADME.md';
            const content = '# Test Project\n\nThis is a test project.';
    
            // Mock the fs.writeFile function
            const writeFileMock = jest.spyOn(fs, 'writeFile').mockImplementation((path, data, callback) => {
                expect(path).toBe(fileName);
                expect(data).toBe(content);
                callback(); // Call the callback to simulate the completion of the writeFile operation
            });
    
            writeToFile(fileName, content);
    
            // Ensure that the writeFile function was called with the correct arguments
            expect(writeFileMock).toHaveBeenCalled();
    
            // Restore the original implementation of fs.writeFile
            writeFileMock.mockRestore();
        });
    
        it('should handle errors when writing to a file', () => {
            const fileName = 'nonexistent/testREADME.md';
            const content = '# Test Project\n\nThis is a test project.';
    
            // Mock the fs.writeFile function to simulate an error
            jest.spyOn(fs, 'writeFile').mockImplementation((path, data, callback) => {
                callback(new Error('File not found'));
            });
    
            const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    
          writeToFile(fileName, content);
    
          // Ensure that the error message is logged to the console
          expect(consoleErrorMock.mock.calls[0][0].message).toContain(`File not found`);
    
          // Restore the original implementation of fs.writeFile and console.error
          jest.restoreAllMocks();
        });
    });
});


    

