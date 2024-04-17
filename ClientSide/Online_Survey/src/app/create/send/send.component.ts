import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CreateService } from '../create.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css'],
})
export class SendComponent implements OnInit {
  excelData: any;
  inputUrl: string = '';
  recipients: { Email_IDs: string; selected: boolean }[] = [];
  subject: string = 'Survey';
  body: string = '';

  isEmailCol: boolean = false;

  constructor(
    private createService: CreateService,
    private route: ActivatedRoute,
    private snackbar : MatSnackBar
  ) {}

  ngOnInit(): void {
    // Retrieve URL from query parameters
    this.route.queryParams.subscribe((params) => {
      this.inputUrl = params['url'];
      //console.log(this.inputUrl)
      // Set the body with the inputUrl value
      this.body = `
      <p>Dear Participant,</p>
      <p>We hope this email finds you well. As a valued member of our community, we would like to invite you to participate in a survey. Your feedback is invaluable to us as we strive to enhance our services and better meet your needs.</p>
      <p>Your opinion matters, and this survey provides you with an opportunity to share your thoughts and experiences. Your responses will help us understand how we can improve our healthcare services to serve you better.</p>
      <p>To begin the survey, simply click on the "Start Survey" button below:</p>
      <button class="primary-button"><a href="http://${this.inputUrl}">Start Survey</a></button>
      <p>Your participation is voluntary, and all responses will be kept confidential.</p>
      <p>We appreciate your time and input. Thank you for helping us continue to provide high-quality solutions.</p>
      `;
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
        const emailColumn = keys.find((key) => this.isEmail(firstRow[key]));

        if (emailColumn) {
          // Populate recipients array with email IDs from the excel data
          this.isEmailCol = true;
          this.recipients = this.excelData.map((row: any) => ({
            Email_IDs: row[emailColumn],
            selected: false,
          }));
        } else {
          this.isEmailCol = false;
          console.error('Email column not found in the Excel data.');
          this.snackbar.open('Email column not found in the Excel data.', 'X', {
            duration: 2000,
          });
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
    let selectedRecipients = this.recipients
      .filter((recipient) => recipient.selected)
      .map((recipient) => recipient.Email_IDs);
    console.log('Selected recipients:', selectedRecipients);

    this.createService
      .sendEmailList(selectedRecipients, this.subject, this.body)
      .subscribe(
        (response) => {
          console.log('Emails sent successfully:', response);
          this.snackbar.open('Emails sent successfully:', 'X', {
            duration: 2000,
          });
        },
        (error) => {
          console.error('Failed to send emails:', error);
          this.snackbar.open('Failed to send emails:', 'X', {
            duration: 2000,
          });
        }
      );
  }

  toggleSelectAll(event: Event) {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    // console.log('Checkbox checked:', checked);

    // Update the selected property of each recipient
    this.recipients.forEach((recipient) => (recipient.selected = checked));
  }
}
