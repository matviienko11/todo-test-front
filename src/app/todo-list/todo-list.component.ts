import { Component, Input } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { ITodo } from '../shared/interfaces/todo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent {
  @Input() todoList: ITodo[] = [];

  constructor(private _todoService: TodoService) {}

  handleStatus(todo: ITodo, e: any) {
    const isDone = e.target.checked;
    const idx = this.todoList.findIndex(t => t.id === todo.id);
    this.todoList[idx].isDone = isDone;

    this._todoService.updateTodoStatus({ ...todo, isDone }).subscribe(() => {
      this.todoList = this.todoList.sort((a, b) => (a.isDone === b.isDone)? 0 : a.isDone? 1 : -1);
    });
  }

  removeTodo(id: string) {
    this._todoService.deleteTodo(id).subscribe(() => {
      this.todoList = this.todoList.filter(t => t.id !== id);
    });
  }
}
