import {Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CreateService } from '../create.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent implements OnInit {

  excelData: any;
  inputUrl: string = '';
  recipients: { Email_IDs: string, selected: boolean }[] = [];
  subject: string = 'Survey';
  body: string = '';

  isEmailCol:boolean=true

  constructor(private createService: CreateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve URL from query parameters
    this.route.queryParams.subscribe(params => {
      this.inputUrl = params['url'];

      // Set the body with the inputUrl value
      this.body = `<p><a href="${this.inputUrl}">Click Here</a></p>`;
    });
  }

  readExcel(event: any) {
    this.excelData = [];
    
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      let data = fileReader.result;
      let workBook = XLSX.read(data, { type: 'binary' });
      let sheetName = workBook.SheetNames[0]; // Assuming there's only one sheet
      let workSheet = workBook.Sheets[sheetName];
      this.excelData = XLSX.utils.sheet_to_json(workSheet, { raw: true });

      // Populate recipients array with email IDs from the excel data
     
      const firstRow = this.excelData[0];
      if (firstRow) {
        // Iterate through all keys (columns) in the first row
        const keys = Object.keys(firstRow);
        const emailColumn = keys.find(key => this.isEmail(firstRow[key]));
  
        if (emailColumn) {
          // Populate recipients array with email IDs from the excel data
          this.isEmailCol=true
          this.recipients = this.excelData.map((row: any) => ({ Email_IDs: row[emailColumn], selected: false }));
        } else {

          this.isEmailCol=false
          console.error('Email column not found in the Excel data.');
          // Handle case where email column is not found
        }
      }
    };
  }

  isEmail(value: string): boolean {
    // You can implement your own email validation logic here
    // For simplicity, we'll use a basic regex pattern
    const emailPattern = /\S+@\S+\.\S+/;
    return emailPattern.test(value);
  }

  sendEmailList() {
    // Filter selected email addresses
    let selectedRecipients = this.recipients.filter(recipient => recipient.selected).map(recipient => recipient.Email_IDs);
    console.log('Selected recipients:', selectedRecipients);

    this.createService.sendEmailList(selectedRecipients, this.subject, this.body)
      .subscribe(
        response => {
          console.log('Emails sent successfully:', response);
        },
        error => {
          console.error('Failed to send emails:', error);
        }
      );
  }

  toggleSelectAll(event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    // console.log('Checkbox checked:', checked);
  
    // Update the selected property of each recipient
    this.recipients.forEach(recipient => recipient.selected = checked);
    
  }
  
}
