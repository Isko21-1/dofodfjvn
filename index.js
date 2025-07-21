const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/plan', async (req, res) => {
  const { participants, budget, style } = req.body;

  try {
    await pool.query(
      'INSERT INTO events (participants, budget, style) VALUES ($1, $2, $3)',
      [participants, budget, style]
    );

    res.json({
      message: 'Мерекелік жоспар дайын!',
      scenario: `Сізге арналған "${style}" стилінде сценарий.`,
      games: ['Ойын 1', 'Ойын 2'],
      decorations: ['Әдемі шарлар', 'Сахна безендіру'],
      budgetSplit: {
        food: budget * 0.4,
        decorations: budget * 0.3,
        gifts: budget * 0.3
      },
      tasks: [
        { task: 'Шарлар сатып алу', responsible: 'Айгерім', due: '20 шілде' },
        { task: 'Торт тапсырыс беру', responsible: 'Нұржан', due: '21 шілде' }
      ]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Қате пайда болды' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер іске қосылды портта: ${PORT}`);
});
