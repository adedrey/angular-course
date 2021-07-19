import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id : number;
  editMode = false
  recipeForm : FormGroup;
  subcription : Subscription;
  constructor(private route : ActivatedRoute, private router : Router, private recipeService : RecipeService) { }

  ngOnInit() {
    this.subcription = this.route.params.subscribe(
      (params : Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null ? true : false;
        this.initForm();
      }
    )
  }
  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

  onSubmit(){
    console.log(this.recipeForm);
    if(this.editMode){
      this.recipeService.onUpdateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipeService.onAddRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }
  onRemoveIngredientFromArray(index : number){
    (<FormArray>(this.recipeForm.get('ingredient'))).removeAt(index);
  }
  private initForm(){
    let recipeName ='';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath= recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredient']){
        for (let ingredrient of recipe.ingredient){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredrient.name, Validators.required),
              'amount' : new FormControl(ingredrient.amount,  [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription, Validators.required),
      'ingredient' : recipeIngredients
    })
  }
  
  get controls(){
    return (this.recipeForm.get('ingredient') as FormArray).controls;
  }
  onAddIngredient(){
    const controls = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
    (<FormArray>this.recipeForm.get('ingredient')).push(controls);
  }

}
