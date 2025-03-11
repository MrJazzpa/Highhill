const express = require('express');
const router = express.Router();
const control_pages = require('../controller/control_pages');


router.get("/",control_pages.home);
router.get("/sermon",control_pages.sermon);
router.get("/about",control_pages.about);
router.get('/ministry',control_pages.ministries);
router.get("/community",control_pages.community);
router.get("/contact",control_pages.contact);
router.get('/media',control_pages.media);
router.get('/audio',control_pages.audio_sermon);





//Admin routes
router.get('/login',control_pages.signin);
router.get('/dashboard',control_pages.dashboard);
router.get('/dashboard_about',control_pages.dashboard_aboutPage);
router.get('/manageHome',control_pages.manageHome);
router.get('/logout',control_pages.logout);
router.get('/getbanners',control_pages.test_page);
router.get('/contactpage',control_pages.MangeCntact);
router.get('/photoGallery',control_pages.photoGallery);
router.get('/Admin_sermon',control_pages.upload_sermon);
router.get('/dashboard_books',control_pages.dashboard_book)


module.exports = router;