import express, { Request, Response } from 'express';
import { prisma } from './database';
import { StudentsController } from './controllers/StudentsController';
import { Errors, isMissingKeys, isUUID, parseForResponse } from './shared';
import { ClassesController } from './controllers/ClassesController';
import { StudentController } from './controllers/StudentController';
import { AssignmentsController } from './controllers/AssignmentsController';
import { ClassEnrollmentsController } from './controllers/ClassEnrollmentsContoller';
import { StudentAssignmentsController } from './controllers/StudentAssignmentsController';

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

app.post('/class-enrollments', ClassEnrollmentsController.create)

app.post('/student-assignments', StudentAssignmentsController.create)
app.post('/student-assignments/submit', StudentAssignmentsController.submit)

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
