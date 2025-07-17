export default function validateFormData<T extends object>(data: T) {
  return Object.keys(data).every((key) => {
    return !["", null, undefined].includes((data as any)[key]);
  });
}
