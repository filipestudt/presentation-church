import { Request, Response } from 'express'
import { Presentations } from '../models/Presentations'

export async function findAll(request: Request, response: Response) {
	try {
		response.status(200).send(await Presentations.findAll())
	} catch (err: any) {
		response.status(400).json({
			message: err.message || 'Unexpected error.'
		})
	}
}

export async function find(request: Request, response: Response) {
	try {
		response.status(200).send(await Presentations.find(request.body))
	} catch (err: any) {
		response.status(400).json({
			message: err.message || 'Unexpected error.'
		})
	}
}

export async function create(request: Request, response: Response) {
	try {
		await Presentations.create(request.body)
		response.status(201).send()
	} catch (err: any) {
		response.status(400).json({
			message: err.message || 'Unexpected error.'
		})
	}
}

export async function update(request: Request, response: Response) {
	try {
		await Presentations.update(request.body.where, request.body.data)
		response.status(201).send()
	} catch (err: any) {
		response.status(400).json({
			message: err.message || 'Unexpected error.'
		})
	}
}

export async function remove(request: Request, response: Response) {
	try {
		Presentations.remove(request.body)
		response.status(201).send()
	} catch (err: any) {
		response.status(400).json({
			message: err.message || 'Unexpected error.'
		})
	}
}