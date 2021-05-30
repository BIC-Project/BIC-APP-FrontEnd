import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { matDrawerAnimations } from '@angular/material/sidenav';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticatedFlag: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticatedFlag = !!user;
    });
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    setTimeout(() => {
      if (confirm("Do you really want to logout?"))
        this.authService.logout();
    }, 340);

  }
}
