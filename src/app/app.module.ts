// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BlogComponent } from './components/blog/blog.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

//Modules
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppRoutingModule } from './app-routing.module';
import { DisqusModule } from "ngx-disqus";
import { ShareButtonsModule } from '@ngx-share/buttons';

// Services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { NotAuthGuard } from './services/not-auth.guard';
import { BlogEditComponent } from './components/blog-edit/blog-edit.component';

// Pipes
import { ReplaceSpacePipe } from './pipes/replace-space.pipe';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    BlogComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    BlogEditComponent,
    ReplaceSpacePipe,
    FooterComponent
  ],

  imports:[
    CommonModule,
    NgtUniversalModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule, //used by ShareButtonModule
    FlashMessagesModule.forRoot(),
    MarkdownModule.forRoot(),
    AppRoutingModule,
    DisqusModule.forRoot('cleanqt'),
    ShareButtonsModule.forRoot()
  ],

  providers: [
    AuthService,
    AuthGuard,
    NotAuthGuard
  ],
})
export class AppModule { }
