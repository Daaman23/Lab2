const sCalculation = (method, x, y) => {
  switch (method.toLowerCase()) {
    case 'addition':
      return { operation: '+', result: x + y };
    case 'subtraction':
      return { operation: '-', result: x - y };
    case 'multiplication':
      return { operation: 'x', result: x * y };
    case 'division':
      return { operation: '/', result: x / y };
    default:
      return 'This is not a valid option';
  }
};

const validOptions = ['addition', 'subtraction', 'multiplication', 'division'];

const sCalculatorRoute = (request, response) => {
  request.query.x = parseInt(request.query.x); // Parsing the string value of x into an integer
  request.query.y = parseInt(request.query.y); // Parsing the string value of y into an integer

  const { method, x, y } = request.query; 

  // if y and x is Not a Number - tell them it has to be a number
  if (isNaN(y) || isNaN(x)) {
    return response.send('X and Y must be a number');
  }

  // If method is not in our valid options - tell them it has to be and display them
  if (!validOptions.includes(method.toLowerCase())) {
    return response.send(
      `It must include one of the following: ${validOptions.join(', ')}`
    );
  }

  // Get Operation and Result from simple calculate function
  const { operation, result } = sCalculation(method, x, y);

  response.send(`${x} ${operation} ${y} = ${result}`); // Print out value of calculation
};

module.exports = sCalculatorRoute; // Export out function
