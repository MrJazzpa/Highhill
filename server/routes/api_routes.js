const express = require('express');
const router = express.Router();
const api_controller = require('../controller/api_controller');
const Audio_upload = require('../middleware/audio_upload');
const upload = require('../middleware/photoMiddleware');
const Books_upload = require('../middleware/books_middleware');



router.post('/signin',api_controller.post_login);
router.post('/createAdmin',api_controller.createUser);
router.post('/insert_about',api_controller.post_about);
router.post('/insert_manageHome',api_controller.post_manageHome);
router.post('/insert_banner',upload.single('banner_image1'),api_controller.post_banner);
router.post('/post_welcome',api_controller.post_welcome);
router.post('/postContact',api_controller.postContact);
router.post('/insert_prayer',api_controller.Prayers);
router.post('/insert_gallery', upload.single('g_upload'),api_controller.post_gallery);
router.post('/audio_sermon',Audio_upload.single('audio_upload'),api_controller.post_audio_sermon);
router.post('/books',Books_upload.single('book_upload'),api_controller.books)
//update route
router.post('/update_welcome/:id',api_controller.update_welcome);
router.post('/audio_cover_upload',upload.single('cover_upload'),api_controller.update_audio_sermon_cover_photo);
//DETELET ROUTES
router.delete('/delete_img/:id',api_controller.delete_img);
router.delete('/delete_welcome/:id',api_controller.delete_welcome);
router.delete('/delete_prayer/:id',api_controller.delete_prayer);
router.delete('/delete_audio_sermon/:id',api_controller.delete_audio_sermon);



module.exports = router;