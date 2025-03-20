import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Mock data
let releases = [
    { id: "818a8349-e864-4b73-b74a-e827f00b972c", title: 'First Album', artist: 'Artist A', releaseDate: '2023-01-01', tracks: ['Track 1', 'Track 2'] },
    { id: "53f745e5-6838-4c26-a309-f16fd282611a", title: 'Second Album', artist: 'Artist B', releaseDate: '2023-05-15', tracks: ['Track 3', 'Track 4'] },
    { id: "a75d5c0b-eab4-4e7a-825e-598168709e41", title: 'Third Album', artist: 'Artist C', releaseDate: '2023-09-10', tracks: ['Track 5', 'Track 6'] }
];

// Get all releases
app.get('/api/releases', (req, res) => {
    setTimeout(() => res.json(releases), 200);
});

// Get a single release by ID
app.get('/api/releases/:id', (req, res) => {
    const release = releases.find(r => r.id === req.params.id);
    if (release) res.json(release);
    else res.status(404).json({ message: 'Release not found' });
});

// Create a new release
app.post('/api/releases', (req, res) => {
    const { title, artist, releaseDate, tracks } = req.body;
    const newRelease = { id: releases.length + 1, title, artist, releaseDate, tracks };
    releases.push(newRelease);
    res.status(201).json(newRelease);
});

// Update an existing release
app.put('/api/releases/:id', (req, res) => {
    const { title, artist, releaseDate, tracks } = req.body;
    const release = releases.find(r => r.id === req.params.id);
    if (release) {
        release.title = title || release.title;
        release.artist = artist || release.artist;
        release.releaseDate = releaseDate || release.releaseDate;
        release.tracks = tracks || release.tracks;
        res.json(release);
    } else res.status(404).json({ message: 'Release not found' });
});

// Delete a release
app.delete('/api/releases/:id', (req, res) => {
    releases = releases.filter(r => r.id !== req.params.id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Mock Releases API running at http://localhost:${port}`);
});
