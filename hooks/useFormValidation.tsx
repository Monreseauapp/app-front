export default function useFormValidation<T extends object>(data: T) {
  return Object.keys(data).every((key) => {
    console.log(key, (data as any)[key]);
    return (data as any)[key];
  });
}
