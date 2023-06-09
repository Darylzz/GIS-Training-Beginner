import { Component, Input, Output, EventEmitter } from '@angular/core';
import { formComment } from '../assignment1.3.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  @Output() commentData = new EventEmitter<formComment>();
  @Input() commentList!: formComment[];
  @Input() currentComment!: number;

  formComment: formComment = {
    name: '',
    comment: '',
    time: '',
  };

  isEditing: boolean = false;

  ngOnChanges() {
    if (this.currentComment !== -1 && this.commentList.length) {
      this.formComment = { ...this.commentList[this.currentComment] };
      this.isEditing = true;
    } else {
      this.resetForm();
    }
  }

  ngDoCheck() {
    // console.log(this.isEditing);
  }

  onSubmitForm() {
    const data = {
      name: this.formComment.name,
      comment: this.formComment.comment,
      time: new Date().toString(),
    };

    if (this.isEditing) {
      this.commentList[this.currentComment] = data;
    } else {
      this.commentData.emit(data);
    }

    this.resetForm();
  }

  resetForm() {
    this.formComment = {
      name: '',
      comment: '',
      time: '',
    };
    this.isEditing = false;
    // this.editedCommentIndex = -1;
  }
}
