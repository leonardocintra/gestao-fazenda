"use client";

import { InformationCircleIcon } from "@heroicons/react/solid";
import {
  BadgeDelta,
  DeltaType,
  Flex,
  Icon,
  MultiSelect,
  MultiSelectItem,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Title,
} from "@tremor/react";
import { useEffect, useState } from "react";
import BotaoNavegacao from "../components/BotaoNavegacao";
import firebaseData from "../firebase/config";
import { IOperador } from "../interfaces/IOperador";
import { collection, getDocs } from "firebase/firestore";

const deltaTypes: { [key: string]: DeltaType } = {
  almocando: "unchanged",
  trabalhando: "moderateIncrease",
  afastado: "moderateDecrease",
};

export default function OperadorPage() {
  const db = firebaseData.db;
  const [operadores, setOperadores] = useState<IOperador[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshotOperador = await getDocs(collection(db, "operador"));
      const operadoresData: IOperador[] = [];

      querySnapshotOperador.forEach((doc) => {
        operadoresData.push({
          id: doc.id,
          nome: doc.data().nome,
          dataNascimento: doc.data().dataNascimento,
          observacao: doc.data().observacao,
          status: "trabalhando",
        });
      });

      setOperadores(operadoresData);
    };

    fetchData();
  }, [db]);

  const isSalesPersonSelected = (operador: IOperador) =>
    (operador.status === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(operador.nome) || selectedNames.length === 0);

  return (
    <>
      <div className="flex justify-end">
        <BotaoNavegacao
          url="/operador/novo-operador"
          description="Novo operador"
          tooltip="Cadastrar um novo funcionario"
        />
      </div>
      <div>
        <Flex
          className="space-x-0.5"
          justifyContent="start"
          alignItems="center"
        >
          <Title> Meus operadores </Title>
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip="Shows sales performance per employee"
          />
        </Flex>
      </div>
      <div className="flex space-x-2">
        <MultiSelect
          className="max-w-full sm:max-w-xs"
          onValueChange={setSelectedNames}
          placeholder="Operador..."
        >
          {operadores.map((item) => (
            <MultiSelectItem key={item.id} value={item.nome}>
              {item.nome}
            </MultiSelectItem>
          ))}
        </MultiSelect>
        <Select
          className="max-w-full sm:max-w-xs"
          defaultValue="all"
          onValueChange={setSelectedStatus}
        >
          <SelectItem value="all">Status</SelectItem>
          <SelectItem value="trabalhando">trabalhando</SelectItem>
          <SelectItem value="almocando">almocando</SelectItem>
          <SelectItem value="afastado">afastado</SelectItem>
        </Select>
      </div>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell className="text-right">Status</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {operadores
            .filter((item) => isSalesPersonSelected(item))
            .map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.nome}</TableCell>
                <TableCell className="text-right">
                  <BadgeDelta deltaType={deltaTypes[item.status]} size="xs">
                    {item.status}
                  </BadgeDelta>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
