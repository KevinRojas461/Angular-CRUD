// no se puede usar HttpClient sin provideHttpClient en el app.module.ts
// para ahcer peticiones http
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

// vincular este controlador con los otros archivos de la carpeta studencrud
@Component({
  // app-studencrud
  // app.component.html
  selector: 'app-studencrud',
  // vista
  // desde este archivo/controlador/modal (studencrud.component.ts)
  // se esta relacionando este controlador con la vista (studencrud.component.html)
  templateUrl: './studencrud.component.html',
  styleUrl: './studencrud.component.scss'
})

// el componente StudencrudComponent maneja operaciones CRUD (Crear, Leer, Actualizar,
// Eliminar)
export class StudencrudComponent {
  // Variables

  // Almacena la lista de estudiantes qeu manda la api.
  StudentArray: any[] = [];

  // Indica si los datos se han cargado.
  // se establece en false porque los datos aún no han sido cargados.
  isResultLoaded = false;

  // Indica si el formulario de actualización está activo.
  // PARA saber si el formulario es para actualozar o para registrar

  // (es decir, si se está editando un estudiante). se establece en false porque
  // no se está editando ningún estudiante.
  isUpdateFormActive = false;

  // La asignación de valores a las variables stname, course, y fee
  // ocurre automaticamente cuando el usuario interactúa con
  // los botones (aditar, gurdar, eliminar).

  // Variables para almacenar los datos de un estudiante que manda el formulario.
  stname: string = "";
  course: string = "";
  fee: string = "";
  // Almacena el ID del estudiante actual para "actualizarlo".
  // el fromulario manda el id y currentStudentID lo guarda
  currentStudentID = "";

  // Constructor

  // Inyecta el servicio HttpClient para hacer peticiones HTTP (GET,POST,PUT,DELETE).
  constructor(private http: HttpClient) {
    // Llama al método getAllStudent para cargar todos los
    // estudiantes "al crear el componente."

    // creo q es para que desde que se ejecuta la app o se refresque la pagina
    // esten todos los registros en la tabla
    this.getAllStudent();
  }




  // Métodos

  // Método del ciclo de vida de Angular que se ejecuta al inicializar el
  // componente. Aquí está vacío.

  //  para inicializar datos que el componente necesita para su funcionamiento. 
  // Por ejemplo, cargar datos desde un servidor o configurar valores iniciales.

  // Se utiliza para inicializar datos o realizar configuraciones cuando 
  // el componente se carga por primera vez.
  ngOnInit(): void {
  }

  // limpiar el formulario
  resetForm() {
    this.stname = "";
    this.course = "";
    this.fee = "";
    this.currentStudentID = "";
  }

  // listar
  getAllStudent() {
    // Realiza una petición GET a la URL http://localhost:9002/api/student/
    // con get en la ruta /student/ que lleva al metodo que lista del controlador
    this.http.get("http://localhost:9002/api/student/")
      // (resultData) son los registros que manda la "api" como repuesta
      // resultData es la respuesta/lo que envia la api al procesar la peticion
      .subscribe((resultData: any) => {
        // y marca isResultLoaded (datos se han cargado) como true.

        // Después de que la petición HTTP para obtener los estudiantes se completa
        // exitosamente, isResultLoaded se establece en true.

        // Esta variable se puede usar en la vista (HTML) para mostrar una indicación
        // de carga o PARA CONTROLAR LA VISIVILIDAD de ciertos elementos hasta
        // que los datos estén disponibles.

        // this.isResultLoaded = false;  // Indicar que los datos están siendo cargados
        this.isResultLoaded = true; // Indicar que los datos han sido cargados
        console.log(resultData.data);
        // los registros que manda la api se almacena en StudentArray
        // la lsita StudentArray se le manda a la vista para que la tabla 
        this.StudentArray = resultData.data;
      });
  }

  // crear
  register() {
    // Prepara los datos del nuevo estudiante en "bodyData".
    let bodyData = {
      // "stname" está entre comillas pq esuna cuestión de sintaxis
      // de objetos en JavaScrip

      // this.stname estoy llamando a la variable stname
      // a la que se le asigno el valor del campos del formulario
      "stname": this.stname,
      "course": this.course,
      "fee": this.fee,
    };

    // Realiza una petición POST a la URL http://localhost:9002/api/student/add
    // con pots en la ruta /student/add que lleva al metodo que crear del controlador

    // "/add", bodyData => es que le mado el registro/objeto con sus campos
    // en el cuerpo de la solicitud
    this.http.post("http://localhost:9002/api/student/add", bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      // resultData es la respuesta/lo que envia la api al procesar la peticion
      // es este caso POST solo me dice si fue exitosa o no la peticion
      alert("Student Registered Successfully")
      // luego de crear se actualize la tabla
      this.getAllStudent();
      // limpiar el formulario luego de crear
      this.resetForm();
    });
  }

  // al seleccionar un registro para editar
  // al metodo se le pasa los campos del registro seleccionado para editar
  setUpdate(data: any) {
    // se guardan los datos del registro seleccionado en las varibales
    // para luego pasarselas al formulario
    this.stname = data.stname;
    this.course = data.course;
    this.fee = data.fee;

    // en este caso si se inicializa el id junto con los demas campos
    // pq se necesita el id para saber que registro se quiere actualizar
    this.currentStudentID = data.id;

  }

  UpdateRecords() {
    // Prepara los datos nuevo DATOS DEL estudiante seleccionado en "bodyData".
    let bodyData =
    {
      // this. son los campos del formulario actualizar
      "stname": this.stname,
      "course": this.course,
      "fee": this.fee
    };

    // estoy lamando el metodo update del controlador 
    // y le estoy pasando el "id" en la URL en froma de parametro 
    // el id del registro seleccionado para actualizar ademas le estoy pasando
    // los nuevos datos en el cuerpo de la solicitud (bodyData)
    this.http.put("http://localhost:9002/api/student/update" + "/" + this.currentStudentID, bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Registered Updateddd")
      this.getAllStudent();
      this.resetForm();

    });
  }

  // para saber si es para registrar o actualizar
  // luego del setUpdate
  save() {
    // si es para registrar no se asignan todos los datos a las variables
    // el formulario pasa todos los datos "menos el id" cuando se "crea"
    // y a cada campo que pasa en fromulario se le asigna una variable
    // es por eso que cuando se crea "no hay id"
    if (this.currentStudentID == '') {
      this.register();
    }
    // en cambio cuando se le da en "edit" pasa todos los campos incluyendo al "id"
    // y esos campos incluyendo al "id" se guardan en las variables
    // es por eso que cuando se edita si hay id
    else {
      this.UpdateRecords();
    }

  }

  // data le estoy pasando todos los campos del registro seleccionado para eliminar
  setDelete(data: any) {
    // estoy lamando el delete update del controlador y le estoy pasando el id
    // data.id de de todos los campos solo llamo el id
    this.http.delete("http://localhost:9002/api/student/delete" + "/" + data.id).subscribe((resultData: any) => {
      console.log(resultData);
      alert("Student Deletedddd")
      this.getAllStudent();
    });
  }

}
