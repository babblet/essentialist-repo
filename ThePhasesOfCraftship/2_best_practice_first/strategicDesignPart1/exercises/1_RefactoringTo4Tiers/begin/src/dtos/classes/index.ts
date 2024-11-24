import { Request } from "express";
import { isMissingKeys, isUUID } from "../../shared";

export class CreateClassDTO {
  private constructor(public name: string) {}
  static fromRequest(req: Request): CreateClassDTO | undefined {
    if (isMissingKeys(req.body, ["name"])) {
      return undefined;
    }

    return new CreateClassDTO(req.body.name);
  }
}

export class ReadClassAssignmentsDTO {
  private constructor(public id: string) {}
  static fromRequest(req: Request): ReadClassAssignmentsDTO | undefined {
    const { id } = req.params;

    if (!isUUID(id)) {
      return undefined;
    }

    return new ReadClassAssignmentsDTO(id);
  }
}
