//Zadanie pierwsze

const first = "Hello";
const second = "World";

console.log(`${first} ${second}`)


//Zadanie drugie

const multiply = (x, y = 1) => {return x * y};

console.log(multiply(3, 7));
console.log(multiply(6));

//Zadanie trzecie

/*const average = (...args) => {
 let result = 0;
 args.forEach(arg => result += arg);
return result / args.length;
}


console.log(average(1)); // 1
console.log(average(1, 3)); // 2
console.log(average(1, 3, 5, 6)); // 3.75 */

//Zadanie czwarte

const average = (...args) => {
 let result = 0;
 args.forEach(arg => result += arg);
return result / args.length;
}

const grades = [1, 5, 5, 5, 4, 3, 3, 2, 1];

console.log(average(...grades));

//Zadanie piąte

const array = [1, 4, 'Iwona', false, 'Nowak'];
const [, , firstName, , secondName] = array;

console.log(firstName);
console.log(secondName);
console.log(`${firstName} ${secondName}`);