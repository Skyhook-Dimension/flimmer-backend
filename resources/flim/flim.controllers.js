import { crudControllers } from '../../utils/crud.js'
import { Flim } from './flim.model.js'


// export const fetchAllFlimsFromId = function(req, res) {

//     console.log("All Flims By Id")


//     Flim.find({ _id: { $lt: req.params.id } }, null, {
//             sort: {
//                 createdAt: -1
//             },
//             limit: 10
//         },
//         function(err, flims) {
//             if (err)
//                 throw err

//             if (!flims) {
//                 res.json({ success: false, msg: 'No flims left' })
//             } else {

//                 res.json({ success: true, msg: flims })
//             }
//         });
// }

export const fetchFlims = function(req, res) {

    console.log("All Flims")
        //res.send({ message: 'Tatti' })

    Flim.find(null, null, {
            sort: {
                createdAt: -1
            },
            limit: 10,
            skip: req.params.page * 10
        },
        function(err, flims) {
            if (err)
                throw err

            if (!flims) {
                res.json({ success: false, msg: 'No flims left' })
            } else {

                res.json({ success: true, msg: flims })
            }
        });
}




export default crudControllers(Flim)