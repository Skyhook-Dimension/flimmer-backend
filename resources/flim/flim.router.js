import { Router } from 'express'
import controllers, { fetchFlims } from './flim.controllers.js'

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


router.route('/fetch/:page').get(fetchFlims)



export default router