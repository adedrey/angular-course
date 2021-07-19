import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    ingredientChanged = new Subject<Ingredient[]>();
    statedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5), new Ingredient('Potatoes', 5)
    ];

    getIngredient(index: number) {
        // get an ingredient for editing 
        return this.ingredients[index];
    }
    getIngredients() {
        return this.ingredients.slice();
    }
    onAddIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientChanged.next(this.ingredients.slice());
    }
    onAddIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientChanged.next(this.ingredients.slice());
    }
    onUpdateItem(index: number, updatedIngredient: Ingredient) {
        this.ingredients[index] = updatedIngredient;
        this.ingredientChanged.next(this.ingredients.slice());
    }
    onDeleteItem(index : number){
        this.ingredients.splice(index, 1);
        this.ingredientChanged.next(this.ingredients.slice());
    }
    
}