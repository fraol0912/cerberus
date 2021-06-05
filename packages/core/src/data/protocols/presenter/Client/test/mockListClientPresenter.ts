import { ListClientPresenter, Client } from "../ListClientPresenter";

export class ListClientPresenterSpy implements ListClientPresenter {
  calledWithData: Client[];

  present(data: Client[]) {
    this.calledWithData = data;
  }
}
