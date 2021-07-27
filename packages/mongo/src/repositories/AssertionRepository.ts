import {
  Assertion,
  AddAssertionGateway,
  GetAssertionGateway,
  ListAssertionGateway,
  AddAssertionParameter,
} from "@cerberus/core";
import { AssertionModel } from "../models";
import { isValidObjectId } from "mongoose";
import { InvalidId, AssertionNotFound } from "../errors";

export class AssertionRepository
  implements AddAssertionGateway, GetAssertionGateway, ListAssertionGateway
{
  async addAssertion(params: AddAssertionParameter): Promise<Assertion> {
    const assertion = await AssertionModel.create({
      name: params.name,
      issuer: params.issuer,
      subject: params.subject,
      audience: params.audience,

      expiresAt: params.expiresAt,
      notBefore: params.notBefore,
      initiatedAt: params.initiatedAt,
    });

    await assertion.save();

    return new Assertion({
      id: assertion._id.toString(),
      name: assertion.name,
      issuer: assertion.issuer,
      subject: assertion.subject.toString(),
      audience: assertion.audience,

      expiresAt: assertion.expiresAt,
      notBefore: assertion.notBefore,
      initiatedAt: assertion.initiatedAt,
    });
  }

  async getAssertion(id: string): Promise<Assertion> {
    if (!isValidObjectId(id)) {
      throw new InvalidId("The given id string is not a valid id.");
    }

    const assertion = await AssertionModel.findById(id);

    if (!assertion) {
      throw new AssertionNotFound("No assertion found with the given id.");
    }

    return new Assertion({
      id: assertion._id.toString(),
      name: assertion.name,
      issuer: assertion.issuer,
      subject: assertion.subject.toString(),
      audience: assertion.audience,

      expiresAt: assertion.expiresAt,
      notBefore: assertion.notBefore,
      initiatedAt: assertion.initiatedAt,
    });
  }

  async listAssertions(): Promise<Assertion[]> {
    const result = await AssertionModel.find();
    const assertions = result.map((model) => {
      return new Assertion({
        id: model._id.toString(),
        name: model.name,
        issuer: model.issuer,
        subject: model.subject.toString(),
        audience: model.audience,

        expiresAt: model.expiresAt,
        notBefore: model.notBefore,
        initiatedAt: model.initiatedAt,
      });
    });

    return assertions;
  }
}
