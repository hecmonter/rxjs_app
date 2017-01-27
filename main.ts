import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

let numbers: number[] = [1, 5, 10, 20]; 
let source: Observable<any>;

source = Observable.create((observer: Observer<number>) => {
    let index = 0;
    let produceValue = () => {
        observer.next(numbers[index++]);
        if(index < numbers.length){
            setTimeout(produceValue, 500);
        } else {
            observer.complete();
        }
    }; 
    produceValue();
    
})
.map(n => n * 2)
.filter(m => m > 4);

source.subscribe(
    value => console.log(`Value : ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log(`complete`)
);