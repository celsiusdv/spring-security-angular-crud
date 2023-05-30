import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User } from '../_models/user';

@Directive({
  selector: '[requiredRoles]'
})
export class RequiredRoleDirective {
    user: User = JSON.parse(localStorage.getItem('user')!);
    @Input()
    set requiredRoles(role: string[]) {
        for (let i = 0; i < this.user?.authorities?.length; i++) {
            if (this.user?.authorities[i]?.authority === role[i]) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainerRef.clear();
            }
        }
    }

    constructor(private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef) { }
}
