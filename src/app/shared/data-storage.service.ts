import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipe() {
    // ..
    const recipes = this.recipeService.getRecipe();
    this.http.put('https://angular-firebase-9a4da.firebaseio.com/recipes.json', recipes)
      .subscribe(responseData => {
        console.log(responseData);
      })

  }

  fetchRecipe() {
    // ...
    return this.http.get<Recipe[]>('https://angular-firebase-9a4da.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredient: recipe.ingredient ? recipe.ingredient : [] };
        });
      }), tap(responseData => {
        this.recipeService.setRecipe(responseData);

      }));
  }

}
