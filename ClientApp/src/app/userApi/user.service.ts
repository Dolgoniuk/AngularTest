import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDto} from './user.dto';

@Injectable()
export class UserService {
  url = '';
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.url = baseUrl + 'users';
  }

  getUsers() {
    return this.http.get<Array<UserDto>>(this.url);
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
