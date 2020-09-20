const express = require('express')
const db = require('../../db')
const utils = require('../../utils')


const router = express.Router()

// ------------------------------------------------------------------------------------------
// ------------------------------             GET              ------------------------------
// ------------------------------------------------------------------------------------------
/**
 * @swagger
 *
 * /employee/feedback/viewFeedback:
 *   get:
 *     description: For getting feedbacks
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: successfull message
 */

router.get('/viewFeedback', (request, response) => {

    const statement = ` SELECT f.feedback_id, CONCAT(c.firstName , ' ' , c.middleName , ' ' , c.lastName ) AS 'Customer Name', f.feedback
    FROM feedback f INNER JOIN customer c ON f.customer_id = c.customer_id;  `

    db.query(statement, (error, data) => {
        response.send(utils.createResult(error, data))
    })

})


// ------------------------------------------------------------------------------------------
module.exports = router