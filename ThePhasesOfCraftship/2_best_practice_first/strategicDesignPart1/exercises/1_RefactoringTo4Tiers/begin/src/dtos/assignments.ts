import { Request } from "express";
import { isMissingKeys, isUUID } from "../shared/shared";
import {
  DTOMissingKeysException,
  MalformedUUIDException,
} from "../shared/exceptions";

export class CreateAssignmentDTO {
  private constructor(public classId: string, public title: string) {}
  static fromRequest(req: Request): CreateAssignmentDTO {
    if (isMissingKeys(req.body, ["classId", "title"])) {
      throw new DTOMissingKeysException(["classId", "title"]);
    }

    return new CreateAssignmentDTO(req.body.classId, req.body.title);
  }
}

export class ReadAssignmentDTO {
  private constructor(public id: string) {}
  static fromRequest(req: Request): ReadAssignmentDTO {
    const { id } = req.params;

    if (!isUUID(id)) {
      throw new MalformedUUIDException();
    }

    return new ReadAssignmentDTO(id);
  }
}
