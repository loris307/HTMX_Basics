const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

app.use(cors()); // Dies ermöglicht CORS für alle Routen
app.use(express.json());


// Dummy-Daten für die Demonstration
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
    const textToAdd = req.body.message; // Stellt sicher, dass du den Schlüssel 'message' erwartest
    if(textToAdd) {
        messages.push({ id: messages.length + 1, text: textToAdd }); // Fügt eine ID hinzu
        const html = messages.map(m => `<div>${m.text}</div>`).join('');
        res.send(html); // Sendet die aktualisierte Liste als HTML zurück
    } else {
        res.status(400).send('Keine Nachricht angegeben');
    }
});

// Route zum Löschen der letzten Nachricht
app.delete('/delete-last-message', (req, res) => {
    if (messages.length > 0) {
        messages.pop();  // Entfernt das letzte Element aus dem Array
        const html = messages.map(m => `<div>${m.text}</div>`).join('');
        res.send(html);
    } else {
        res.status(404).send('Keine Nachrichten zum Löschen vorhanden');
    }
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
})