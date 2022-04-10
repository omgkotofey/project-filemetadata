const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const DEST = 'uploads/';

require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', (req, res) => {
  const upload = multer({ dest: DEST }).single('upfile')
  upload(req, res, function (err) {
    if (err) {
      console.error(err);
      res.send(400).send('Something went wrong!');
    }

    const file = req.file;
    res.status(200).json({
      name: file.originalname,
      size: file.size,
      type: file.mimetype
    });
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error(err)
        return
      }  
    })
  })
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
