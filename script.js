// Get the HTML elements
const mathProblemInput = document.getElementById('mathProblem');
const resultText = document.getElementById('resultText');
const solutionText = document.getElementById('solutionText');
const solveButton = document.getElementById('solveButton');
const resetButton = document.getElementById('resetButton');
const degreeRadio = document.getElementById('degree');
const radianRadio = document.getElementById('radian');
const toggleModeButton = document.getElementById('toggleMode');
const aInput = document.getElementById('a');
const bInput = document.getElementById('b');
const cInput = document.getElementById('c');
const solveQuadraticButton = document.getElementById('solveQuadraticButton');
const resetQuadraticButton = document.getElementById('resetQuadraticButton');
const normalCalcRadio = document.getElementById('normalCalc');
const quadraticCalcRadio = document.getElementById('quadraticCalc');
const normalCalcForm = document.getElementById('normalCalcForm');
const quadraticCalcForm = document.getElementById('quadraticCalcForm');

// Your Gemini API key (replace with your actual API key)
const GEMINI_API_KEY = 'AIzaSyA5n98OUCvdGpfpO8IFQyoY5TxZON860ew';  // Replace with your actual Gemini API key

// Function to evaluate math expressions
function evaluateMathExpression(expression, isDegree) {
    try {
        // Handling percentage expressions: "50% of 100" => "100 * (50 / 100)"
        expression = expression.replace(/(\d+)%\s*of\s*(\d+)/g, function(_, percentage, number) {
            return `${number} * (${percentage} / 100)`;
        });

        // Using Math object to handle advanced mathematical functions
        expression = expression.replace(/sin\(([^)]+)\)/g, function(_, angle) {
            return `Math.sin(${isDegree ? angle + ' * (Math.PI / 180)' : angle})`;
        }).replace(/cos\(([^)]+)\)/g, function(_, angle) {
            return `Math.cos(${isDegree ? angle + ' * (Math.PI / 180)' : angle})`;
        }).replace(/tan\(([^)]+)\)/g, function(_, angle) {
            return `Math.tan(${isDegree ? angle + ' * (Math.PI / 180)' : angle})`;
        }).replace(/log/g, "Math.log")
          .replace(/sqrt/g, "Math.sqrt")
          .replace(/abs/g, "Math.abs")
          .replace(/pi/g, "Math.PI")
          .replace(/e/g, "Math.E")
          .replace(/pow\((\d+), (\d+)\)/g, "Math.pow($1, $2)");

        const steps = [];
        steps.push(`Original expression: ${expression}`);

        const result = eval(expression); // Use eval to calculate the result
        steps.push(`Evaluated result: ${result}`);

        return { result, steps };
    } catch (error) {
        // Handle any errors in math expression evaluation
        return { result: "Error: Invalid expression", steps: [] };
    }
}

