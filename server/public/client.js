$(onReady)

function onReady() {
    console.log('jquery and js working properly');
    $('#equals').on('click', handleClick);
    $('#plus').on('click', makePlus);
    $('#minus').on('click', makeMinus);
    $('#multiply').on('click', makeMultiply);
    $('#divide').on('click', makeDivide);
    $('#clear').on('click', clearInputs);

    getExpressions();

}
let operator = '';

function getExpressions() {
    $.ajax({
        method: 'GET',
        url: '/history'
    }).then(function (response) {
        console.log(response);
        render(response);
    }).catch(function(error) {
        console.log(error);
        alert('ERROR IN GET /history');
        });
}

function handleClick() {
    const newExpression = {
    numOne: $('#numOne').val(),
    numTwo: $('#numTwo').val(),
    operator: operator,
    result: 0
    }
    console.log(newExpression);
    operator = '';

    $.ajax( {
        url: '/history',
        method: 'POST',
        data: newExpression
    }).then(function(response) {
        console.log(response);
        getExpressions();
    })
}

function makePlus() {
    operator = '+';
    console.log('operator should be +', operator);
}
function makeMinus() {
    operator = '-';
    console.log('operator should be -', operator);

}
function makeMultiply()  {
    operator = '*'
    console.log('operator should be *', operator);
}
function makeDivide() {
    operator = '/';
    console.log('operator should be /', operator);
}
function clearInputs() {
    $('#numOne').val('');
    $('#numTwo').val('');
    operator = '';
}

function render(expressionList) {
    //Step C1: create render function to be able to show on the DOM
    // Empty old container for the players
    $('.history-container').empty();

    for(let i= 0; i < expressionList.length; i++) {
        let currentExpression = expressionList[i];
        $('.history-container').append(`<li>${currentExpression.numOne} ${currentExpression.operator} ${currentExpression.numTwo} = ${currentExpression.result}</li>`);
    }

}

