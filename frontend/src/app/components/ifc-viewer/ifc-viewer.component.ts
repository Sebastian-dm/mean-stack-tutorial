// frontend/src/app/components/ifc-viewer/ifc-viewer.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import '@thatopen/components';

@Component({
  selector: 'app-ifc-viewer',
  templateUrl: './ifc-viewer.component.html',
  styleUrls: ['./ifc-viewer.component.css']
})
export class IfcViewerComponent implements AfterViewInit {
  @ViewChild('viewerContainer', { static: true }) viewerContainer!: ElementRef;

  ngAfterViewInit() {
    // Set up the IFC viewer using That Open Engine Components
    const viewer = document.createElement('thatopen-engine');
    this.viewerContainer.nativeElement.appendChild(viewer);
  }

  async loadIFC(file: File) {
    const fileURL = URL.createObjectURL(file);
    const viewer = this.viewerContainer.nativeElement.querySelector('thatopen-engine');
    if (viewer) {
      viewer.loadIfc(fileURL);
    }
  }
}
