const User = require('../models/User');

exports.showLoginRegister = (req, res) => {
  res.render('login_register', { error: null, success: null, formData: {} });
};

exports.registerUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render('login_register', {
      error: 'Passwords do not match',
      success: null,
      formData: { firstName, lastName, email }
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('login_register', {
        error: 'Email already registered',
        success: null,
        formData: { firstName, lastName, email }
      });
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    res.render('login_register', {
      error: null,
      success: 'Registration successful! You can now login.',
      formData: {}
    });
  } catch (err) {
    res.render('login_register', {
      error: 'Registration failed. Please try again.',
      success: null,
      formData: { firstName, lastName, email }
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('login_register', {
        error: 'User not found. Please register.',
        success: null,
        formData: { email }
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.render('login_register', {
        error: 'Incorrect password',
        success: null,
        formData: { email }
      });
    }

    req.session.userId = user._id;
    res.redirect('/tweet');
  } catch (err) {
    res.render('login_register', {
      error: 'Login failed. Please try again.',
      success: null,
      formData: { email }
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
