import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : Ingredient[];
  private ingredientSubscription : Subscription;
  constructor(private shoppingListService : ShoppingListService) { }
  onIngredientAdded(ingredientAdded : Ingredient){
    this.ingredients.push(ingredientAdded);
  }
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientSubscription = this.shoppingListService.ingredientChanged.subscribe(
      (ingredients : Ingredient[]) => {
        this.ingredients =ingredients;
        console.log(this.ingredients);
      }
    )
  }
  ngOnDestroy(){
    this.ingredientSubscription.unsubscribe();
  }
  onEditItem(index : number){
    this.shoppingListService.statedEditing.next(index);
  }
  

}
