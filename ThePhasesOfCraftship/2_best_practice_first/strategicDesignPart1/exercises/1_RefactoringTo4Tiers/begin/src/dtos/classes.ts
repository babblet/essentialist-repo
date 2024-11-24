import { Request } from "express";
import { isMissingKeys, isUUID } from "../shared/shared";
import {
  DTOMissingKeysException,
  MalformedUUIDException,
} from "../shared/exceptions";

export class CreateClassDTO {
  private constructor(public name: string) {}
  static fromRequest(req: Request): CreateClassDTO {
    if (isMissingKeys(req.body, ["name"])) {
      throw new DTOMissingKeysException(["name"]);
    }

    return new CreateClassDTO(req.body.name);
  }
}

export class ReadClassAssignmentsDTO {
  private constructor(public id: string) {}
  static fromRequest(req: Request): ReadClassAssignmentsDTO {
    const { id } = req.params;

    if (!isUUID(id)) {
      throw new MalformedUUIDException();
    }

    return new ReadClassAssignmentsDTO(id);
  }
}
