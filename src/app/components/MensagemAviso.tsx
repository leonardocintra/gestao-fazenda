import { Callout, CalloutProps, Color } from "@tremor/react";
import { ElementType } from "react";

type MenagemAvisoProps = {
  title: string;
  mensagem: string;
  color?: Color;
  icon?: ElementType;
};

export default function MensagemAviso(props: MenagemAvisoProps) {
  return (
    <Callout
      className="mt-4"
      title={props.title}
      icon={props.icon}
      color={props.color}
    >
      {props.mensagem}
    </Callout>
  );
}
