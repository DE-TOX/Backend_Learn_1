const { log } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.set('view engine' ,'ejs')

let history = [];

// Load existing history from file
try {
  const data = fs.readFileSync(path.join(__dirname, 'history.json'), 'utf8');
  history = JSON.parse(data);
} catch (err) {
  console.log('No existing history found.');
}

// Save history to a file
const saveHistory = () => {
    fs.readFile('history.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      
        // Parse the JSON data
        const jsonData = JSON.parse(data);
      
        // Filter out objects with null values
        const filteredData = jsonData.filter(item => item.question !== null && item.answer !== null);
      
        // Write the filtered data back to the JSON file
        fs.writeFile('history.json', JSON.stringify(filteredData), 'utf8', err => {
          if (err) {
            console.error(err);
            return;
          }
      
          console.log('Successfully removed null values from history.json');
        });
      });

  fs.writeFileSync(path.join(__dirname, 'history.json'), JSON.stringify(history));
};

// Home endpoint
app.get('/', (req, res) => {
  res.render('pages/home');
});

// History endpoint
app.get('/history', (req, res) => {
  fs.readFile('history.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const jsonData = JSON.parse(data);
    

    res.render('pages/history', { jsonData });
 
  });



});

// Math operations endpoint

app.get('/*', (req, res) => {
    const tokens = req.params[0].split('/');
    const precedence = {
      'plus': 1,
      'minus': 1,
      'into': 2,
      'divide': 2,
    };
  
    const performOperation = (op1, op2, operator) => {
      switch (operator.toLowerCase()) {
        case 'plus':
          return op1 + op2;
        case 'minus':
          return op1 - op2;
        case 'into':
          return op1 * op2;
        case 'divide':
          if (op2 === 0) {
            throw new Error('Division by zero');
          }
          return op1 / op2;
        default:
          throw new Error('Invalid operation');
      }
    };
  
    const applyPrecedence = (operands, operators) => {
      while (operators.length > 0) {
        let index = 0;
        let maxPrecedence = -1;
  
        for (let i = 0; i < operators.length; i++) {
          if (precedence[operators[i]] > maxPrecedence) {
            maxPrecedence = precedence[operators[i]];
            index = i;
          }
        }
  
        const result = performOperation(operands[index], operands[index + 1], operators[index]);
        operands.splice(index, 2, result);
        operators.splice(index, 1);
      }
      return operands[0];
    };
  
    try {
      const operands = [];
      const operators = [];
      let expression = '';
  
      for (let i = 0; i < tokens.length; i++) {
        if (i % 2 === 0) {
          operands.push(parseFloat(tokens[i]));
          expression += tokens[i];
        } else {
          operators.push(tokens[i]);
          if(tokens[i] === "minus"){
            tokens[i] = "-"
          }if(tokens[i] === "plus"){
            tokens[i] = "+"
          }if(tokens[i] === "into"){
            tokens[i] = "*"
          }if(tokens[i] === "divide"){
            tokens[i] = "/"
          }
          expression += ' ' + tokens[i] + ' ';
        }
      }
  
      const answer = applyPrecedence(operands, operators);
      expression = expression.trim(); 
      const question = req.params[0];
  
      const operationData = {
        question,
        expression,
        answer,
      };
  
      history.unshift(operationData);
  
      if (history.length > 20) {
        history.pop();
      }
  
      saveHistory();
  
      res.render('pages/answer',{ json : operationData});
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
});

  
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
