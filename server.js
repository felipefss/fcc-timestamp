const express = require('express');
const moment = require('moment');
const app = express();

const checkDateString = (str) => {
    const decodedStr = decodeURI(str);
    const date = moment(decodedStr);

    if (date.isValid()) {
        const dateObj = {
            unix: parseInt(date.format('X')),
            natural: date.format('MMMM DD, YYYY')
        };

        return dateObj;
    }
    return null;
};

app.get('/:date', (req, res) => {
    if (req.params.date !== 'favicon.ico') {
        const date = checkDateString(req.params.date);
        res.send(date);
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
