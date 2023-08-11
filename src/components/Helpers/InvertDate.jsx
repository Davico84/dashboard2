export function convertirFecha(fecha) {
    const fechaObjeto = new Date(fecha);
    const dia = fechaObjeto.getDate().toString().padStart(2, "0");
    const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, "0");
    const anio = fechaObjeto.getFullYear().toString();
    return `${dia}-${mes}-${anio}`;
  }


  export function convertirFechaDiasCruzados(fecha) {
    const fechaObjeto = new Date(fecha);
    const dia = fechaObjeto.getDate().toString().padStart(2, "0");
    const mes = (fechaObjeto.getMonth() + 1).toString().padStart(2, "0");
    const anio = fechaObjeto.getFullYear().toString();
    return `${anio}-${mes}-${dia}`;

  }