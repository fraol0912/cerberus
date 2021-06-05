import { ListClientPresenter, ClientResponse } from "../ListClientPresenter";

export class ListClientPresenterSpy implements ListClientPresenter {
  calledWithData: ClientResponse[];

  present(data: ClientResponse[]) {
    this.calledWithData = data;
  }
}
