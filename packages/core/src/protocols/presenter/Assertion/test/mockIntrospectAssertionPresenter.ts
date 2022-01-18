import {
  IntrospectAssertionResponse,
  IntrospectAssertionPresenter,
} from "../IntrospectAssertionPresenter";

export class IntrospectAssertionPresenterSpy
  implements IntrospectAssertionPresenter
{
  calledWithData: IntrospectAssertionResponse;

  async present(data: IntrospectAssertionResponse) {
    this.calledWithData = data;
  }
}
