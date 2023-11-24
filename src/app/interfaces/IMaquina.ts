interface IHoraMaquinaAtual {
  oleoMotor: number
  oleoHidraulico: number
  filtroOleoMotor: number
  filtroOleoHidraulico: number
  filtroCombustivel: number
}

interface IHoraMaquinaAviso {
  oleoMotor: number
  oleoHidraulico: number
  filtroOleoMotor: number
  filtroOleoHidraulico: number
  filtroCombustivel: number
}

export interface IMaquina {
  id?: string;
  nome: string;
  marca: string;
  observacao: string;
  status: string;
  horaAtual: IHoraMaquinaAtual
  horaAviso: IHoraMaquinaAviso
}