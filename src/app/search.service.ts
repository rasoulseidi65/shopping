import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from './Post';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchOption = [];
  public postsData: Post[];
  postUrl = 'http://194.5.175.25:3005/api/v1/admin/allProduct';
  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }
  filteredListOptions(): any {
    const posts = this.postsData;
    const filteredPostsList = [];
    for (const post of posts) {
      for (const options of this.searchOption) {
        if (options.title === post.title) {
          filteredPostsList.push(post);
        }
      }
    }
    console.log(filteredPostsList);
    return filteredPostsList;
  }
}
