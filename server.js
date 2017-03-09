const express = require('express');
const moment = require('moment');
const app = express();

const PORT = process.env.port || 80;

const checkDateString = (str) => {
    const decodedStr = decodeURI(str);
    const date = isNaN(parseInt(decodedStr)) ? moment(decodedStr) : moment.unix(parseInt(decodedStr));

    if (date.isValid()) {
        
        const dateObj = {
            unix: parseInt(date.format('X')),
            natural: date.format('MMMM DD, YYYY')
        };

        return dateObj;
    }
    return null;
};

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/:date', (req, res) => {
    if (req.params.date !== 'favicon.ico') {
        const date = checkDateString(req.params.date);
        res.send(date);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
