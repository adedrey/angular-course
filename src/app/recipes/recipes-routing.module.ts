import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResolverService } from './recipes-resolver.service';
import { AuthGuard } from '../auth/auth/auth.guard';
// import { RecipesResolverService } from './recipes-resolver.service';

const recipeRoutes : Routes = [
    { path : 'recipes', component : RecipesComponent, canActivate: [AuthGuard], children : [
        // { path : '', component : RecipesComponent },
        { path : 'new', component : RecipeEditComponent },
        { path : ':id', component : RecipeDetailComponent,
         resolve : [RecipesResolverService]
        },
        { path : ':id/edit', component : RecipeEditComponent,
         resolve : [RecipesResolverService]
        }
    ] }
];

@NgModule({
    imports : [RouterModule.forChild(recipeRoutes)],
    exports : [RouterModule]
})
export class RecipesRoutingModule {}
