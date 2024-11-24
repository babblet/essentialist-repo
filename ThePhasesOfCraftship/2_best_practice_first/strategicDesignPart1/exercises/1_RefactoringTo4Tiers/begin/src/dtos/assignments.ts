import { Request } from "express";
import { isMissingKeys, isUUID } from "../shared";

export class CreateAssignmentDTO {
  private constructor(public classId: string, public title: string) {}
  static fromRequest(req: Request): CreateAssignmentDTO | undefined {
    if (isMissingKeys(req.body, ["classId", "title"])) {
      return undefined;
    }

    return new CreateAssignmentDTO(req.body.classId, req.body.title);
  }
}

export class ReadAssignmentDTO {
  private constructor(public id: string) {}
  static fromRequest(req: Request): ReadAssignmentDTO | undefined {
    const { id } = req.params;

    if (!isUUID(id)) {
      return undefined;
    }

    return new ReadAssignmentDTO(id);
  }
}
