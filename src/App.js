import { useState } from "react";
import "./App.css";
import Header from "./componentes/Header/header";
import Formulario from "./componentes/formulario/Formulario";
import MiOrg from "./componentes/MiOrg";
import Equipo from "./componentes/Equipo";
import Footer from "./componentes/Footer";
import { v4 as uuid } from 'uuid';


function App() {
  const [mostrarFormulario, actualizarMostrar] = useState(false);
  const [colaboradores, actualizarColaboradores] = useState([
    {
      id: uuid(),
      nombre: "Edwar",
      puesto: "Developer",
      foto: "https://avatars.githubusercontent.com/u/91356500?v=4",
      equipo: "Programación",
      fav : true
    },
    {
      id: uuid(),
      nombre: "Mario",
      puesto: "Developer",
      foto: "https://avatars.githubusercontent.com/u/91356500?v=4",
      equipo: "Programación",
      fav : false
    },
    {
      id: uuid(),
      nombre: "Pepe aguilar",
      puesto: "Devops",
      foto: "https://avatars.githubusercontent.com/u/91356500?v=4",
      equipo: "Devops",
      fav : false
    }
  ])

  //uuidv4();

  const [equipos, actualizarEquipos] = useState([
    {
      id: uuid(),
      titulo: "Programación",
      colorPrimario: "#57C278 ",
      colorSecundario: "#D9F7E9",
    },

    {
      id: uuid(),
      titulo: "Front End",
      colorPrimario: "#A6D157",
      colorSecundario: "#F0F8E2",
    },

    {
      id: uuid(),
      titulo: "Data Science",
      colorPrimario: "#E06B69",
      colorSecundario: "#FDE7E8",
    },

    {
      id: uuid(),
      titulo: "Devops",
      colorPrimario: "#DB6EBF",
      colorSecundario: "#FAE9F5",
    },

    {
      id: uuid(),
      titulo: "UX y Diseño",
      colorPrimario: "#DB6EBF",
      colorSecundario: "#FAE9F5",
    },

    {
      id: uuid(),
      titulo: "Móvil",
      colorPrimario: "#FFBA05",
      colorSecundario: "#FFF5D9",
    },

    {
      id: uuid(),
      titulo: "Innovación y Gestión",
      colorPrimario: "#FF8A29",
      colorSecundario: "#FFEEDF",
    },
  ])

  //ternario --> condicion ? semuestra : noSemuestra
  // condicion && seMuestra 

  const cambiarMostrar = () => {
    actualizarMostrar(!mostrarFormulario);
  };

  const registrarColobarador = (colaborador) => {
    console.log("Nuevo Colaborador", colaborador );

    //spred operators (...), realiza una copia del actual y le agreguamos otros:
    actualizarColaboradores([...colaboradores, colaborador])
  }

  const eliminarColaborador = (id) =>{
    console.log("Elimnar colaborador", id);
    const nuevoColaboradores = colaboradores.filter((colaborador) => colaborador.id !== id)

    //console.log(nuevoColaboradores);
    actualizarColaboradores(nuevoColaboradores);
  }

  //actualizar color equipo:
  const actualizarColor = (color, id ) =>{
    console.log("Actualizar Color: ", color, id)
    const equiposActualizados = equipos.map((equipo) =>{
      if(equipo.id ===id){
      equipo.colorPrimario = color
      }
      return equipo
    })

    actualizarEquipos(equiposActualizados);
  }


  //crear equipo:
 const crearEquipo = (NuevoEquipo) => {
  console.log("nuevoEquipo", NuevoEquipo);
  actualizarEquipos([...equipos, {...NuevoEquipo, id:uuid}])
 }

 const like = (id) => {
  console.log("Like ", id);
  const colaboradoresActualizados = colaboradores.map((colaborador) => {
    if(colaborador.id === id){
      colaborador.fav = !colaborador.fav
    }
    return colaborador
  })
  actualizarColaboradores(colaboradoresActualizados)
 }


  return (
    <div>
      <Header />
      {/* mostrarFormulario === true ? <Formulario /> : <></>  */}
      {mostrarFormulario && <Formulario 
      equipos={ equipos.map((equipo) => equipo.titulo ) }
      registrarColobarador = {registrarColobarador}
      crearEquipo = {crearEquipo}
      
      />}
      <MiOrg cambiarMostrar={cambiarMostrar} />
      
      {
        equipos.map( (equipo) => <Equipo 
        datos ={equipo} 
        key={equipo.titulo}
        colaboradores ={colaboradores.filter(colaborador => colaborador.equipo ===equipo.titulo)}
        eliminarColaborador = {eliminarColaborador}
        actualizarColor = {actualizarColor}
        like ={like}
        
        />)
        
      }     

      <Footer/>
      
    </div>
  );
}

export default App;
