import { JSONFilePreset } from 'lowdb/node';
import { Presentations } from '../models/Presentations'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function init() {
  const dbPath = path.resolve(__dirname, 'db.json')
  const db = await JSONFilePreset(dbPath, {})  
  Presentations.init(db);
}
