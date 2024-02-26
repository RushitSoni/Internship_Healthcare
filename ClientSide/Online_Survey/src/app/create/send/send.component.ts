import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CreateService } from '../create.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})
export class SendComponent implements OnInit {

  excelData: any;
  inputUrl: string = '';
  recipients: string[] = [];
  subject: string = 'Survey';
  body: string = '';

  constructor(private createService: CreateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Retrieve URL from query parameters
    this.route.queryParams.subscribe(params => {
      this.inputUrl = params['url'];

      // console.log(this.inputUrl)
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

      // Extract email IDs from the excel data
      this.recipients = this.excelData.map((row: any) => row['Email_IDs']);
      console.log(this.recipients)
    };
  }

  sendEmailList() {
    this.createService.sendEmailList(this.recipients, this.subject, this.body)
      .subscribe(
        response => {
          console.log('Emails sent successfully:', response);
        },
        error => {
          console.error('Failed to send emails:', error);
        }
      );
  }
}
