import { Router } from 'express'

import { updateMe } from './user.controllers.js'

const router = Router()

router.put('/update', updateMe)

export default router