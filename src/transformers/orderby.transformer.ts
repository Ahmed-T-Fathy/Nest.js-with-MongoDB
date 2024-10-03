import { TransformFnParams } from 'class-transformer';

export function orderByTransformer({
  value,
}: TransformFnParams): object {
  if (!value || typeof value !== 'string') return {};  // Check if the value is valid

  const sortObj: { [key: string]: number } = {};  // Initialize an empty object

  // Split the value by commas, and process each field
  value.split(',').forEach((field) => {
    const direction = field.startsWith('-') ? -1 : 1;  // Determine direction (-1 for descending, 1 for ascending)
    const fieldName = field.startsWith('-') ? field.slice(1) : field;  // Remove '-' if present
    sortObj[fieldName] = direction;  // Add to the result object
  });
  console.log(sortObj);
  
  return sortObj;
}
