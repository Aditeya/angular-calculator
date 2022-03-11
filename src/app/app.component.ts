import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'angular-calculator';
	keys = [
		{ id: "equals", value: "=" },
		{ id: "add", value: "+" },
		{ id: "subtract", value: "-" },
		{ id: "multiply", value: "*" },
		{ id: "divide", value: "/" },
		{ id: "decimal", value: "." },
		{ id: "clear", value: "AC" },
		{ id: "zero", value: "0" },
		{ id: "one", value: "1" },
		{ id: "two", value: "2" },
		{ id: "three", value: "3" },
		{ id: "four", value: "4" },
		{ id: "five", value: "5" },
		{ id: "six", value: "6" },
		{ id: "seven", value: "7" },
		{ id: "eight", value: "8" },
		{ id: "nine", value: "9" }
	];

	inputFormula: string[] = [];
	display: string = "0";
	
	iterateNegatives(fArr: string[]) {
		for (let i = 0; i < fArr.length - 2; i++) {
			if (fArr[i] == "*" || fArr[i] == "/") {
				if (fArr[i + 1] == "-") {
					fArr.splice(i + 1, 2, fArr[i + 1] + fArr[i + 2]);
				}
			}
		}
		return fArr;
	}
	
	iterateOp(op: string, fArr: string[]) {
		for (let i = fArr.indexOf(op); i >= 0; i = fArr.indexOf(op)) {
			let n = this.performOp(fArr[i - 1], op, fArr[i + 1]);
			fArr.splice(i - 1, 3, n.toString()); //0 to i-1 + i+1 length
		}
		return fArr;
	}
	
	performOp(num1: string, op: string, num2: string): number {
		let number = 0;
		switch (op) {
			case "+":
				number = Number(num1) + Number(num2);
				break;
			case "-":
				number = Number(num1) - Number(num2);
				break;
			case "*":
				number = Number(num1) * Number(num2);
				break;
			case "/":
				number = Number(num1) / Number(num2);
		}
		return number;
	}
	
	insertNumber(number: string) {
		if (number === "0" && this.display === "0") return;
		
		let fArr = [...this.inputFormula];
		let n;

		if (/^(\+|-|\*|\/)$/.test(this.display)) n = number;
		else {
			n = this.display.concat(number);
			fArr.pop();
		}

		let regex = /^\d+$/;
		if (regex.test(n)) {
			n = "" + Number(n);
		}

		fArr.push(n);

		this.inputFormula = fArr,
		this.display = n
	}
	insertOp(op: string) {
		if (this.inputFormula.length === 0) return;
		
		let fArr;
		if (this.inputFormula.indexOf("=") != -1) fArr = [this.display];
		else {
			fArr = [...this.inputFormula];
			if (/^(\+|-|\*|\/)$/.test(fArr[fArr.length - 1]) && op != "-") {
				fArr.pop();
				if (/^(\+|-|\*|\/)$/.test(fArr[fArr.length - 1])) fArr.pop();
			}
		}

		fArr.push(op);
		this.inputFormula = fArr;
		this.display = op ;
	}
	insertDecimalPoint(value: string) {
		if (this.display.includes(".")) return;
		this.display = this.display.concat(value)
	}

	
	onEvent(value: string) {
		switch (value) {
			case "AC":
				this.inputFormula = [];
				this.display = "0";
				break;
			case "=":
				if (this.inputFormula.indexOf("=") != -1 || this.inputFormula.length == 0) break;
				let fArr = this.iterateNegatives([...this.inputFormula]);
				fArr = this.iterateOp("*", fArr);
				fArr = this.iterateOp("/", fArr);
				fArr = this.iterateOp("-", fArr);
				fArr = this.iterateOp("+", fArr);
				this.inputFormula = [...this.inputFormula, "=", fArr[0]];
				this.display = fArr[0];
				break;
			case "*": case "/": case "+": case "-": 
				this.insertOp(value);
				break;
			case "0":
				//if (this.display === "0") break;
			case "1": case "2": case "3":
			case "4": case "5": case "6":
			case "7": case "8": case "9":
				this.insertNumber(value);
				break;
			case ".":
				//if (this.display.includes(".")) break;
				this.insertDecimalPoint(value);
				break;
			default:
				this.display = this.display.concat(value)
		}
	}
}
