import {
  PrismaClient,
  Student,
  StudentAssignment,
  Class,
  ClassEnrollment,
  Assignment,
} from "@prisma/client";
import { objectEnumValues } from "@prisma/client/runtime";
import {
  AssignmentNotFoundException,
  ClassEnrollmentNotFoundException,
  ClassNotFoundException,
  StudentAssignmentNotFoundException,
  StudentNotFoundException,
} from "./exceptions";

export class Database {
  constructor(private readonly client: PrismaClient) {}

  // Students
  async createStudent(name: string): Promise<Student> {
    const student = await this.client.student.create({
      data: {
        name,
      },
    });

    return student;
  }

  async findStudentById(id: string): Promise<Student> {
    const student = await this.client.student.findUnique({
      where: {
        id,
      },
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
    });

    if (!student) {
      throw new StudentNotFoundException();
    }

    return student;
  }

  async getAllStudents(): Promise<Student[]> {
    const students = await this.client.student.findMany({
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    return students;
  }

  // Student Assignments
  async findStudentAssignmentById(id: string): Promise<StudentAssignment> {
    const studentAssignment = await this.client.studentAssignment.findUnique({
      where: {
        id,
      },
    });

    if (!studentAssignment) throw new StudentAssignmentNotFoundException();

    return studentAssignment;
  }

  async findStudentAssignmentsByStudent(
    student: Student
  ): Promise<StudentAssignment[]> {
    const studentAssignments = await this.client.studentAssignment.findMany({
      where: {
        studentId: student.id,
        status: "submitted",
      },
      include: {
        assignment: true,
      },
    });

    return studentAssignments;
  }

  async findStudentAssignmentGradesByStudent(
    student: Student
  ): Promise<StudentAssignment[]> {
    const studentAssignments = await this.client.studentAssignment.findMany({
      where: {
        studentId: student.id,
        status: "submitted",
        grade: {
          not: null,
        },
      },
      include: {
        assignment: true,
      },
    });

    return studentAssignments;
  }

  async submitStudentAssignment(
    studentAssignment: StudentAssignment
  ): Promise<StudentAssignment> {
    const studentAssignmentUpdated = await this.client.studentAssignment.update(
      {
        where: {
          id: studentAssignment.id,
        },
        data: {
          status: "submitted",
        },
      }
    );

    return studentAssignmentUpdated;
  }

  async gradeStudentAssignment(
    studentAssignment: StudentAssignment,
    grade: string
  ): Promise<StudentAssignment> {
    const studentAssignmentUpdated = await this.client.studentAssignment.update(
      {
        where: {
          id: studentAssignment.id,
        },
        data: {
          grade: grade,
        },
      }
    );

    return studentAssignmentUpdated;
  }

  async createStudentAssignment(
    student: Student,
    assignment: Assignment
  ): Promise<StudentAssignment> {
    const studentAssignment = await this.client.studentAssignment.create({
      data: {
        studentId: student.id,
        assignmentId: assignment.id,
      },
    });

    return studentAssignment;
  }

  // Classes
  async findClassById(id: string): Promise<Class> {
    const classData = await this.client.class.findUnique({
      where: {
        id,
      },
    });

    if (!classData) throw new ClassNotFoundException();

    return classData;
  }

  async createClass(name: string): Promise<Class> {
    const classData = await this.client.class.create({
      data: {
        name,
      },
    });
    return classData;
  }

  // Class Assignments
  async findClassAssignmentsByClass(classData: Class): Promise<Assignment[]> {
    const assignments = await this.client.assignment.findMany({
      where: {
        classId: classData.id,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });

    if (!assignments) throw new AssignmentNotFoundException();

    return assignments;
  }

  // Class Enrollments
  async createClassEnrollment(
    classData: Class,
    student: Student
  ): Promise<ClassEnrollment> {
    const classEnrollment = await this.client.classEnrollment.create({
      data: {
        classId: classData.id,
        studentId: student.id,
      },
    });

    return classEnrollment;
  }
  async findClassEnrollmentByClassAndStudent(
    classData: Class,
    Student: Student
  ): Promise<ClassEnrollment> {
    const classEnrollment = await this.client.classEnrollment.findFirst({
      where: {
        classId: classData.id,
        studentId: Student.id,
      },
    });

    if (!classEnrollment) throw new ClassEnrollmentNotFoundException();

    return classEnrollment;
  }

  // Assignments
  async createAssignment(classId: string, title: string): Promise<Assignment> {
    const assignment = await this.client.assignment.create({
      data: {
        classId,
        title,
      },
    });

    return assignment;
  }

  async findAssignmentById(id: string): Promise<Assignment> {
    const assignment = await this.client.assignment.findUnique({
      where: {
        id,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });

    if (!assignment) throw new AssignmentNotFoundException();

    return assignment;
  }
}
