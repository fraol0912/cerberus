import { UseCase } from "../UseCase";

export class UseCaseDummy implements UseCase {
  called: boolean = false;

  execute() {
    this.called = true;
  }
}
