import { DeleteClientPresenter } from "../DeleteClientPresenter";

export class CreateClientPresenterSpy implements DeleteClientPresenter {
  calledWithData: boolean;

  present(deleted: boolean) {
    this.calledWithData = deleted;
  }
}
