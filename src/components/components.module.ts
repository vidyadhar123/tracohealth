import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LoadingModalComponent } from './loading-modal/loading-modal';
@NgModule({
	declarations: [LoadingModalComponent],
	imports: [
	 IonicModule.forRoot(LoadingModalComponent),
	],
	exports: [LoadingModalComponent]
})
export class ComponentsModule {}
