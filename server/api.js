const express = require('express')
const router = express.Router()


router.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from server API!' })
})

module.exports = router
