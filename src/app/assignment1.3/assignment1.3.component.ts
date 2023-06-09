import { Component } from '@angular/core';

export type formComment = {
  name: string;
  comment: string;
  time: string;
};
@Component({
  selector: 'app-assignment1.3',
  templateUrl: './assignment1.3.component.html',
  styleUrls: ['./assignment1.3.component.css'],
})
export class Assignment13Component {
  commentLists: formComment[] = [];
  currentComment: number = -1;

  getData(dataList: formComment) {
    this.commentLists.push(dataList);
  }

  editComment(index: number) {
    this.currentComment = index;
  }
}
