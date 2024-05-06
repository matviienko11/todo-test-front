import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoService } from './services/todo.service';
import { map } from 'rxjs/operators';
import { ITodo } from './shared/interfaces/todo.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoFormComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  todoList: ITodo[] = [];
  
  constructor(private _todoService: TodoService) {}

  ngOnInit(): void {
    this._todoService.getTodos().pipe(map((data) => {
      // Sort todos so that all completed ones were on the buttom
      return data.sort((a, b) => (a.isDone === b.isDone)? 0 : a.isDone? 1 : -1);
    })).subscribe(data => this.todoList = data);
  }

  handleAddTodo(todo: ITodo) {
    this._todoService.createTodo(todo).subscribe((data) => {
      this.todoList.unshift(data);
    });
  }

}
