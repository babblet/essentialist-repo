import { Request } from "express";
import { isMissingKeys, isUUID } from "../shared/shared";
import {
  DTOMissingKeysException,
  MalformedUUIDException,
} from "../shared/exceptions";

export class CreateStudentDTO {
  private constructor(public name: string) {}
  static fromRequest(req: Request): CreateStudentDTO {
    if (isMissingKeys(req.body, ["name"])) {
      throw new DTOMissingKeysException(["name"]);
    }

    return new CreateStudentDTO(req.body.name);
  }
}

export class ReadStudentDTO {
  private constructor(public id: string) {}
  static fromRequest(req: Request): ReadStudentDTO {
    const { id } = req.params;

    if (!isUUID(id)) {
      throw new MalformedUUIDException();
    }

    return new ReadStudentDTO(id);
  }
}

export class ReadStudentAssignmentsDTO {
  private constructor(public id: string) {}
  static fromRequest(req: Request): ReadStudentAssignmentsDTO {
    const { id } = req.params;

    if (!isUUID(id)) {
      throw new MalformedUUIDException();
    }

    return new ReadStudentAssignmentsDTO(id);
  }
}

export class ReadStudentGradesDTO {
  private constructor(public id: string) {}
  static fromRequest(req: Request): ReadStudentGradesDTO {
    const { id } = req.params;

    if (!isUUID(id)) {
      throw new MalformedUUIDException();
    }

    return new ReadStudentGradesDTO(id);
  }
}
