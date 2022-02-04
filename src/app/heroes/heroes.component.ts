import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})

export class HeroesComponent {

    constructor(private heroService: HeroService, @Inject(DOCUMENT) document: any) {}

    ngOnInit(): void {
        this.getHeroes();
        console.log(document.getElementById('heroes-title'));
    }      

    heroes: Hero[] = [];

    getHeroes(): void {
        this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    }

}