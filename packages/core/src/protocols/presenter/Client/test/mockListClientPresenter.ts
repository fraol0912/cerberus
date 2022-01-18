import { ListClientPresenter, ClientResponse } from "../ListClientPresenter";

export class ListClientPresenterSpy implements ListClientPresenter {
  calledWithData: ClientResponse[];

  async present(data: ClientResponse[]) {
    this.calledWithData = data;
  }
}
