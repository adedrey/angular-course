import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingredientForm: FormGroup;
  firstSubscription: Subscription;
  editMode = false;
  editedItem: number;
  IngredientToEdit: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }
  ngOnInit() {
    this.firstSubscription = this.shoppingListService.statedEditing.subscribe(
      (index: number) => {
        this.editedItem = index;
        this.editMode = true;
        this.IngredientToEdit = this.shoppingListService.getIngredient(index);
        this.ingredientForm.setValue({
          'name': this.IngredientToEdit.name,
          'amount': this.IngredientToEdit.amount
        })
      }
    )
    this.ingredientForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  }
  onSubmit() {
    // console.log(this.ingredientForm)
    const ingName = this.ingredientForm.get('name').value;
    const ingAmount = this.ingredientForm.get('amount').value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.shoppingListService.onUpdateItem(this.editedItem, newIngredient);
    } else {
      this.shoppingListService.onAddIngredient(newIngredient);
    }
    this.editMode = false;
    this.ingredientForm.reset();
  }
  onDeleteItem() {
    this.shoppingListService.onDeleteItem(this.editedItem);
    this.onClearItem();
  }
  onClearItem() {
    this.ingredientForm.reset();
    this.editMode = false;
  }
  ngOnDestroy() {
    this.firstSubscription.unsubscribe();
  }



}
