export class Client {
    constructor(
      public id: number,
      public nombre: string,
      public edad: number,
      public iglesia: string,
      public email: string,
      public telefono: number,
      public fecha_registro: string,
      public estatus: number,
      public instrumento: string,
      public id_instrumento: number,
      public id_pago: number,
      public id_evento_url: string,
      public ruta_pago: string,
    ) {}
}
  