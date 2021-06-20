import { GetClientPresenter, GetClientResponse } from "../GetClientPresenter";

export class GetClientPresenterSpy implements GetClientPresenter {
  calledWithData: GetClientResponse;

  async present(data: GetClientResponse) {
    this.calledWithData = data;
  }
}
