import { Request } from "express";
import { isMissingKeys } from "../../shared";

export class CreateStudentAssignmentDTO {
  private constructor(public studentId: string, public assignmentId: string) {}
  static fromRequest(req: Request): CreateStudentAssignmentDTO | undefined {
    if (isMissingKeys(req.body, ["studentId", "assignmentId"])) {
      return undefined;
    }

    return new CreateStudentAssignmentDTO(
      req.body.studentId,
      req.body.assignmentId
    );
  }
}

export class SubmitStudentAssignmentDTO {
  private constructor(public id: string) {}
  static fromRequest(req: Request): SubmitStudentAssignmentDTO | undefined {
    if (isMissingKeys(req.body, ["id"])) {
      return undefined;
    }

    return new SubmitStudentAssignmentDTO(req.body.id);
  }
}

export class GradeStudentAssignmentDTO {
  private constructor(public id: string, public grade: string) {}
  static fromRequest(req: Request): GradeStudentAssignmentDTO | undefined {
    if (isMissingKeys(req.body, ["id", "grade"])) {
      return undefined;
    }

    return new GradeStudentAssignmentDTO(req.body.id, req.body.grade);
  }
}
