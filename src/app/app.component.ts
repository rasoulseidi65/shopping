import {Component, OnInit} from '@angular/core';
import {Meta,Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'فروشگاه به قیمت';
  private metaTagService: Meta;
  private titleService: Title;
  constructor() {
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
}
