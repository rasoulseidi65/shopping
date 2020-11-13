import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              private route: ActivatedRoute,
<<<<<<< HEAD
              public localStorage: LocalStorageService) {
=======
              private localStorage: LocalStorageService) {
>>>>>>> 821596d524868946225d784240b44f833094d3a7
  }

  ngOnInit(): void {
    this.localStorage.getCurrentUser();
  }

  logOut(): void{
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
  }
}
