const express = require('express');
const expression = require('./modules/expressions');
const bodyParser = require('body-parser');

//testing
// const expressionResult = {
//     numOne: req.body.numOne,
//     numTwo: req.body.numTwo,
//     operator: req.body.result,
//     result: doMath()
// }

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/history', (req, res) => {
    res.send(expression);
})

// where the magic happens. Add anything needed inside the code block. 
// where stuff gets sent back from!!!!!
app.post('/history', (req, res) => {
    console.log('POST /history', req.body);
    switch(req.body.operator) {
        case '+':
            result = req.body.numOne + req.body.numTwo;
            break;
        case '-':
            result = req.body.numOne - req.body.numTwo;
            break;
        case '*':
            result = req.body.numOne * req.body.numTwo;
            break;
        case '/':
            result = req.body.numOne / req.body.numTwo;
    }
    // research this!!!!
    req.body.result = Number(result);
    console.log('doMath function test', result);

    expression.push(req.body);
    res.sendStatus(201);
})
let result = 0;
//Switch for the math operator





// Listener at the end of the document
app.listen(PORT, () => {
    console.log('MINER SAYS, LISTENING ON PORT', PORT);
})