import {
  PrismaClient,
  Student,
  StudentAssignment,
  Class,
  ClassEnrollment,
  Assignment,
} from "@prisma/client";

const prisma = new PrismaClient();
export class Database {
  constructor() {}

  // Students
  static async createStudent(name: string): Promise<Student> {
    const student = await prisma.student.create({
      data: {
        name,
      },
    });

    return student;
  }

  static async findStudentById(id: string): Promise<Student | null> {
    const student = await prisma.student.findUnique({
      where: {
        id,
      },
      include: {
        classes: true,
        assignments: true,
        reportCards: true,
      },
    });
    return student;
  }

  static async getAllStudents(): Promise<Student[]> {
    const students = await prisma.student.findMany({
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
  static findStudentAssignmentById(
    id: string
  ): Promise<StudentAssignment | null> {
    const studentAssignment = prisma.studentAssignment.findUnique({
      where: {
        id,
      },
    });
    return studentAssignment;
  }

  static async findStudentAssignmentsByStudent(
    student: Student
  ): Promise<StudentAssignment[] | null> {
    const studentAssignments = await prisma.studentAssignment.findMany({
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

  static async findStudentAssignmentGradesByStudent(
    student: Student
  ): Promise<StudentAssignment[] | null> {
    const studentAssignments = await prisma.studentAssignment.findMany({
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

  static async submitStudentAssignment(
    studentAssignment: StudentAssignment
  ): Promise<StudentAssignment> {
    const studentAssignmentUpdated = await prisma.studentAssignment.update({
      where: {
        id: studentAssignment.id,
      },
      data: {
        status: "submitted",
      },
    });

    return studentAssignment;
  }

  static async gradeStudentAssignment(
    studentAssignment: StudentAssignment,
    grade: string
  ) {
    const studentAssignmentUpdated = await prisma.studentAssignment.update({
      where: {
        id: studentAssignment.id,
      },
      data: {
        grade: grade,
      },
    });

    return studentAssignmentUpdated;
  }

  static async createStudentAssignment(
    student: Student,
    assignment: Assignment
  ): Promise<StudentAssignment> {
    const studentAssignment = await prisma.studentAssignment.create({
      data: {
        studentId: student.id,
        assignmentId: assignment.id,
      },
    });

    return studentAssignment;
  }

  // Classes
  static async findClassById(id: string): Promise<Class | null> {
    const classData = await prisma.class.findUnique({
      where: {
        id,
      },
    });
    return classData;
  }

  static async createClass(name: string): Promise<Class> {
    const classData = await prisma.class.create({
      data: {
        name,
      },
    });
    return classData;
  }

  // Class Assignments
  static async findClassAssignmentsByClass(
    classData: Class
  ): Promise<Assignment[] | null> {
    const assignments = await prisma.assignment.findMany({
      where: {
        classId: classData.id,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });

    return assignments;
  }

  // Class Enrollments
  static async createClassEnrollment(
    classData: Class,
    student: Student
  ): Promise<ClassEnrollment> {
    const classEnrollment = await prisma.classEnrollment.create({
      data: {
        classId: classData.id,
        studentId: student.id,
      },
    });

    return classEnrollment;
  }
  static async findClassEnrollmentByClassAndStudent(
    classData: Class,
    Student: Student
  ): Promise<ClassEnrollment | null> {
    const classEnrollment = await prisma.classEnrollment.findFirst({
      where: {
        classId: classData.id,
        studentId: Student.id,
      },
    });
    return classEnrollment;
  }

  // Assignments
  static async createAssignment(
    classId: string,
    title: string
  ): Promise<Assignment> {
    const assignment = await prisma.assignment.create({
      data: {
        classId,
        title,
      },
    });

    return assignment;
  }

  static async findAssignmentById(id: string): Promise<Assignment | null> {
    const assignment = await prisma.assignment.findUnique({
      where: {
        id,
      },
      include: {
        class: true,
        studentTasks: true,
      },
    });

    return assignment;
  }
}
