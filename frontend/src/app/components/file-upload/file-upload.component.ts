// frontend/src/app/components/file-upload/file-upload.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  selectedFile1: File | null = null;
  selectedFile2: File | null = null;
  comparisonResult: any = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any, fileNumber: number) {
    if (fileNumber === 1) this.selectedFile1 = event.target.files[0];
    else this.selectedFile2 = event.target.files[0];
  }

  uploadAndCompareFiles() {
    if (!this.selectedFile1 || !this.selectedFile2) return;
    const formData1 = new FormData();
    const formData2 = new FormData();
    formData1.append('ifcFile', this.selectedFile1);
    formData2.append('ifcFile', this.selectedFile2);

    this.http.post('http://localhost:5000/api/ifc/upload', formData1).subscribe(response1 => {
      this.http.post('http://localhost:5000/api/ifc/upload', formData2).subscribe(response2 => {
        this.compareModels(response1, response2);
      });
    });
  }

  compareModels(model1: any, model2: any) {
    this.http.post('http://localhost:5000/api/ifc/compare', {
      model1Id: model1.modelID,
      model2Id: model2.modelID
    }).subscribe(response => {
      this.comparisonResult = response;
    });
  }
}
