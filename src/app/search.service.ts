import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from './Post';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  resultSearchBox:any;
  searchOption = []
  public postsData: Post[]
  postUrl: string = "http://194.5.175.25:3005/api/v1/admin/allProduct"
  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  allProductBySearch(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/allProductBySearch',data)
  }
  filteredListOptions() {
    let posts = this.postsData;
    let filteredPostsList = [];
    for (let post of posts) {
      for (let options of this.searchOption) {
        if (options.title === post.title) {
          filteredPostsList.push(post);
        }
      }
    }

    return filteredPostsList;
  }
}
