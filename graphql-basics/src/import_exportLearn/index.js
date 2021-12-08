import myCurrentLocation, { message, getGreeting, name } from "./import_export";
import ongeza, { subtraction } from './math'

console.log(message, name, myCurrentLocation);
console.log(getGreeting('Antoan'))
const a = 10
const b = 7
console.log(`\nAddition: ${ongeza(a, b)} \nSubtraction: ${subtraction(a, b)}`);
