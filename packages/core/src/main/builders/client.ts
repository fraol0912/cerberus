import {
  GetClientRequest,
  ListClientRequest,
  CreateClientRequest,
  DeleteClientRequest,
  UpdateClientRequest,
} from "@cerberus/core/protocols/requests";
import { RequestBuilder } from "@cerberus/core/builders";
import { getClientId, getClientName, getPassword } from "./helpers";

const clientRequestBuilder = new RequestBuilder();

clientRequestBuilder.registerBuilder("CLIENT:CREATE", (hashMap) => {
  const password = getPassword(hashMap);
  const clientName = getClientName(hashMap);

  const request: CreateClientRequest = {
    encodedAdminPassword: password,
    name: clientName,
  };

  return request;
});

clientRequestBuilder.registerBuilder("CLIENT:DELETE", (hashMap) => {
  const password = getPassword(hashMap);
  const clientId = getClientId(hashMap);

  const request: DeleteClientRequest = {
    encodedAdminPassword: password,
    id: clientId,
  };

  return request;
});

clientRequestBuilder.registerBuilder("CLIENT:GET", (hashMap) => {
  const password = getPassword(hashMap);
  const clientId = getClientId(hashMap);

  const request: GetClientRequest = {
    encodedAdminPassword: password,
    id: clientId,
  };

  return request;
});

clientRequestBuilder.registerBuilder("CLIENT:UPDATE", (hashMap) => {
  const password = getPassword(hashMap);
  const clientId = getClientId(hashMap);
  const clientName = getClientName(hashMap);

  const request: UpdateClientRequest = {
    encodedAdminPassword: password,
    id: clientId,
    name: clientName,
  };

  return request;
});

clientRequestBuilder.registerBuilder("CLIENT:LIST", (hashMap) => {
  const password = getPassword(hashMap);
  const clientsAfterId = hashMap.get("clients:after");
  const clientsLimit = hashMap.get("clients:limit");
  const clientsSort = hashMap.get("clients:sort");

  const request: ListClientRequest = {
    encodedAdminPassword: password,
  };

  if (clientsSort) {
    request.sort = clientsSort;
  }

  if (clientsAfterId) {
    request.after = clientsAfterId;
  }

  if (clientsLimit) {
    request.limit = parseInt(clientsLimit);
  }

  return request;
});

export default clientRequestBuilder;
