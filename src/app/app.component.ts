import {Component, HostListener, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {OverlayService} from './overlay.service';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'فروشگاه به قیمت';
  isShow: boolean;
  topPosToStartShowing = 100;
  private metaTagService: Meta;
  private titleService: Title;
  constructor(public overlayService: OverlayService, private spinner: NgxSpinnerService) {
  }
ngOnInit(): void {

  // this.titleService.setTitle(this.title);
  // this.metaTagService.addTags([
  //   { name: 'keywords', content: 'فروشگاه میگ میگ, محصولات پاک کننده, لوازم بهداشتی' },
  //   { name: 'robots', content: 'index, follow' },
  //   { name: 'author', content: 'شرکت آرکا' },
  //   { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //   { name: 'date', content: '2019-10-31', scheme: 'YYYY-MM-DD' },
  //   { charset: 'UTF-8' }
  // ]);
}
  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
