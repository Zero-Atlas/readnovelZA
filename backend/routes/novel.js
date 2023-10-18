const Router=require('express').Router()

const novelController=require('../controller/novel')

// router for home page
Router.get('/banner',novelController.getBanner)
Router.get('/recent',novelController.getRecent)
Router.get('/popular',novelController.getPopular)
Router.get('/new',novelController.getNew)

// router for novel read
Router.get('/:novelName/:chapterNo',novelController.getContent)

// router for novel page
Router.get('/:novelName',novelController.getDetail)

module.exports=Router