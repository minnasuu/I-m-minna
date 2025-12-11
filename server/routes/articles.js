const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all articles
router.get('/', async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { publishDate: 'desc' }
    });
    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// GET article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await prisma.article.findUnique({
      where: { id: req.params.id }
    });
    if (!article) return res.status(404).json({ error: 'Article not found' });
    res.json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// POST create article (Simple implementation, essentially for the author)
router.post('/', async (req, res) => {
  try {
    const { title, summary, content, publishDate, tags, readTime, coverImage, link, type } = req.body;
    
    const article = await prisma.article.create({
      data: {
        title,
        summary,
        content, // Markdown content
        publishDate: new Date(publishDate),
        tags: tags || [],
        readTime: readTime || 0,
        coverImage,
        link,
        type: type || 'tech'
      }
    });
    res.json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Failed to create article' });
  }
});

module.exports = router;

