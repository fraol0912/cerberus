import {
  AddAssertionGateway,
  GetAssertionGateway,
  ListAssertionGateway,
} from "@cerberus/core";

export interface AssertionRepository
  extends AddAssertionGateway,
    GetAssertionGateway,
    ListAssertionGateway {}
