//Defino tipos literales
type Estado="pendiente"| "ejecucion" ;

type Fase="fase1"|"fase2" |"fase3"; 

//Creo la interfaz para las microtareas y macrotareas
interface Tarea{
    id:number;
    tipo:"microtareas" | "macrotareas";
}

//Creo las clases para las microtareas y macrotareas
abstract class Tareas{
     //Defino propiedades de clase con un valor inicial que luego pueden ser modificados
    

    //ESta clase tendra el ID y un estado (protected, pues no sera modificado directamente desde el objeto instanciado)
    constructor(public id:number,protected estado:Estado){}

    //Defino metodo abstracto que heredaran las clases hijas
    abstract cambiarEstado(estado_nuevo:Estado):Promise<string>;

    //Para ver el estado, como este es protegido, definire un getter
    getEstado(){
        return this.estado;
    }
}

//Creare las clases  que manejaran las microtareas y macrotareas que hereden de la clase abstracta, donde ademas definire propiedades
//especificas para cada una
class Microtarea extends Tareas{
    //Defino el constructor
    constructor(id_micro:number,estado_micro:Estado,private fase:Fase){
        //Llamo al metodo super para que se ejecute el constructor de la clase padre e instancie las propiedades del objeto de la clase hija
        super(id_micro,estado_micro);
    }

    //Al ser un metodo abstracto el definido en la clase padre, este debe ser implementado en la clase hija
    cambiarEstado(estado_nuevo:Estado):Promise<string>{
        console.log("Cambiando estado de la microtarea",this.id);
        return new Promise((resolve)=>{
            //Simulo un tiempo de espera
            setTimeout(()=>{
                this.estado=estado_nuevo;
                resolve(`Estado de la microtarea ${this.id} cambiado`);
            },2000)
        })
    }

    //Metodo getter para ver la fase
    verFase(){
        return this.fase;
    }

    //Setter para cambiar la fase
    cambiarFase(fase_nueva:Fase):Promise<string>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.fase=fase_nueva
                resolve(`Fase cambiada a ${this.fase}`);
            },2000)
        })
        
    }
}


class Macrotarea extends Tareas{
    //Creo el constructor y llamo al metodo super para instanciar las propiedades desde la clase padre
    constructor(id_macro:number,estado_macro:Estado,private fase:Fase){
        super(id_macro,estado_macro);
    }

    //Implemento el metodo abstracto de la clase padre
    cambiarEstado(estado_nuevo: Estado):Promise<string>{
        console.log("Cambiando estado de la macrotarea",this.id);
        return new Promise((resolve)=>{
            //Simulo un tiempo de espera
            setTimeout(()=>{
                this.estado=estado_nuevo;
                //Se resuelve la promesa
                resolve(`Estado de la macrotarea ${this.id} cambiado`);

            },2000)

        })
    }

    //Getter para ver la fase
    verFase(){
        return this.fase;
    }

    //Setter para cambiar la fase
    cambiarFase(fase_nueva:Fase):Promise<string>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.fase=fase_nueva
                resolve(`Fase cambiada a ${this.fase}`);
            },2000)
        })
        
    }
}

//Creo la clase event loop
class EventLoop{
    //arreglo para agregar macro/micro tareas
    private tareas:(Microtarea | Macrotarea)[];

    //Metodo para agregar tareas
    agregarTareas(tarea: Microtarea | Macrotarea){
        console.log(`Tarea agregando al event loop`);
        //Simulo un tiempo de espera para agregar las tareas y se devolvera una promesa
        return new Promise((resolve)=>{
            console.log(`Agregando la tarea de ID ${tarea.id}`);
            setTimeout(()=>{
                this.tareas.push(tarea);
            },2000);
        })
    }

    //Getter para ver las tareas
    getTareas(){
        console.log("Obteniendo tareas");
        return new Promise((resolve)=>{
            setTimeout(()=>{
                //La promesa se resuelve y da como valor el arreglo de tareas
                resolve(this.tareas);
            },2000);
        })
    }
}


//Funcion async para probar las funciones que retornan promesas
async function Pruebas(){
    //creo macrotareas y microtareas
    const mat1=new Macrotarea(1,"ejecucion","fase1");
    //cambiando la fase, al ser esta funcion que retorna una promesa que eventualmente se resolvera, uso "await"
    const res= await mat1.cambiarFase("fase2");
    //Se ve la fase
    const fase_actual=mat1.verFase();
    console.log(fase_actual);

    //Creo microtareas
    const mit2=new Microtarea(1,"pendiente","fase3");

    //Agrego las microtareas y macrotareas al arreglo de tareas mediante el event loop
    const event_loop=new EventLoop();
    //Agrego la microtarea y macrotarea
    const resp2=await event_loop.agregarTareas(mat1);
    const resp3=await event_loop.agregarTareas(mit2);

    //Viendo la tareas
    const resp4=await event_loop.getTareas();
    console.log(resp4);

}