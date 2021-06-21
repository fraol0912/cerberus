import {
  CreateAssertionResponse,
  CreateAssertionPresenter,
} from "../CreateAssertionPresenter";

export class CreateAssertionPresenterSpy implements CreateAssertionPresenter {
  calledWithData: CreateAssertionResponse;

  async present(data: CreateAssertionResponse) {
    this.calledWithData = data;
  }
}
