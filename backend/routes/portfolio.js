const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Portfolio = require('../models/Portfolio');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'votre_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

router.post('/add-asset', authenticateToken, async (req, res) => {
  const { asset, quantity, value } = req.body;
  const userId = req.user.userId;

  try {
    const newAsset = new Portfolio({ userId, asset, quantity, value });
    await newAsset.save();

    res.status(201).json({ message: "Actif ajouté au portefeuille avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de l'actif au portefeuille" });
  }
});

router.get('', authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    const portfolio = await Portfolio.find({ userId });
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du portefeuille de l'utilisateur" });
  }
});

module.exports = router;
