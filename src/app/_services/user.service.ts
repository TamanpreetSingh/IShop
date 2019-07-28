import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/_models/user';
import { config } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<User[]>(`${config.Promise}/users`);
}

getById(id: number) {
    return this.http.get(`${config.Promise}/users/${id}`);
}

register(user: User) {
    return this.http.post(`${config.Promise}/users/register`, user);
}

update(user: User) {
    return this.http.put(`${config.Promise}/users/${user.id}`, user);
}

delete(id: number) {
    return this.http.delete(`${config.Promise}/users/${id}`);
}
}
