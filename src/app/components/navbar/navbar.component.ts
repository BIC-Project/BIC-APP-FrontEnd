import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { matDrawerAnimations, MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticatedFlag: boolean;
  mobileQuery: MediaQueryList;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isAuthenticatedFlag = false;
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticatedFlag = !!user;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.userSub.unsubscribe();
  }

  closeSideNav(snav: MatSidenav) {
    if (this.mobileQuery.matches)
      snav.close();

  }

  onLogout() {

    this.authService.logout();
  }
  private _mobileQueryListener: () => void;


}
