import { Router } from 'express'
import controllers, { fetchScripts } from './script.controllers.js'

const router = Router()

// /api/item
router
    .route('/')
    .get(controllers.getMany)
    .post(controllers.createOne)


// /api/item/:id
router
    .route('/:id')
    .get(controllers.getOne)
    .put(controllers.updateOne)
    .delete(controllers.removeOne)

router.get('/fetch/:page', fetchScripts)

export default router