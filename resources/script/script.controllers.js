import { crudControllers } from '../../utils/crud.js'
import { Script } from './script.model.js'

export const fetchScripts = function(req, res) {

    Script.find(null, null, {
            sort: {
                createdAt: -1
            },
            limit: 10,
            skip: req.params.page * 10

        },
        function(err, scripts) {
            if (err)
                throw err

            if (!scripts) {
                res.json({ success: false, msg: 'No scripts left' })
            } else {

                res.json({ success: true, msg: scripts })
            }
        });
}


export default crudControllers(Script)