export interface DeleteClientGateway {
  deleteClient(id: string): Promise<boolean>;
}
