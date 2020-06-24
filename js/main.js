/*
    the arithimetic functions
*/

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	if (b === 0) return 'Math Error';
	return a / b;
}

function factorial(a) {
	if (a == 0) return 1;

	let arr = [];

	for (let i = 1; i <= a; i++) {
		arr.push(i);
	}

	return arr.reduce((fact, x) => {
		return fact * x;
	}, 1);
}

function toPercentage(a) {
	return a / 100;
}

function operate(operator, a, b) {
	if (isNaN(a) || isNaN(b)) return 'Syntax Error';
	switch (operator) {
		case '+':
			return add(a, b);
			break;
		case '-':
			return subtract(a, b);
			break;
		case 'x':
			return multiply(a, b);
			break;
		case '÷':
			return divide(a, b);
	}
}

/*
    ==========================================================================================
    ==========================================================================================
*/

const area = {
	a: [],
	o: null,
	b: [],
	ans() {
		return operate(this.o, +this.a.join(''), +this.b.join(''));
	},
};

function getAns() {
	let answer = area.ans();
	if (typeof answer === 'number' && !Number.isInteger(answer)) {
		let ansArr = answer.toString().split('');

		let index = ansArr.indexOf('.') + 1;

		let tempArr = [];

		for (let i = index; i < ansArr; i++) {
			tempArr.push(ansArr[i]);
		}

		let every = tempArr.every((x) => x > 0);

		if (every) {
			answer = answer.toFixed(2);
		} else {
			answer = answer.toFixed(4);
		}
	}
	answer = answer.toString();
	answer = answer.split('');
	area.a = answer;
	area.b = [];
	area.o = null;
	return answer;
}

function stageDisplayOperator(varr) {
	if (area.b.length < 1) {
		if (area.a.length > 0) {
			if (area.o !== null && varr == '-') {
				area.b.push(varr);
				smallDisplay.textContent += area.b.join('');

				return;
			}
		}
	}

	if (area.a.length > 0 && area.b.length < 1) {
		if (area.o != null) {
			return;
		}

		if (varr === '*') varr = 'x';
		if (varr === '/') varr = '÷';
		area.o = varr;
		smallDisplay.textContent = area.a.join('') + ' ' + varr + ' ';
		largeDisplay.textContent = 0;

		return 1;
	}

	if (area.a.length < 1) {
		if (varr === '-') {
			area.a.push(varr);
			smallDisplay.textContent = area.a.join('');
		}
		return 2;
	}

	if (area.a.length > 0 && area.b.length > 0) {
		let ans = getAns();

		if (varr === '*') varr = 'x';
		if (varr === '/') varr = '÷';

		area.o = varr;

		smallDisplay.textContent = ans.join('') + ' ' + varr + ' ';
		largeDisplay.textContent = 0;

		return 3;
	}
}

function stageDisplayNumber(varr) {
	if (area.o !== null) {
		if (varr === '.' && area.b.includes(varr)) return;

		area.b.push(varr);
		smallDisplay.textContent += varr;

		return;
	}

	if (area.o === null) {
		if (varr === '.' && area.a.includes(varr)) return;

		area.a.push(varr);

		if (largeDisplay.textContent == '0') {
			return (smallDisplay.textContent += varr);
		}

		smallDisplay.textContent += largeDisplay.textContent + varr;
		largeDisplay.textContent = '0';

		return;
	}
}

function stageAnswer() {
	if (area.a.length < 1) return;

	if (area.a.length > 0 && area.b.length > 0) {
		let ans = getAns();

		largeDisplay.textContent = ans.join('');
		smallDisplay.textContent = '';
	}
}

function wipe() {
	area.a = [];
	area.o = null;
	area.b = [];

	smallDisplay.textContent = '';
	largeDisplay.textContent = '0';
}

function bks() {
	if (smallDisplay.textContent !== '') {
		if (area.b.length > 0) {
			area.b.pop();
			smallDisplay.textContent = `${area.a.join('')} ${area.o} ${area.b.join(
				'',
			)}`;
			return;
		}

		if (area.o !== null) {
			area.o = null;
			smallDisplay.textContent = `${area.a.join('')} `;
			return 'osheey!';
		}

		if (area.a.length > 0) {
			area.a.pop();
			smallDisplay.textContent = area.a.join('');
			return 'mad ooo!';
		}
	}

	if (largeDisplay.textContent != '0' && area.a.length > 0) {
		area.a.pop();
		largeDisplay.textContent = area.a.join('');
		if (area.a.length < 1) largeDisplay.textContent = '0';
	}
}

function getPercent() {
	if (area.b.length > 0 && area.o !== null) return;

	if (area.a.length > 0) {
		let percent = toPercentage(area.a.join(''));

		percent = percent.toString();
		percent = percent.split('');
		area.a = percent;

		smallDisplay.textContent = '';
		largeDisplay.textContent = area.a.join('');
		return 'yippe';
	}
}

function getFactorial() {
	if (area.b.length > 0 && area.o !== null) return;

	if (area.a.length > 0) {
		let fact = factorial(area.a.join(''));

		fact = fact.toString();
		fact = fact.split('');
		area.a = fact;

		smallDisplay.textContent = '';
		largeDisplay.textContent = area.a.join('');
	}
}

/*
	=============================================================================
	=============================================================================
*/

const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const equalTo = document.querySelector('#equal');

const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('backspace');

const percentButton = document.getElementById('percentage');
const factButton = document.getElementById('factorial');

const largeDisplay = document.querySelector('.large-display');
const smallDisplay = document.querySelector('.small-display');

let number = numbers.forEach((num) =>
	num.addEventListener('click', () => {
		stageDisplayNumber(num.textContent);
	}),
);

let operator = operators.forEach((ope) =>
	ope.addEventListener('click', () => {
		stageDisplayOperator(ope.textContent);
	}),
);

let equals = equalTo.addEventListener('click', (e) =>
	stageAnswer(e.target.textContent),
);

clearButton.addEventListener('click', () => wipe());

deleteButton.addEventListener('click', () => bks());

percentButton.addEventListener('click', () => getPercent());

factButton.addEventListener('click', () => getFactorial());

/*
	========================================================================

	KEYBOARD SUPPORT UNIT

	========================================================================
*/

document.addEventListener('keydown', (e) => {
	let digitRegex = /^[0-9]/;
	let dotRegex = /\./
	let operatorRegex = /[\+\*-/]/g;
	let equalRegex = /[=enter]/ig;

	let clearRegex = /^c$/i;
	let deleteRegex = /backspace/i;

	let factRegex = /!/g;
	let percentRegex = /%/g;

	if (dotRegex.test(e.key)) return stageDisplayNumber(e.key)
	if (digitRegex.test(e.key)) return stageDisplayNumber(e.key);
	if (operatorRegex.test(e.key)) return stageDisplayOperator(e.key);
	if (deleteRegex.test(e.key)) return bks();
	if (clearRegex.test(e.key)) return wipe();
	if (factRegex.test(e.key)) return getFactorial();
	if (percentRegex.test(e.key)) return getPercent();
	if (equalRegex.test(e.key)) return stageAnswer();

});
