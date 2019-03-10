import { NgModule } from '@angular/core';
import {NbLayoutModule, NbSidebarModule, NbSidebarService, NbThemeModule, NbMenuModule, NbUserModule} from '@nebular/theme';

@NgModule({
  imports: [
    NbLayoutModule,
    NbSidebarModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbMenuModule.forRoot(),
    NbUserModule
  ],
  exports: [
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbUserModule
  ],
  providers: [NbSidebarService]
})
export class NebularComponentsModule { }
