import { GetClientPresenter, GetClientResponse } from "../GetClientPresenter";

export class GetClientPresenterSpy implements GetClientPresenter {
  calledWithData: GetClientResponse;

  present(data: GetClientResponse) {
    this.calledWithData = data;
  }
}
