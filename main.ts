import { Observable } from 'rxjs';
// import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

let numbers: number[] = [1, 5, 10, 20]; 
let source: Observable<any>;
let circle = document.getElementById('circle');

source = Observable.fromEvent(document, 'mousemove')
                    .map((e: MouseEvent) => {
                            return {
                                x: e.clientX,
                                y: e.clientY
                            }
                    })
                    .filter(value => value.x < 500)
                    .delay(300);

function onNext(value){    
    circle.style.left = `${value.x}px`;
    circle.style.top = `${value.y}px`;
}

function onError(e){
    console.log(`error: ${e}`);
}

function onComplete(){
    console.log(`complete`);
}

source.subscribe(onNext, onError, onComplete);