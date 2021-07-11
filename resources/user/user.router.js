import { Router } from 'express'

import { me, updateMe } from './user.controllers.js'

const router = Router()

router.put('/', updateMe)
router.get('/', me)

export default router