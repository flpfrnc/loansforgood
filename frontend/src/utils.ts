/**
 * Guarantees that non numeric fields (inner array) won't receive number inputs
 * @param field string
 * @param value string | number
 * @returns `string | number`
 */
export function sanitizeNonNumeric(field: string, value: string | number) {
  if (["name", "motherName"].includes(field)) {
    return (value as string).replace(/[\d-]/g, "");
  }
  return value;
}
