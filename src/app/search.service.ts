import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from './Post';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
<<<<<<< HEAD
  resultSearchBox:any;
  searchOption = []
  public postsData: Post[]
  postUrl: string = "http://194.5.175.25:3005/api/v1/admin/allProduct"
=======
  searchOption = [];
  public postsData: Post[];
  postUrl = 'http://194.5.175.25:3005/api/v1/admin/allProduct';
>>>>>>> 65095094135a9c4f9cce705fc7de53c2ce3db8bc
  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }
<<<<<<< HEAD
  allProductBySearch(data:any){
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/allProductBySearch',data)
  }
  filteredListOptions() {
    let posts = this.postsData;
    let filteredPostsList = [];
    for (let post of posts) {
      for (let options of this.searchOption) {
=======
  filteredListOptions(): any {
    const posts = this.postsData;
    const filteredPostsList = [];
    for (const post of posts) {
      for (const options of this.searchOption) {
>>>>>>> 65095094135a9c4f9cce705fc7de53c2ce3db8bc
        if (options.title === post.title) {
          filteredPostsList.push(post);
        }
      }
    }
    console.log(filteredPostsList);
    return filteredPostsList;
  }
}
