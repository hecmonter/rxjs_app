import { Observable } from 'rxjs/Observable';
import './rxjs-extensions';

export function load(url) {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        });
        xhr.open("GET", url);
        xhr.send();
    }).retryWhen(retryStrategy({attemps: 3, delay: 1500 }));
}

export function loadWithFetch(url: string) {
    // to make it lazy, like load() function 
    return Observable.defer(()=> {
        return Observable.fromPromise(fetch(url).then(r => {
            if(r.status === 200){
                return r.json();
            } else {
                return Promise.reject(r);
            }
        }));        
    })
    .retryWhen(retryStrategy());    
}

function retryStrategy({attemps=3, delay=1000 } = {}){
    return function(errors){
        return errors
                .scan((acc, response) => {                                        
                    acc++;
                    if(acc < attemps){
                        return acc; 
                    } else {
                        throw new Error(response); 
                    }                    
                }, 0)                
                .delay(delay);
    }
}
