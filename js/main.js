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
			answer = answer.toFixed(1);
		} else {
			answer = answer.toFixed(4);
		}
	}
	area.a = [answer];
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
		area.o = varr;

		smallDisplay.textContent = ans + ' ' + varr + ' ';
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
		smallDisplay.textContent += varr;

		return;
	}
}

function stageAnswer(varr) {
	if (area.a.length < 1) return;

	if (area.a.length > 0 && area.b.length > 0) {
		let ans = getAns();

		largeDisplay.textContent = ans;
		smallDisplay.textContent = '';
	}
}

/*
	=============================================================================
	=============================================================================
*/

const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const equalTo = document.querySelector('#equal');

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
