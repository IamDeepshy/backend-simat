const express = require('express')
const router = express.Router()
const { syncTestRun } = require('../controllers/testRunController')

router.post('/test-runs/sync', syncTestRun)

module.exports = router
