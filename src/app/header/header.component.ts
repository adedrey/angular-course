import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSub : Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private dataStorageService : DataStorageService,
    private router : Router,
    private authService: AuthService
  ) { }


  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
  onSaveRecipes(){
    this.dataStorageService.storeRecipe();
  }
  onFetchRecipes(){
    //...
    this.dataStorageService.fetchRecipe().subscribe();
  }
  onLogout() {
    this.authService.logout();
  }

}
