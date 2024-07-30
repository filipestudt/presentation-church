import { Router } from 'express'
import * as PresentationController from '../controllers/PresentationController'

const PresentationRoute = Router()

PresentationRoute.get('/', (req, res) => {
	PresentationController.findAll(req, res)
})

PresentationRoute.get('/find', (req, res) => {
	PresentationController.find(req, res)
})

PresentationRoute.post('/', (req, res) => {
	PresentationController.create(req, res)
})

PresentationRoute.put('/', (req, res) => {
	PresentationController.update(req, res)
})

PresentationRoute.delete('/', (req, res) => {
	PresentationController.remove(req, res)
})

export { PresentationRoute }