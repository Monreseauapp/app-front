export default function validateFormData<T extends object>(data: T) {
  return Object.keys(data).every((key) => {
    console.log(
      `Validating key: ${key}, value: ${(data as any)[key]}`,
      ":",
      !["", null, undefined].includes((data as any)[key])
    );
    return !["", null, undefined].includes((data as any)[key]);
  });
}
