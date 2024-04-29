
const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;


app.use(cors());
app.use(express.json());




const messages = [
    { id: 1, text: "Diese Nachricht kommt vom Server" },
    { id: 2, text: "Diese Hier auch!" },
    { id: 3, text: "DIE NICHT (nein spaß, die auch)" }
];



app.get('/get-messages', (req, res) => {
    const html = messages.map(m => `<div>${m.text}</div>`).join('');
    res.send(html);
});



app.post('/add-messages', (req, res) => {
    console.log(req.body);
    console.log(req.body.message);
    const textToAdd = req.body.message; 
    if(textToAdd) {
        messages.push({ id: messages.length + 1, text: textToAdd }); 
        const html = messages.map(m => `<div>${m.text}</div>`).join('');
        res.send(html); 
    } else {
        res.status(400).send('Keine Nachricht angegeben');
    }
});


app.delete('/delete-last-message', (req, res) => {
    if (messages.length > 0) {
        messages.pop(); 
        const html = messages.map(m => `<div>${m.text}</div>`).join('');
        res.send(html);
    } else {
        res.status(404).send('Keine Nachrichten zum Löschen vorhanden');
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
})