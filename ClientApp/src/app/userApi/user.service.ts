import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Paged, UserDto} from './user.dto';
import {query} from '@angular/animations';

@Injectable()
export class UserService {
  url = '';
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.url = baseUrl + 'users';
  }
  getPaged(page: number, size: number) {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<Paged<UserDto>>(this.url, {params: params});
  }
  createUser(user: UserDto) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<UserDto>(this.url, JSON.stringify(user), {headers: myHeaders});
  }
  updateUser(user: UserDto) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put<UserDto>(this.url, JSON.stringify(user), {headers: myHeaders});
  }
  deleteUser(id: number) {
    return this.http.delete<UserDto>(this.url + '/' + id);
  }
}
