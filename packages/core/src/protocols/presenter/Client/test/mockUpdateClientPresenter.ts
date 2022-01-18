import {
  UpdateClientPresenter,
  UpdateClientResponse,
} from "../UpdateClientPresenter";

export class UpdateClientPresenterSpy implements UpdateClientPresenter {
  calledWithData: UpdateClientResponse;

  async present(data: UpdateClientResponse) {
    this.calledWithData = data;
  }
}
