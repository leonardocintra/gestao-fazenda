interface IHoraMaquina {
  horaFiltroCombustivel: number
  horaFiltroOleoMotor: number
}

export interface IMaquina {
  id?: string;
  nome: string;
  marca: string;
  observacao: string;
  status: string;
  hora: IHoraMaquina
}