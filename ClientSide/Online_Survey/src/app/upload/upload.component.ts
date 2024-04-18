import { Component } from '@angular/core';
import { HelpModuleService } from '../help-module/help-module.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {


  constructor(private helpService:HelpModuleService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.helpService.uploadFile(file).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          // Handle success, e.g., show a success message
        },
        (error) => {
          console.error('Error uploading file:', error);
          // Handle error, e.g., show an error message
        }
      );
    }
  }
}
