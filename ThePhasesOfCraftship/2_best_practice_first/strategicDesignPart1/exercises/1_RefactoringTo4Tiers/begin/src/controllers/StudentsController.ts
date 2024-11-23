import { Request, Response } from 'express';
import { prisma } from '../database';
import { Errors, isMissingKeys, parseForResponse } from '../shared';

export class StudentsController {
	static async create(req: Request, res: Response) {
		try {
			if (isMissingKeys(req.body, ['name'])) {
				return res.status(400).json({ error: Errors.ValidationError, data: undefined, success: false });
			}

			const { name } = req.body;

			const student = await prisma.student.create({
				data: {
					name
				}
			});

			res.status(201).json({ error: undefined, data: parseForResponse(student), success: true });
		} catch (error) {
			res.status(500).json({ error: Errors.ServerError, data: undefined, success: false });
		}
	};
}