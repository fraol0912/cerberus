import {
  AssertionResponse,
  ListAssertionPresenter,
} from "../ListAssertionPresenter";

export class ListAssertionPresenterSpy implements ListAssertionPresenter {
  calledWithData: AssertionResponse[];

  async present(data: AssertionResponse[]) {
    this.calledWithData = data;
  }
}
