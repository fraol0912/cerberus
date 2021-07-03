import { Presenter } from "../Presenter";

export interface IntrospectAssertionPresenter extends Presenter {
  present(data: IntrospectAssertionResponse): Promise<void>;
}

export interface IntrospectAssertionResponse {
  valid: boolean;
}
