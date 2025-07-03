export default function useFormValidation<T extends object>(data: T) {
  return Object.keys(data).every((key) => (data as any)[key]);
}
