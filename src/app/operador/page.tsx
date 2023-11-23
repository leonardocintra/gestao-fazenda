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
import { useState } from "react";
import BotaoNavegacao from "../components/BotaoNavegacao";

type SalesPerson = {
  name: string;
  leads: number;
  status: string;
};

const salesPeople: SalesPerson[] = [
  {
    name: "João Marcos",
    leads: 45,
    status: "trabalhando",
  },
  {
    name: "Lena Whitehouse",
    leads: 35,
    status: "almocando",
  },
  {
    name: "Phil Less",
    leads: 52,
    status: "afastado",
  },
  {
    name: "John Camper",
    leads: 22,
    status: "trabalhando",
  },
  {
    name: "Max Balmoore",
    leads: 49,
    status: "trabalhando",
  },
];

const deltaTypes: { [key: string]: DeltaType } = {
  almocando: "unchanged",
  trabalhando: "moderateIncrease",
  afastado: "moderateDecrease",
};

export default function OperadorPage() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const isSalesPersonSelected = (salesPerson: SalesPerson) =>
    (salesPerson.status === selectedStatus || selectedStatus === "all") &&
    (selectedNames.includes(salesPerson.name) || selectedNames.length === 0);

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
          placeholder="Select Salespeople..."
        >
          {salesPeople.map((item) => (
            <MultiSelectItem key={item.name} value={item.name}>
              {item.name}
            </MultiSelectItem>
          ))}
        </MultiSelect>
        <Select
          className="max-w-full sm:max-w-xs"
          defaultValue="all"
          onValueChange={setSelectedStatus}
        >
          <SelectItem value="all">All Performances</SelectItem>
          <SelectItem value="trabalhando">trabalhando</SelectItem>
          <SelectItem value="almocando">almocando</SelectItem>
          <SelectItem value="afastado">afastado</SelectItem>
        </Select>
      </div>
      <Table className="mt-6">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nome</TableHeaderCell>
            <TableHeaderCell className="text-right">Nascimento</TableHeaderCell>
            <TableHeaderCell className="text-right">Status</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {salesPeople
            .filter((item) => isSalesPersonSelected(item))
            .map((item) => (
              <TableRow key={item.name}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.leads}</TableCell>
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
