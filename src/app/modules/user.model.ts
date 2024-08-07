export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public id_rol: number,
    public projectId?: number
  ) {}
}
