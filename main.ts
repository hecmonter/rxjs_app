import { Observable } from 'rxjs/Observable';
import './rxjs-extensions';
import { load, loadWithFetch } from './loader';

let output = document.getElementById('output');
let button = document.getElementById('button');

let clickStream = Observable.fromEvent(button, 'click');

function renderMovies(movies) {
    movies.forEach(m => {
        let div = document.createElement('div');
        div.innerText = m.title;
        output.appendChild(div);
    });
}

function onError(e) {
    console.error(e);
}

function onComplete() {
    console.log('complete');
}

function onNext(value) {
    console.log(value);
}

// load('movies.json'); // not request execution until somebody subscribes to the observable.

// loadWithFetch('movies.json'); // executes inmediately, even though not subscribers to the  observable.

clickStream.flatMap(e => loadWithFetch('movies.json'))
    .subscribe(renderMovies, onError, onComplete)