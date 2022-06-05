const router = require('express').Router();
const { verifyToken } = require('../middleware/auth')
const abstractRouter = require('../helpers/abstractRouter')
//Auth
//router.use(verifyToken)
//Level 4 or 5 of abstraction, whoosh
const getRoutes = (tableName, itemName) => {
    const aRouter = new abstractRouter(tableName, itemName)
    return aRouter.generateRoutes().bind(aRouter)
}

router.use('/tabs', getRoutes('tabs', 'Tab'))
router.use('/albums', getRoutes('albums', 'Album'))
router.use('/tracks', getRoutes('tracks', 'Track'))

module.exports = router
