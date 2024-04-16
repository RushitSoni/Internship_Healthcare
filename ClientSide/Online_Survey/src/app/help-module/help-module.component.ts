import { Component, OnInit } from '@angular/core';
import { HelpModuleService } from './help-module.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-help-module',
  templateUrl: './help-module.component.html',
  styleUrls: ['./help-module.component.css']
})
export class HelpModuleComponent implements OnInit {
  fileUrl: SafeResourceUrl | undefined;

  constructor(private helpService: HelpModuleService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.viewFile();
  }

  viewFile(): void {
    this.helpService.viewFile('Help.pdf').subscribe(
      (response: Blob) => {
        // Create blob URL
        const blobUrl = URL.createObjectURL(response);

        // Sanitize the blob URL for security
        this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      },
      (error) => {
        console.error('Error downloading file:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }

  downloadFile(): void {
    this.helpService.viewFile('Help.pdf').subscribe(
      (response: Blob) => {
        // Create blob URL
        const blob = new Blob([response], { type: 'application/pdf' });
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'Help.pdf';

        // Append the link to the body
        document.body.appendChild(link);

        // Click the link to trigger the download
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error downloading file:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
  }
}
