const Tweet = require('../models/TweetSchema');

// List all tweets
const listTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().sort({ createdAt: -1 });
    res.render('tweets', { tweets });
  } catch (err) {
    console.error('Error fetching tweets:', err);
    res.status(500).send('Error fetching tweets');
  }
};

const showCreateForm = (req, res) => {
  res.render('createTweet', { errors: null, data: {} }); 
};

const createTweet = async (req, res) => {
  try {
    const { title, tweet } = req.body;
    const user = req.session.userId; 

    const newTweet = new Tweet({ title, tweet, user });
    await newTweet.save();
    res.redirect('/tweet');
  } catch (err) {
    res.render('createTweet', { errors: err.errors, data: req.body });
  }
};

const showTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).send('Tweet not found');
    res.render('showTweet', { tweet });
  } catch (err) {
    console.error('Error fetching tweet:', err);
    res.status(500).send('Error fetching tweet');
  }
};

const showEditForm = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).send('Tweet not found');
    res.render('editTweet', { tweet, errors: null });
  } catch (err) {
    console.error('Error loading edit form:', err);
    res.status(500).send('Error loading edit form');
  }
};

const updateTweet = async (req, res) => {
  try {
    const { title, tweet } = req.body;
    await Tweet.findByIdAndUpdate(req.params.id, { title, tweet }, { runValidators: true });
    res.redirect(`/tweet/${req.params.id}`);
  } catch (err) {
    const tweet = await Tweet.findById(req.params.id);
    const errors = err.errors || { general: { message: 'Failed to update tweet' }};
    res.status(400).render('editTweet', { tweet, errors });
  }
};

const deleteTweet = async (req, res) => {
  try {
    await Tweet.findByIdAndDelete(req.params.id);
    res.redirect('/tweet');
  } catch (err) {
    console.error('Error deleting tweet:', err);
    res.status(500).send('Error deleting tweet');
  }
};

module.exports = {
  listTweets,
  showCreateForm,
  createTweet,
  showTweet,
  showEditForm,
  updateTweet,
  deleteTweet,
};
