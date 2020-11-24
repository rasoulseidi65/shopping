import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {Post} from "../../../Post";
import {SearchService} from "../../../search.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  allPosts: Post[];
  autoCompleteList: any[]
  productSearch: any;
  textSearch: any;
  @ViewChild('autocompleteInput') autocompleteInput: ElementRef;
  @Output() onSelectedOption = new EventEmitter();

  constructor(public dataService: SearchService,
              private router: Router) {
  }

  ngOnInit(): void {
    // get all the post
    this.dataService.getPosts().subscribe(posts => {
      this.allPosts = posts['data']

    });

    // when user types something in input, the value changes will come through this
    this.myControl.valueChanges.subscribe(userInput => {
      this.autoCompleteExpenseList(userInput);
    })
  }

  private autoCompleteExpenseList(input) {
    let categoryList = this.filterCategoryList(input)
    this.autoCompleteList = categoryList;
  }

  filterCategoryList(val) {
    var categoryList = []
    if (typeof val != "string") {
      return [];
    }
    if (val === '' || val === null) {
      return [];
    }
    return val ? this.allPosts.filter(s => s.title.toLowerCase().indexOf(val.toLowerCase()) != -1)
      : this.allPosts;
  }

  displayFn(post: Post) {
    let k = post ? post.title : post;
    return k;
  }

  filterPostList(event) {

    this.productSearch = event.source.value['_id'];

    var posts = event.source.value;
    if (!posts) {
      this.dataService.searchOption = []
    } else {

      this.dataService.searchOption.push(posts);
      this.onSelectedOption.emit(this.dataService.searchOption);
      // this.advenceSearch();
      this.router.navigate(['/home/detail', this.productSearch])
    }
    this.focusOnPlaceInput();
  }

  removeOption(option) {

    let index = this.dataService.searchOption.indexOf(option);
    if (index >= 0)
      this.dataService.searchOption.splice(index, 1);
    this.focusOnPlaceInput();

    this.onSelectedOption.emit(this.dataService.searchOption)
  }

  // focus the input field and remove any unwanted text.
  focusOnPlaceInput() {
    this.autocompleteInput.nativeElement.focus();
    this.autocompleteInput.nativeElement.value = '';
  }

  advenceSearch() {
    let data = {
      title: this.textSearch
    }
    this.dataService.allProductBySearch(data).subscribe((response) => {
      if (response['success'] === true) {
        this.dataService.resultSearchBox=response['data'];
        this.router.navigate(['/home/resultSearch']);
        // window.location.reload();
      }
    })
  }
}
