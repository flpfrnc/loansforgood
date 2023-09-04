import { FormEvent, useEffect, useState } from "react";
import { Field, fieldMapper } from "../interfaces";

export default function FormPage() {
  const [availableFields, setAvailableFields] = useState<Field[]>([]);
  const [successMessage, setSuccessMessage] = useState({
    message: "Sua proposta foi enviada!",
    isShown: false,
  });
  const [fieldStates, setFieldStates] = useState<Record<string, string | number>>({
    name: "",
    document: "",
    birthDate: "",
    amount: 0,
    phone: "",
    email: "",
    motherName: "",
    occupation: "",
  });

  function getCsrfToken() {
    return decodeURIComponent(document.cookie.split("csrftoken=")[1]);
  }

  /**
   * Guarantees that non numeric fields (inner array) won't receive number inputs
   * @param field string
   * @param value string | number
   * @returns `string | number`
   */
  function sanitizeNonNumeric(field: string, value: string | number) {
    if (["name", "motherName"].includes(field)) {
      return (value as string).replace(/[\d-]/g, "");
    }

    return value;
  }

  async function sendProposal(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = {
      name: fieldStates.name || undefined,
      document: fieldStates.document || undefined,
      birth_date: fieldStates.birthDate || undefined,
      amount: fieldStates.amount || undefined,
      phone: fieldStates.phone || undefined,
      email: fieldStates.email || undefined,
      mother_name: fieldStates.motherName || undefined,
      occupation: fieldStates.occupation || undefined,
    };

    try {
      await fetch(import.meta.env.VITE_API_BASE_URL + "loans/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken(),
        },
        body: JSON.stringify(data),
      });

      setFieldStates({
        name: "",
        document: "",
        birthDate: "",
        amount: 0,
        phone: "",
        email: "",
        motherName: "",
        occupation: "",
      });
      setSuccessMessage({ ...successMessage, isShown: true });

      setTimeout(() => {
        setSuccessMessage({ ...successMessage, isShown: false });
      }, 5000);
    } catch (error) {
      alert("Ocorreu um erro no envio da proposta");
      console.error(error);
    }
  }

  async function fetchFields() {
    const fields: Field[] = await fetch(import.meta.env.VITE_API_BASE_URL + "fields", {
      method: "GET",
    }).then((response) => response.json());

    fields.map((field: Field) =>
      setFieldStates({
        ...fieldStates,
        [fieldMapper[field.field_name]]: field.field_type === "number" ? 0 : "",
      })
    );

    setAvailableFields(fields.filter((field) => field.is_visible === true));
  }

  useEffect(() => {
    fetchFields();
  }, []);

  return (
    <main className="w-full h-[calc(100vh-8rem)] flex justify-center items-center p-10 bg-[#252569]">
      <form onSubmit={sendProposal} className="flex rounded-md overflow-hidden shadow-lg">
        <div className="w-[25vw] max-w-[25vw] bg-[#4A3EB5] hidden sm:hidden lg:flex text-white p-12 flex-col items-center justify-center text-center">
          <span className="italic text-lg font-bold">Loans For Good (LFG)</span>
          <span className="italic text-sm">
            Empresa multinacional especializada na concessão de crédito.
          </span>
        </div>
        <div className="shadow-lg p-10 min-h-[500px] min-w-[25vw] bg-white flex flex-col gap-4">
          <h1 className="py-4 text-lg italic font-bold text-[#4A3EB5] text-center">
            Solicite sua simulação
          </h1>
          <div className="flex flex-col items-center justify-center gap-2">
            {availableFields.map((field, index) => (
              <div className="relative w-full" key={field.field_name + index}>
                <input
                  required={field.is_required}
                  className="w-full px-2 outline-none border border-gray-150 h-[42px] rounded-md peer"
                  type={field.field_type}
                  id={fieldMapper[field.field_name]}
                  name={fieldMapper[field.field_name]}
                  placeholder=""
                  value={sanitizeNonNumeric(
                    fieldMapper[field.field_name],
                    fieldStates[fieldMapper[field.field_name]]
                  )}
                  onChange={(e) => {
                    setFieldStates({
                      ...fieldStates,
                      [fieldMapper[field.field_name]]: e.target.value,
                    });
                  }}
                />
                <label
                  className={
                    "absolute text-sm text-gray-500 duration-300 transform bg-white rounded-lg -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-[1.1rem] left-1"
                  }
                  htmlFor={fieldMapper[field.field_name]}
                >
                  {field.field_name}
                </label>
              </div>
            ))}
          </div>
          <div className="w-full text-center">
            <button
              className="w-full mt-auto my-4 p-4 border h-[42px] flex justify-center items-center bg-[#4A3EB5] hover:bg-[#5340f5] active:bg-[#2f248f] text-white"
              type="submit"
            >
              Enviar Proposta
            </button>
            {successMessage.isShown && (
              <small className="text-green-600">{successMessage.message}</small>
            )}
          </div>
        </div>
      </form>
    </main>
  );
}
