import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe : Recipe;
  id : number;
  subscription : Subscription;
  constructor(private recipeService : RecipeService, private router : Router, private route : ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.recipe = this.recipeService.getRecipeById(+this.route.snapshot.params['id']);
    this.subscription = this.route.params.subscribe(
      (params : Params) => {
        this.recipe = this.recipeService.getRecipeById(+params['id']);
        this.id = +params['id'];
      }
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo : this.route})
  }

  onAddIngredientToShoppingList(){
    this.recipeService.onAddIngredient(this.recipe.ingredient);
  }
  onDeleteRecipe(){
    this.recipeService.onDeleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
