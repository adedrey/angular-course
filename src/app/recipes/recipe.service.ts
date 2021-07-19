import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
    recipeChanged = new Subject<Recipe[]>()
    constructor(private shoppingListService : ShoppingListService) {}
    private recipes: Recipe[] = [];
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         'A Test Recipe',
    //         'This is simply a new Recipe',
    //         'https://www.nps.gov/subjects/camping/images/recipe_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
    //         [
    //             new Ingredient('Meat', 10),
    //             new Ingredient('Garbage', 20)
    //         ]

    //     ),
    //     new Recipe(
    //         'A Second Recipe',
    //         'This is simply a new Recipe',
    //         'https://www.nps.gov/subjects/camping/images/recipe_1.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
    //         [
    //             new Ingredient('Fish', 20),
    //             new Ingredient('Sugar', 25)
    //         ]
    //     )
    // ];

    setRecipe(recipes : Recipe[]){
        // from the dataStorageService;
        this.recipes = recipes;
        this.recipeChanged.next(this.recipes.slice())
    }
    getRecipe() {
        return this.recipes.slice();
    }
    getRecipeById(id : number){
        const recipe = this.recipes[id];
        return recipe;
    }
    onAddIngredient(ingredient : Ingredient[]){
        this.shoppingListService.onAddIngredients(ingredient);
    }
    onAddRecipe(recipe : Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }
    onUpdateRecipe(index : number, newRecipe : Recipe){
        this.recipes[index] = newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }
    onDeleteRecipe(index : number){
        this.recipes.splice(index, 1);
        this.recipeChanged.next(this.recipes.slice());
    }
}
