// frontend/src/app/components/comparison-view/comparison-view.component.ts
import { Component, Input, OnChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import '@thatopen/components';

@Component({
  selector: 'app-comparison-view',
  templateUrl: './comparison-view.component.html',
  styleUrls: ['./comparison-view.component.css']
})
export class ComparisonViewComponent implements OnChanges, AfterViewInit {
  @Input() differences: any;
  @ViewChild('viewerContainer', { static: true }) viewerContainer!: ElementRef;
  viewer: any;

  ngAfterViewInit() {
    this.viewer = document.createElement('thatopen-engine');
    this.viewerContainer.nativeElement.appendChild(this.viewer);
  }

  ngOnChanges() {
    if (this.differences) {
      this.highlightDifferences();
    }
  }

  highlightDifferences() {
    console.log("Highlighting differences: ", this.differences);
    if (this.viewer) {
      this.viewer.highlightDifferences(this.differences);
    }
  }
}