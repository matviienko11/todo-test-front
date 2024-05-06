import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from '../shared/interfaces/todo.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  BASIC_URL = environment.BASIC_TASKS_URL;

  constructor(private _httpClient: HttpClient) { }

  getTodos(): Observable<ITodo[]> {
    return this._httpClient.get<ITodo[]>(this.BASIC_URL);
  }

  createTodo(body: ITodo) {
    return this._httpClient.post<ITodo>(this.BASIC_URL, body)
  }

  updateTodoStatus(body: ITodo): Observable<number> {
    return this._httpClient.put<number>(this.BASIC_URL, body);
  }

  deleteTodo(id: string): Observable<number> {
    return this._httpClient.delete<number>(`${this.BASIC_URL}/${id}`);
  }
}
