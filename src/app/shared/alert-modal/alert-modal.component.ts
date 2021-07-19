import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
  @Input() message : string;
  @Output() errorCancel = new EventEmitter();
  constructor() { }

  ngOnInit() {
    console.log(this.message)
  }

  onCancelError(){
    this.errorCancel.emit();
  }

}
