const { Parser } = require('json2csv');
const User = require('../models/User');

function buildSearchFilter(search) {
  if (!search || !search.trim()) return {};
  const regex = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  return {
    $or: [
      { firstName: regex },
      { lastName: regex },
      { email: regex },
      { phone: regex },
      { city: regex },
      { country: regex },
    ],
  };
}

// GET /api/users?page=1&limit=10&search=foo
exports.listUsers = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const search = req.query.search || '';

    const filter = buildSearchFilter(search);

    const [items, total] = await Promise.all([
      User.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      User.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(Math.ceil(total / limit), 1),
        search,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/users/export  -> CSV download
exports.exportUsersCSV = async (req, res, next) => {
  try {
    const search = req.query.search || '';
    const filter = buildSearchFilter(search);

    const users = await User.find(filter).sort({ createdAt: -1 }).lean();

    const fields = [
      { label: 'First Name', value: 'firstName' },
      { label: 'Last Name', value: 'lastName' },
      { label: 'Email', value: 'email' },
      { label: 'Phone', value: 'phone' },
      { label: 'Gender', value: 'gender' },
      { label: 'City', value: 'city' },
      { label: 'Country', value: 'country' },
      { label: 'Status', value: 'status' },
      { label: 'Created At', value: (row) => (row.createdAt ? new Date(row.createdAt).toISOString() : '') },
    ];

    const parser = new Parser({ fields });
    const csv = parser.parse(users);

    const filename = `users-${new Date().toISOString().slice(0, 10)}.csv`;
    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.attachment(filename);
    res.send(csv);
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:id
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

// POST /api/users
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user, message: 'User created successfully' });
  } catch (err) {
    next(err);
  }
};

// PUT /api/users/:id
exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user, message: 'User updated successfully' });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
