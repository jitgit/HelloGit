var express = require('express'),
app = express();

app.use(express.static(__dirname + '/html'));
var port = 3000
app.listen(process.env.PORT || port);
console.log('Express server started on port %s',port);