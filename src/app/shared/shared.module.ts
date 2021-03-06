import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule} from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, 
    MatTableModule, FlexLayoutModule, MatToolbarModule, MatMenuModule
  ], exports: [
    MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIconModule, 
    MatTableModule, FlexLayoutModule, MatToolbarModule, MatMenuModule
  ]
})
export class SharedModule { }
