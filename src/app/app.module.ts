// Es el decorador de Angular que se usa para definir módulos. Se encuentra en
// @angular/core y se usa para declarar metadatos sobre la clase del módulo.
// @NgModule
import { NgModule } from '@angular/core';
// Necesario para aplicaciones web que se ejecutan en el navegador.
import { BrowserModule } from '@angular/platform-browser';

// Componentes que forman parte de este módulo.
// importar el modelo y app.component las cosas de Angular para que funcione
import { AppComponent } from './app.component';
import { StudencrudComponent } from './studencrud/studencrud.component';

// Proporciona las directivas y servicios necesarios para trabajar
// con formularios en Angular.
// para habilitar el uso de formularios en Angular,
// incluyendo la funcionalidad de "ngModel" para la vinculación de datos

// Decorador de Angular que define un módulo.
// el que sive para pasar los datos del fromulario/vista al controlador
// ngModel, ngModelOptions, *ngIf, *ngFor
import { FormsModule } from '@angular/forms';
// Proporciona el cliente HTTP para realizar peticiones HTTP en la aplicación.
import { provideHttpClient } from '@angular/common/http';

// En Angular, los módulos son una forma de organizar y agrupar diferentes partes
// de tu aplicación. El AppModule es el módulo raíz que arranca la aplicación y configura las dependencias esenciales.
@NgModule({
  // cosas que se necesitan para que la app angular funcione que son del mismo angular

  // Declara los componentes, directivas y pipes que pertenecen a este módulo.
  // Aquí se declaran AppComponent y StudencrudComponent, lo que significa que
  // estos componentes son parte del módulo y pueden ser utilizados en las
  // plantillas de otros componentes del mismo módulo.
  declarations: [
    AppComponent,
    // modelo
    StudencrudComponent
  ],
  // dependencias de Angular

  // imports: Especifica los módulos que se importan para usar sus características
  // dentro de este módulo. Aquí se importan BrowserModule y FormsModule, 
  // lo que proporciona funcionalidades básicas para la aplicación y el manejo
  // de formularios.
  imports: [
    BrowserModule,
    FormsModule
  ],
  // Define los servicios que estarán disponibles para la inyección de dependencias
  // en toda la aplicación. Aquí se está usando provideHttpClient() para configurar
  // el cliente HTTP.

  // provideHttpClient se utiliza en el módulo para registrar HttpClient
  // como un servicio disponible en toda la aplicación.
  // HttpClient es para hacer peticiones al servidor 
  // (Hacer solicitudes HTTP) en el controlador

  // En resumen, provideHttpClient se usa para configurar HttpClient como un servicio
  // en tu aplicación, y HttpClient se usa para hacer las solicitudes HTTP en tus
  // componentes o servicios.
  providers: [provideHttpClient()],
  // Indica el componente raíz que Angular debe instanciar al iniciar la aplicación.
  // En este caso, es "AppComponent" y se utiliza
  // para arrancar la aplicación.
  bootstrap: [AppComponent]
})
export class AppModule { }
