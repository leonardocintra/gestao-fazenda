"use client";

import { InformationCircleIcon } from "@heroicons/react/solid";
import {
  Badge,
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
import { collection, getDocs } from "firebase/firestore";
import { IMaquina } from "../interfaces/IMaquina";

const deltaTypes: { [key: string]: DeltaType } = {
  almocando: "unchanged",
  trabalhando: "moderateIncrease",
  afastado: "moderateDecrease",
};

export default function MaquinaPage() {
  const db = firebaseData.db;
  const [maquinas, setMaquinas] = useState<IMaquina[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshotMaquinas = await getDocs(collection(db, "maquinas"));
      const maquinasData: IMaquina[] = [];

      querySnapshotMaquinas.forEach((doc) => {
        maquinasData.push({
          id: doc.id,
          nome: doc.data().nome,
          marca: doc.data().marca,
          horaAtual: {
            oleoMotor: doc.data().horaAtual.oleoMotor,
            oleoHidraulico: doc.data().horaAtual.oleoHidraulico,
            filtroCombustivel: doc.data().horaAtual.filtroCombustivel,
            filtroOleoHidraulico: doc.data().horaAtual.filtroOleoHidraulico,
            filtroOleoMotor: doc.data().horaAtual.filtroOleoMotor,
          },
          horaAviso: {
            oleoMotor: doc.data().horaAviso.oleoMotor,
            oleoHidraulico: doc.data().horaAviso.oleoHidraulico,
            filtroCombustivel: doc.data().horaAviso.filtroCombustivel,
            filtroOleoHidraulico: doc.data().horaAviso.filtroOleoHidraulico,
            filtroOleoMotor: doc.data().horaAviso.filtroOleoMotor,
          },
          observacao: doc.data().observacao,
          status: doc.data().status,
        });
      });

      setMaquinas(maquinasData);
    };

    fetchData();
  }, [db]);

  const isSalesPersonSelected = (maquina: IMaquina) =>
    (maquina.status === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(maquina.nome) || selectedNames.length === 0);

  return (
    <>
      <div className="flex justify-end">
        <BotaoNavegacao
          url="/maquinas/nova-maquina"
          description="Nova maquina"
          color="red"
          tooltip="Cadastrar um novo maquinario"
        />
      </div>
      <div>
        <Flex
          className="space-x-0.5"
          justifyContent="start"
          alignItems="center"
        >
          <Title>Minhas maquinas </Title>
          <Icon
            icon={InformationCircleIcon}
            variant="simple"
            tooltip="Shows sales performance per employee"
          />
        </Flex>
      </div>
      <div className="flex space-x-2">
        <MultiSelect
          placeholderSearch="Procurar ..."
          className="max-w-full sm:max-w-xs"
          onValueChange={setSelectedNames}
          placeholder="Maquina..."
        >
          {maquinas.map((item) => (
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
            <TableHeaderCell>Nome / Marca</TableHeaderCell>
            <TableHeaderCell className="text-right">Status</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {maquinas
            .filter((item) => isSalesPersonSelected(item))
            .map((item) => (
              <TableRow key={item.id} className="hover:bg-red-100 duration-75">
                <TableCell>
                  {item.nome} {item.marca}
                </TableCell>
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
