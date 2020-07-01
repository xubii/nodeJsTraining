const router = require('express').Router();
const controller = require('../../controller/users.controller');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()  
      + '.' + file.originalname.split('.').pop())
    }
  });

const upload = multer({storage : storage});

router.get('/', controller.getRecord);
router.get('/:id', controller.getRecordById);
router.post('/search', controller.search);
router.post('/searchByDob', controller.searchByDobRecord);
router.post('/searchByName', controller.searchByNameRecord);
router.post('/', controller.postRecord);
router.put('/', controller.putRecord);
router.delete('/:id', controller.deleteRecord);
router.post('/upload/', upload.single('image'), controller.updatePicture);


module.exports = router;
