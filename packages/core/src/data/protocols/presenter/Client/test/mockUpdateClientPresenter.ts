import {
  UpdateClientPresenter,
  UpdateClientResponse,
} from "../UpdateClientPresenter";

export class UpdateClientPresenterSpy implements UpdateClientPresenter {
  calledWithData: UpdateClientResponse;

  present(data: UpdateClientResponse) {
    this.calledWithData = data;
  }
}
