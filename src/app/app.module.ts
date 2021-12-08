import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TasksComponent } from './tasks/tasks.component';
import { TrashComponent } from './trash/trash.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { MessageComponent } from './message/message.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchTaskComponent } from './search-task/search-task.component';
import { SearchDynamicResultComponent } from './search-dynamic-result/search-dynamic-result.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TasksComponent,
    TrashComponent,
    AddTaskComponent,
    MessageComponent,
    EditTaskComponent,
    NotFoundComponent,
    SearchTaskComponent,
    SearchDynamicResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
