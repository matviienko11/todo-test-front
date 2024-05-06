import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ITodo } from '../shared/interfaces/todo.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent implements OnInit {
  form: FormGroup;
  @Output() todoToAdd: EventEmitter<ITodo> = new EventEmitter<ITodo>();

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      text: ['', Validators.required],
      due_to: ['', Validators.required]
    })
  }
  
  onSubmit() {
    this.todoToAdd.emit(this.form.value);
  }
}
