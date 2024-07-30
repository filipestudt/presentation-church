import { newModel } from 'lowdb-models'
import { nanoid } from 'nanoid'

var Presentations = newModel({
	id: {
		unique: true,
		generate: () => nanoid()
	},
	name: {
		required: true
	},
	category: {
		required: true
	}}, {
		tableName: 'presentations'
	})

export { Presentations }
