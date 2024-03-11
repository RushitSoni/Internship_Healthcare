import { Component } from '@angular/core';

@Component({
  selector: 'app-response-visulization',
  templateUrl: './response-visulization.component.html',
  styleUrl: './response-visulization.component.css'
})
export class ResponseVisulizationComponent {

  selectedBlock: number =1;

  showContent(blockNumber: number): void {
    this.selectedBlock = blockNumber;
  }

}
