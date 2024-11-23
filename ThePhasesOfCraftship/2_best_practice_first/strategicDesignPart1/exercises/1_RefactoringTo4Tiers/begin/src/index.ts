import express, { Request, Response } from 'express';
import { prisma } from './database';
import { StudentsController } from './controllers/StudentsController';
import { Errors, isMissingKeys, isUUID, parseForResponse } from './shared';
import { ClassesController } from './controllers/ClassesController';
import { StudentController } from './controllers/StudentController';
import { AssignmentsController } from './controllers/AssignmentsController';

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.post('/students', StudentsController.create);
app.get('/students/:id', StudentsController.read); 
app.get('/students', StudentsController.readAll);

app.get('/student/:id/assignments', StudentController.readAssignments);
app.get('/student/:id/grades', StudentController.readGrades);

app.post('/classes', ClassesController.create)
app.get('/classes/:id/assignments', ClassesController.readAssignments)

app.post('/assignments', AssignmentsController.create)
app.get('/assignments/:id', AssignmentsController.read)

// POST student assigned to class
app.post('/class-enrollments', async (req: Request, res: Response) => {
    try {
        if (isMissingKeys(req.body, ['studentId', 'classId'])) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }
    
        const { studentId, classId } = req.body;
    
        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });
    
        if (!student) {
            return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false });
        }
    
        // check if class exists
        const cls = await prisma.class.findUnique({
            where: {
                id: classId
            }
        });

        // check if student is already enrolled in class
        const duplicatedClassEnrollment = await prisma.classEnrollment.findFirst({
            where: {
                studentId,
                classId
            }
        });

        if (duplicatedClassEnrollment) {
            return res.status(400).json({ error: Errors.StudentAlreadyEnrolled, data: undefined, success: false });
        }
    
        if (!cls) {
            return res.status(404).json({ error: Errors.ClassNotFound, data: undefined, success: false });
        }
    
        const classEnrollment = await prisma.classEnrollment.create({
            data: {
                studentId,
                classId
            }
        });
    
        res.status(201).json({ error: undefined, data: parseForResponse(classEnrollment), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
 
});


// POST student assigned to assignment
app.post('/student-assignments', async (req: Request, res: Response) => {
    try {
        if (isMissingKeys(req.body, ['studentId', 'assignmentId'])) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }
    
        const { studentId, assignmentId } = req.body;
    
        // check if student exists
        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });
    
        if (!student) {
            return res.status(404).json({ error: Errors.StudentNotFound, data: undefined, success: false });
        }
    
        // check if assignment exists
        const assignment = await prisma.assignment.findUnique({
            where: {
                id: assignmentId
            }
        });
    
        if (!assignment) {
            return res.status(404).json({ error: Errors.AssignmentNotFound, data: undefined, success: false });
        }
    
        const studentAssignment = await prisma.studentAssignment.create({
            data: {
                studentId,
                assignmentId,
            }
        });
    
        res.status(201).json({ error: undefined, data: parseForResponse(studentAssignment), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }

});

// POST student submitted assignment
app.post('/student-assignments/submit', async (req: Request, res: Response) => {
	try {
		if (isMissingKeys(req.body, ['id'])) {
			return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
		}

		const { id } = req.body;
		
		// check if student assignment exists
		const studentAssignment = await prisma.studentAssignment.findUnique({
			where: {
				id
			}
		});

		if (!studentAssignment) {
			return res.status(404).json({ error: Errors.AssignmentNotFound, data: undefined, success: false });
		}

		const studentAssignmentUpdated = await prisma.studentAssignment.update({
			where: {
				id
			},
			data: {
				status: 'submitted'
			}
		});

		res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
	} catch (error) {
		res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
	}
});

// POST student assignment graded
app.post('/student-assignments/grade', async (req: Request, res: Response) => {
    try {

        if (isMissingKeys(req.body, ['id', 'grade'])) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }
    
        const { id, grade } = req.body;
    
        // validate grade
        if (!['A', 'B', 'C', 'D'].includes(grade)) {
            return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
        }
        
        // check if student assignment exists
        const studentAssignment = await prisma.studentAssignment.findUnique({
            where: {
                id
            }
        });
    
        if (!studentAssignment) {
            return res.status(404).json({ error: Errors.AssignmentNotFound, data: undefined, success: false });
        }
    
        const studentAssignmentUpdated = await prisma.studentAssignment.update({
            where: {
                id
            },
            data: {
                grade,
            }
        });
    
        res.status(200).json({ error: undefined, data: parseForResponse(studentAssignmentUpdated), success: true });
    } catch (error) {
        res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
    }
});

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
