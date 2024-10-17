import React from 'react';
import logo from './logo.svg';
import './App.css';

import {useState} from 'react';

//Importo el hook useState para modificar el estado


interface Usuario{
  nombre:string;
  edad:number;
}

const datos:Usuario[]=[{nombre:"user1",edad:20}];

//Creo las funciones manejadores que evento que se ejecutaran
//al realizarse un evento
function MostrarInformacion(){
  alert("Mostrando información de datos en consola");

  //Creo una promesa que devolvera eventualmente los datos
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(datos)
      console.log("Datos:",datos);
    },2000)
  })
}

function App() {
  //Datos simulados
  const datos=[{}]




  return (
    <div className="App">
      <header>GESTOR DE EVENTOS</header>

      <button>Filtrar informacion</button>

      <button>Actualizar informacion</button>

      <button onClick={MostrarInformacion}>Mostrar informacion</button>
    </div>
  );
}

export default App;
