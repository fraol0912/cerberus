import {
  GetAssertionResponse,
  GetAssertionPresenter,
} from "../GetAssertionPresenter";

export class GetAssertionPresenterSpy implements GetAssertionPresenter {
  calledWithData: GetAssertionResponse;

  async present(data: GetAssertionResponse) {
    this.calledWithData = data;
  }
}
