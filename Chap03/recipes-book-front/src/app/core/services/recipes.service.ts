import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  recipes$ = this.http
    .get<Recipe[]>(`${BASE_PATH}/recipes`)
    .pipe(catchError(() => of([])));

  /*Create The action stream */
  private filterRecipeSubject = new BehaviorSubject<Recipe>({ title: '' });

  /* Extract The readonly stream */
  filterRecipesAction$ = this.filterRecipeSubject.asObservable();

  constructor(private http: HttpClient) {}

  updateFilter(criteria: Recipe) {
    this.filterRecipeSubject.next(criteria);
  }
}
