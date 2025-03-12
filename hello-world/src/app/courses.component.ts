import { Component } from "@angular/core";

@Component ({
    selector: 'courses',
    template: `
        <h2>{{ title }}</h2>
        <ul>
            <li *ngFor="let course of courses">{{ course }}</li>
        </ul>
    `,
    standalone: false
})
export class CoursesComponent {
    title = "List of courses";
    courses = ["course1","course2","course3"];

    // Logic for calling an http service
}