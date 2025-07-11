const express = require('express');
const router = express.Router();
const tweetController = require('../controllers/tweetController');
const { checkIfLoggedIn } = require('../middleware/authMiddleware');

router.use(checkIfLoggedIn);

// Landing page with all tweets
router.get('/', tweetController.listTweets);

// Show form to create new tweet
router.get('/add', tweetController.showCreateForm);

// Submit new tweet

router.post('/add', tweetController.createTweet);


// View one tweet
router.get('/:id', tweetController.showTweet);

// Show edit form
router.get('/edit/:id', tweetController.showEditForm);

// Handle edit
router.post('/edit/:id', tweetController.updateTweet);

// Handle delete
router.post('/delete/:id', tweetController.deleteTweet);

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const tweetController = require('../controllers/tweetController');
// const { checkIfLoggedIn } = require('../middleware/authMiddleware');

// // All tweet routes require login
// router.use(checkIfLoggedIn);

// router.get('/', tweetController.listTweets);

// router.get('/create', tweetController.showCreateForm);
// router.post('/create', tweetController.createTweet);

// router.get('/:id', tweetController.showTweet);

// router.get('/:id/edit', tweetController.showEditForm);
// router.post('/:id/edit', tweetController.updateTweet);

// router.post('/:id/delete', tweetController.deleteTweet);

// module.exports = router;
