import { Request } from "express";
import { isMissingKeys } from "../shared/shared";
import { DTOMissingKeysException } from "../shared/exceptions";

export class CreateClassEnrollmentDTO {
  private constructor(public studentId: string, public classId: string) {}
  static fromRequest(req: Request): CreateClassEnrollmentDTO {
    if (isMissingKeys(req.body, ["studentId", "classId"])) {
      throw new DTOMissingKeysException(["studentId", "classId"]);
    }

    return new CreateClassEnrollmentDTO(req.body.studentId, req.body.classId);
  }
}
