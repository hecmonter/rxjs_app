import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
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
    console.error('error: %O', e);
}

function onComplete() {
    console.log('complete');
}

function onNext(value) {
    console.log(value);
}

// not request execution until somebody subscribes to the observable.
let s: Subscription = load('moviesas.json')
    .subscribe(
            renderMovies,
            e => console.log(e),
            () => console.log('complete')
        );
    s.unsubscribe();

// executes inmediately, even though not subscribers to the  observable.
// loadWithFetch('movies.json')
//     .subscribe(renderMovies,
//         e => console.log(`error: ${e}`),
//         () => console.log('complete!'));

clickStream.flatMap(e => loadWithFetch('movies.json'))
    .subscribe(renderMovies, onError, onComplete);
