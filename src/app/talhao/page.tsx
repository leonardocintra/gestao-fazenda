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
import { collection, getDocs } from "firebase/firestore";
import { ITalhao } from "../interfaces/ITalhao";

const deltaTypes: { [key: string]: DeltaType } = {
  parada: "unchanged",
  ativa: "moderateIncrease",
  desativada: "moderateDecrease",
};

export default function TalhaoPage() {
  const db = firebaseData.db;
  const [talhoes, setTalhoes] = useState<ITalhao[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshotOperador = await getDocs(collection(db, "talhao"));
      const talhoesData: ITalhao[] = [];

      querySnapshotOperador.forEach((doc) => {
        talhoesData.push({
          id: doc.id,
          nome: doc.data().nome,
          areaPlantada: doc.data().areaPlantada,
          dataInicio: doc.data().dataInicio,
          observacao: doc.data().observacao,
          status: doc.data().status,
        });
      });

      setTalhoes(talhoesData);
    };

    fetchData();
  }, [db]);

  const isSalesPersonSelected = (talhao: ITalhao) =>
    (talhao.status === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(talhao.nome) || selectedNames.length === 0);

  return (
    <>
      <div className="flex justify-end">
        <BotaoNavegacao
          url="/talhao/novo-talhao"
          description="Novo talhão"
          tooltip="Cadastrar um novo talhao"
        />
      </div>
      <div>
        <Flex
          className="space-x-0.5"
          justifyContent="start"
          alignItems="center"
        >
          <Title> Meus talhões </Title>
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
          placeholder="Talhão ..."
        >
          {talhoes.map((item) => (
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
          <SelectItem value="ativa">ativa</SelectItem>
          <SelectItem value="parada">parada</SelectItem>
          <SelectItem value="desativada">desativada</SelectItem>
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
          {talhoes
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
