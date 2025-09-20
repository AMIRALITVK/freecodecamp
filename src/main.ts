import express from 'express';
import helmet from 'helmet';

const app = express();
const port = 3000;

app.use(express.json());
app.use(helmet());

app.get('/', (req, res) => {
  res.send('Welcome to my Express API!');
});

app.get('/api', (req, res) => {
  const dateTime = new Date();
  res.status(200).json({ unix: dateTime.getTime(), utc: dateTime.toUTCString() });
});

app.get('/api/:date?', (req, res) => {
  console.log('Query =>', req.params.date);
  try {
    if (!req.params.date) {
      const dateTime = new Date();
      res.status(200).json({ unix: dateTime.getTime(), utc: dateTime.toUTCString() });
    } else if (!isNaN(Number(req.params.date))) {
      res.status(200).json({ unix: Number(req.params.date), utc: new Date(Number(req.params.date)).toUTCString() });
    } else {
      const dateTime = new Date(req.params.date);
      console.log('isValidDate =>', dateTime);
      if (String(dateTime) == 'Invalid Date') throw 'Invalid Date';
      res.status(200).json({ unix: dateTime.getTime(), utc: dateTime.toUTCString() });
    }

  } catch (e) {
    res.status(400).json({ error: 'Invalid Date' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});