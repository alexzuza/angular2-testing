import { Component }   from '@angular/core';

@Component({
  selector: 'app-component',
  template: '<h1>{{title}}</h1>'
})
export class AppComponent {
  title = 'Test app component';
}