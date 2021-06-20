import {
  CreateClientPresenter,
  CreateClientResponse,
} from "../CreateClientPresenter";

export class CreateClientPresenterSpy implements CreateClientPresenter {
  calledWithData: CreateClientResponse;

  async present(data: CreateClientResponse) {
    this.calledWithData = data;
  }
}
