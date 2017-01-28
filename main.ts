import { Observable } from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let clickStream = Observable.fromEvent(button, 'click');

function load(url) {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            let data = JSON.parse(xhr.responseText);
            observer.next(data);
            observer.complete();
        });
        xhr.open("GET", url);
        xhr.send();
    });
}

function renderMovies(movies){
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
    });
}

function onError(e){
    console.error(e);
}

function onComplete(){
    console.log('complete');
}

function onNext(value) {
    console.log(value);
}


clickStream.flatMap(e => load('movies.json'))
           .subscribe(renderMovies, onError, onComplete)