import { TransformFnParams } from 'class-transformer';

export function orderByTransformer({ value }: TransformFnParams):object{
  if (!value || typeof value !== 'string') return {}; // Check if the value is valid

  const orderBy: { [key: string]: 'asc' | 'desc' } = {}; // Correct sort type
  value.split(',').forEach((field) => {
    const direction = field.startsWith('-') ? 'desc' : 'asc'; // Use 'desc' for descending, 'asc' for ascending
    const fieldName = field.startsWith('-') ? field.slice(1) : field;
    orderBy[fieldName] = direction;
  });
  console.log(orderBy);

  return orderBy;
}
