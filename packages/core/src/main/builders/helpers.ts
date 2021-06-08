export function getProperty(
  hashMap: Map<string, string>,
  propertyName: string,
  errorName: string
) {
  const propertyValue = hashMap.get(propertyName);
  if (!propertyValue) {
    throw new Error(errorName);
  }
  return propertyValue;
}

export function getPassword(hashMap: Map<string, string>) {
  return getProperty(hashMap, "password", "Password not given.");
}

export function getClientName(hashMap: Map<string, string>) {
  return getProperty(hashMap, "client:name", "Client name not given.");
}

export function getClientId(hashMap: Map<string, string>) {
  return getProperty(hashMap, "client:id", "Client id not given.");
}
