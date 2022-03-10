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

  onEvent(value: string) {
    console.log(value);
  }
}
