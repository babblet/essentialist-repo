import { Request } from "express";
import { isMissingKeys, isUUID } from "../shared";

export class CreateStudentDTO {
  private constructor(public name: string) {}
  static fromRequest(req: Request): CreateStudentDTO | undefined {
    if (isMissingKeys(req.body, ["name"])) {
      return undefined;
    }

    return new CreateStudentDTO(req.body.name);
  }
}

export class ReadStudentDTO {
  private constructor(public id: string) {}
  static fromRequest(req: Request): ReadStudentDTO | undefined {
    const { id } = req.params;

    if (!isUUID(id)) {
      return undefined;
    }

    return new ReadStudentDTO(id);
  }
}

export class ReadStudentAssignmentsDTO {
  private constructor(public id: string) {}
  static fromRequest(req: Request): ReadStudentAssignmentsDTO | undefined {
    const { id } = req.params;

    if (!isUUID(id)) {
      return undefined;
    }

    return new ReadStudentAssignmentsDTO(id);
  }
}

export class ReadStudentGradesDTO {
  private constructor(public id: string) {}
  static fromRequest(req: Request): ReadStudentGradesDTO | undefined {
    const { id } = req.params;

    if (!isUUID(id)) {
      return undefined;
    }

    return new ReadStudentGradesDTO(id);
  }
}
