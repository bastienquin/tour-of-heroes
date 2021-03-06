import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class HeroService {

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) {}

    private heroesUrl = 'api/heroes';

    httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    /** GET heroes from the server */
    getHeroes(): Observable<Hero[]> {

        return this.http.get<Hero[]>(this.heroesUrl).pipe(
            tap(_ => this.log("Fetched all heroes", "success")),
            catchError(this.handleError<Hero[]>('getHeroes', []))
        );

    }

    getHero(id: number): Observable<Hero> {

        const url = `${this.heroesUrl}/${id}`;

        return this.http.get<Hero>(url).pipe(
            tap(_ => this.log(`Fetched hero (${id})`, "success")),
            catchError(this.handleError<Hero>(`getHero(${id})`))
        );

    }

    /** PUT: update the hero on the server */
    updateHero(hero: Hero): Observable<any> {

        return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
            tap(_ => this.log(`updateHero(${hero.id}`, "success")),
            catchError(this.handleError<any>('updateHero'))
        );

    }

    private log(message: string, status: string) {
        this.messageService.add({
            component: "HeroService",
            message: message,
            status: status
        });
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     *
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {

        return (error: any): Observable<T> => {
    
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
        
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`, "error");
        
            // Let the app keep running by returning an empty result.
            return of(result as T);
            
        };
    }

}
