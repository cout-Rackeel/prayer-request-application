import { Component, Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-church';
}

import { ErrorHandler } from '@angular/core';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
handleError(err: any): void {
const chunkFailedMessage = /Loading chunk [\d]+ failed/;
if (chunkFailedMessage.test(err.message)) {
window.location.reload();
}
}
}
