import { Observable, Observer } from 'rxjs';

let numbers = [1, 5, 10, 20]; 
let source = Observable.from(numbers);

class MyObserver implements Observer<number> {
    next(value) {
        console.log(`Value : ${value}`); 
    }
    
    error(e) {
        console.log(`error: ${e}`); 
    }

    complete() {
        console.log(`Complete`); 
    }
}

source.subscribe(new MyObserver());
source.subscribe(new MyObserver());