import { Request } from "express";
import { isMissingKeys } from "../../shared";

export class CreateClassEnrollmentDTO {
  private constructor(public studentId: string, public classId: string) {}
  static fromRequest(req: Request): CreateClassEnrollmentDTO | undefined {
    if (isMissingKeys(req.body, ["studentId", "classId"])) {
      return undefined;
    }

    return new CreateClassEnrollmentDTO(req.body.studentId, req.body.classId);
  }
}
