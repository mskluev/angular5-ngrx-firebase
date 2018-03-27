import { Store } from '@ngrx/store';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSideNav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;

  constructor(private authService: AuthService, private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuthenticated);
  }

  onCloseSidenav() {
    this.closeSideNav.emit();
  }

  onLogout() {
    this.onCloseSidenav();
    this.authService.logout();
  }
}