// Function to fetch market data from Gemini (example BTC/USD)
async function fetchGeminiMarketData() {
    const url = 'https://api.gemini.com/v1/pubticker/btcusd'; // Example: BTC/USD market data
    const headers = {
        'Content-Type': 'application/json',
        'X-GEMINI-APIKEY': GEMINI_API_KEY
    };

    try {
        const response = await fetch(url, { headers: headers });
        const data = await response.json();

        if (data && data.last) {
            return data.last; // Return the last traded price for BTC/USD
        } else {
            throw new Error('Error fetching Gemini market data');
        }
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// Function to handle the math problem and fetch Gemini market data if needed
async function handleMathProblem() {
    const mathProblem = mathProblemInput.value.trim();
    solutionText.innerHTML = ''; // Clear previous solutions

    if (mathProblem === "") {
        resultText.textContent = "Please enter a math problem.";
        return;
    }

    // Check if the problem involves Gemini (for example: "BTC to USD")
    if (mathProblem.toLowerCase().includes("btc")) {
        // If the problem involves BTC, fetch the current market data from Gemini
        const btcPrice = await fetchGeminiMarketData();

        if (btcPrice) {
            const amountBtc = parseFloat(mathProblem.split(' ')[0]); // Extract the amount from the input
            if (isNaN(amountBtc)) {
                resultText.textContent = "Invalid amount for BTC.";
            } else {
                const result = amountBtc * parseFloat(btcPrice);
                resultText.textContent = `${amountBtc} BTC is equal to $${result.toFixed(2)} USD at the current price.`;
                solutionText.innerHTML = `
                    <p>Solution: Multiply the amount of BTC by the current price of 1 BTC.</p>
                    <p>${amountBtc} BTC * ${btcPrice} USD = ${result.toFixed(2)} USD.</p>
                `;
            }
        } else {
            resultText.textContent = "Could not fetch the latest BTC price.";
        }
    } else {
        // If it's a regular math expression, evaluate it
        const isDegree = degreeRadio.checked;
        const { result, steps } = evaluateMathExpression(mathProblem, isDegree);
        resultText.textContent = `Result: ${result}`;

        // Provide a detailed solution
        solutionText.innerHTML = `
            <p>Solution: Performing the following operations:</p>
            ${steps.map(step => `<p>${step}</p>`).join('')}
        `;
    }
}

// Function to solve quadratic equations
function solveQuadraticEquation(a, b, c) {
    const discriminant = b * b - 4 * a * c;
    const steps = [];
    steps.push(`Discriminant: ${discriminant}`);

    if (discriminant > 0) {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        steps.push(`Root 1: ${root1}`);
        steps.push(`Root 2: ${root2}`);
        return { result: `Roots are ${root1} and ${root2}`, steps };
    } else if (discriminant === 0) {
        const root = -b / (2 * a);
        steps.push(`Root: ${root}`);
        return { result: `Root is ${root}`, steps };
    } else {
        return { result: "No real roots", steps };
    }
}

// Function to handle the quadratic equation
function handleQuadraticEquation() {
    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);
    const c = parseFloat(cInput.value);
    const quadraticSolutionText = document.getElementById('quadraticSolutionText');
    quadraticSolutionText.innerHTML = ''; // Clear previous solutions

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        document.getElementById('quadraticResultText').textContent = "Please enter valid coefficients.";
        return;
    }

    const { result, steps } = solveQuadraticEquation(a, b, c);
    document.getElementById('quadraticResultText').textContent = `Result: ${result}`;

    // Provide a detailed solution
    quadraticSolutionText.innerHTML = `
        <p>Solution: Performing the following operations:</p>
        ${steps.map(step => `<p>${step}</p>`).join('')}
    `;
}

// Function to toggle between normal calculation and quadratic equation forms
function toggleCalcType() {
    if (normalCalcRadio.checked) {
        normalCalcForm.style.display = 'block';
        quadraticCalcForm.style.display = 'none';
    } else if (quadraticCalcRadio.checked) {
        normalCalcForm.style.display = 'none';
        quadraticCalcForm.style.display = 'block';
    }
}

// Function to reset the normal calculation form
function resetNormalCalcForm() {
    mathProblemInput.value = '';
    resultText.textContent = '';
    solutionText.innerHTML = '';
    degreeRadio.checked = true;
}

// Function to reset the quadratic calculation form
function resetQuadraticCalcForm() {
    aInput.value = '';
    bInput.value = '';
    cInput.value = '';
    document.getElementById('quadraticResultText').textContent = '';
    document.getElementById('quadraticSolutionText').innerHTML = '';
}

// Event listener for when the "Solve" button is clicked
solveButton.addEventListener('click', handleMathProblem);

// Event listener for when the "Solve Quadratic" button is clicked
solveQuadraticButton.addEventListener('click', handleQuadraticEquation);

// Event listener for toggling calculation type
normalCalcRadio.addEventListener('change', toggleCalcType);
quadraticCalcRadio.addEventListener('change', toggleCalcType);

// Event listener for resetting the normal calculation form
resetButton.addEventListener('click', resetNormalCalcForm);

// Event listener for resetting the quadratic calculation form
resetQuadraticButton.addEventListener('click', resetQuadraticCalcForm);

// Optional: Allow pressing "Enter" to trigger the calculation
mathProblemInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        handleMathProblem();
    }
});

// Toggle light/dark mode
toggleModeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

// Set initial mode
document.body.classList.add('light-mode');

// Set initial calculation type
toggleCalcType();