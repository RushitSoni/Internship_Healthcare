import { Component } from '@angular/core';
import { HelpModuleService } from '../help-module/help-module.service';
import { NotificationServiceService } from '../shared/components/modals/notifications/notification-service.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {


  constructor(private helpService:HelpModuleService,private notificatioService:NotificationServiceService) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.helpService.uploadFile(file).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          this.notificatioService.displayNotification(` File Uploaded SuccessFully !!`, 'green')
          // Handle success, e.g., show a success message
        },
        (error) => {
          console.error('Error uploading file:', error);
          this.notificatioService.displayNotification(`Please Re-Upload The File !!`, 'red')
          // Handle error, e.g., show an error message
        }
      );
    }
  }
}
