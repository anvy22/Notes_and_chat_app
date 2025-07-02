import User from '../models/User.js';

export const verify = async (req, res) => {
  try {
    return res.status(200).json({
      user: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const setRole = async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!['user', 'admin', 'moderator'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'Role updated', user });
  } catch (error) {
    console.error('Error setting role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRoles = async (req, res) => {
  try {
    const users = await User.find({}, 'email username role');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
