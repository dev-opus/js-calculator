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
	area.a = [answer];
	area.b = [];
	area.o = null;
	return answer;
}

function stageOperator(varr) {
	if (area.a.length > 0 && area.b.length < 1) {
		area.o = varr;
		return 1;
	}
	if (area.a.length < 1) {
		console.log('no first number');
		return 2;
	}
	if (area.a.length > 0 && area.b.length > 0) {
		getAns();
		area.o = varr;
		return 3;
	}
}

function stageNumber(varr) {
	if (area.o !== null) {
		if (varr === '.' && area.b.includes(varr)) {
			return;
		}
		area.b.push(varr);
		return;
	}
	if (area.o === null) {
		if (varr === '.' && area.a.includes(varr)) {
			return;
		}
		area.a.push(varr);
		return;
	}
}

function stageAnswer(varr) {
	if (area.a.length < 1) return;

	if (area.a.length > 0 && area.b.length > 0) {
		return getAns();
	}
}

/*
	=============================================================================
	=============================================================================
*/

const numbers = Array.from(document.querySelectorAll('.number'));
const operators = Array.from(document.querySelectorAll('.operator'));
const equalTo = document.querySelector('#equal');

let number = numbers.forEach((num) =>
	num.addEventListener('click', () => stageNumber(num.textContent)),
);

let operator = operators.forEach((ope) =>
	ope.addEventListener('click', () => stageOperator(ope.textContent)),
);

let equals = equalTo.addEventListener('click', (e) =>
	stageAnswer(e.target.textContent),
);
