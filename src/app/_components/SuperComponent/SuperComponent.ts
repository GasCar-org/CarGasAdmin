import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService, BodyOutputType, Toast, ToasterConfig } from 'angular2-toaster';

export class SuperComponent {

  isEdit = false;
  id;
  loading;

  config = new ToasterConfig({
    positionClass: 'toast-bottom-left',
    timeout: 5000,
    newestOnTop: true,
    tapToDismiss: true,
    preventDuplicates: false,
    animation: 'fade',
    limit: 5,
  });

  showToast(type: string, title: string, body: string) {
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: 5000,
      showCloseButton: true,
      bodyOutputType: BodyOutputType.Default,
    };
    this._toasterService.popAsync(toast);
  }

  constructor(
    private _route: ActivatedRoute,
    private _toasterService: ToasterService,
    private _router: Router
    ) {
   
  }

}
