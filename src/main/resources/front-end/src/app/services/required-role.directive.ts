import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Directive({
  selector: '[requiredRoles]'
})
export class RequiredRoleDirective {
 
  @Input()
  set requiredRoles(role: string[]) {

    if(this.user.hasRole(role)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef,
    private user: AuthenticationService) { }

}
