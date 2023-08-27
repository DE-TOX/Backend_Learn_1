# Kalvium-Task-Submission
Divyansh Joshi (RA2011003011138) Backend Task Submission 

## This is a simple server that performs mathematical operations based on the provided URL and maintains a history of the last 20 operations performed.



Before you begin, ensure you have the following installed:

Node.js (version 18 or higher)
npm (usually comes with Node.js installation)
Installation
Clone this repository to your local machine using:

```
git clone https://github.com/DE-TOX/Kalvium-Task-Submission.git
```
Navigate to the project directory:

```
cd Kalvium-Task-Submission
```
Install the required dependencies:

```
npm install
```
Usage
Start the server by running:
```
node index.js
```
The server will start and listen on http://localhost:3000.

Available Operators
You can perform mathematical operations using the following URL structure:

```
/operand/operator/operand/operator/operand/...
```
Supported operators:

### plus: Addition (+)
### minus: Subtraction (-)
### into: Multiplication (*)
### divide: Division (/)
For example:

/5/plus/3 will return { "question": "5+3", "answer": 8 }.
/3/minus/5 will return { "question": "3-5", "answer": -2 }.
/3/minus/5/plus/8 will return { "question": "3-5+8", "answer": 6 }.
/3/into/5/plus/8/into/6 will return { "question": "3*5+8*6", "answer": 63 }.
### /history
To view the history of the last 20 operations performed on the server, access the following endpoint:

```
/history
```
This will display a list of operations and their corresponding answers.

Endpoints
/ Lists available endpoint samples.
/home: Index page.
/history: Lists the last 20 operations performed on the server.
/* : Any other endpoint following the mathematical operation pattern.

<!--Contributing
Contributions are welcome! If you find any issues or have suggestions, feel free to create a pull request or submit an issue in the GitHub repository.
 -->


