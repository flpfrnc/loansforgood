export interface Field {
  id: number;
  field_name: string;
  field_type: string;
  is_required: boolean;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export const fieldMapper: Record<string, string> = {
  Nome: "name",
  Documento: "document",
  ["Data de Nascimento"]: "birthDate",
  Valor: "amount",
  Telefone: "phone",
  Email: "email",
  ["Nome da Mãe"]: "motherName",
  Ocupação: "occupation",
};
