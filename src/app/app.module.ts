import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedmoduleModule } from './services/sharedmodule/sharedmodule.module';
import { ToastrModule } from 'ngx-toastr';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
// Ahead of time compiles requires an exported function for factories
export function migrationFactory() {
  // The animal table was added with version 2 but none of the existing tables or data needed
  // to be modified so a migrator for that version is not included.
  return {
    1: (db:any, transaction:any) => {
      const store = transaction.objectStore('users');
      store.createIndex('email', 'email', { unique: false });
    },
    2: (db:any, transaction:any) => {
      const store = transaction.objectStore('users');
      store.createIndex('password', 'password', { unique: false });
    }
  };
}
const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [
    {
    store: 'roles',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
    ]
  },
  {
    store: 'users',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'firstName', keypath: 'firstName', options: { unique: false } },
      { name: 'lastName', keypath: 'lastName', options: { unique: false } },
      { name: 'gender', keypath: 'gender', options: { unique: false } },
      { name: 'dob', keypath: 'dob', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } },
      { name: 'password', keypath: 'password', options: { unique: false } },
      { name: 'mobileNumber', keypath: 'mobileNumber', options: { unique: false } },
      { name: 'role', keypath: 'roleId', options: { unique: false } }
    ]
  },
],migrationFactory
};
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedmoduleModule,
    ToastrModule.forRoot(),
    NgxIndexedDBModule.forRoot(dbConfig),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
