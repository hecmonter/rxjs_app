import { Observable } from 'rxjs';

let numbers = [1, 5, 10, 20]; 
let source = Observable.from(numbers);

source.subscribe(
    value => console.log(`Value : ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log(`complete`)
);