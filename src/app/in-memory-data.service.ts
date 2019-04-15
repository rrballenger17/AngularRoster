import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Archie Griffin' },
      { id: 12, name: 'Eddie George' },
      { id: 13, name: 'Orlando Pace' },
      { id: 14, name: 'Chris Spielman' },
      { id: 15, name: 'Chris Carter' },
      { id: 16, name: 'Troy Smith' },
      { id: 17, name: 'Jack Tatum' },
      { id: 18, name: 'Ezekiel Elliott' },
      { id: 19, name: 'Ted Ginn Jr' },
      { id: 20, name: 'Howard Cassady' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}