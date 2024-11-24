import { Request } from "express";
import { isMissingKeys } from "../shared/shared";
import {
  DTOIncorredDataInKeysException,
  DTOMissingKeysException,
  MalformedUUIDException,
} from "../shared/exceptions";

export class CreateStudentAssignmentDTO {
  private constructor(public studentId: string, public assignmentId: string) {}
  static fromRequest(req: Request): CreateStudentAssignmentDTO {
    if (isMissingKeys(req.body, ["studentId", "assignmentId"])) {
      throw new DTOMissingKeysException(["studentId", "assignmentId"]);
    }

    return new CreateStudentAssignmentDTO(
      req.body.studentId,
      req.body.assignmentId
    );
  }
}

export class SubmitStudentAssignmentDTO {
  private constructor(public id: string) {}
  static fromRequest(req: Request): SubmitStudentAssignmentDTO {
    if (isMissingKeys(req.body, ["id"])) {
      throw new MalformedUUIDException();
    }

    return new SubmitStudentAssignmentDTO(req.body.id);
  }
}

export class GradeStudentAssignmentDTO {
  private constructor(public id: string, public grade: string) {}
  static fromRequest(req: Request): GradeStudentAssignmentDTO {
    if (isMissingKeys(req.body, ["id", "grade"])) {
      throw new DTOMissingKeysException(["id", "grade"]);
    }

    const { grade } = req.body;
    if (!["A", "B", "C", "D"].includes(grade)) {
      throw new DTOIncorredDataInKeysException("grade", "A, B, C, D");
    }

    return new GradeStudentAssignmentDTO(req.body.id, req.body.grade);
  }
}
