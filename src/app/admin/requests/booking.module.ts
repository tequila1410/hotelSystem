import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {BookingService} from './booking.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [BookingService]
})
export class BookingModule { }
