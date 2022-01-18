import {
  AddAssertionGateway,
  GetAssertionGateway,
  ListAssertionGateway,
  DeleteAssertionGateway,
} from "@cerberus/core";

export interface AssertionRepository
  extends AddAssertionGateway,
    GetAssertionGateway,
    ListAssertionGateway,
    DeleteAssertionGateway {}
