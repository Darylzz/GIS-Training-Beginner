import { Component, Input, Output, EventEmitter } from '@angular/core';
import { formComment } from '../assignment1.3.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() commentLists!: formComment[];
  @Output() currentCommentIndex = new EventEmitter<number>();

  onDelete(index: number) {
    this.commentLists.splice(index, 1);
  }

  onEdit(index: number) {
    // console.log(this.commentLists[index]);
    this.currentCommentIndex.emit(index);
  }
}
