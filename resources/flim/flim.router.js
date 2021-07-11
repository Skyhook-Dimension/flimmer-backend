import { Router } from 'express'
import controllers, { fetchAllFlims, fetchAllFlimsFromId } from './flim.controllers.js'

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


router.route('/all').get(fetchAllFlims)
router.route('/fetch/:id').get(fetchAllFlimsFromId)


export default router