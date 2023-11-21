// const User = require('../models/userModel');

// const paginate = async (req, res) => {
//   try {
//     // TODO: Query the users based on the pagination parameters
//     // TODO: Respond with the paginated users
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const sort = async (req, res) => {
//   const sortOptions = {};

//   if (sort) {
//     // TODO: Define sorting options based on the 'sort' query parameter
//   }

//   try {
//     // TODO: Query and sort the products based on the sorting options
//     // TODO: Respond with the sorted products
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// module.exports = {
//   paginate,
//   sort,
// };

const User = require('../models/userModel');

const paginate = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const sort = async (req, res) => {
  const { sort } = req.query;
  const sortOptions = {};

  if (sort) {
    sortOptions['name'] = sort === 'asc' ? 1 : -1;
  }

  try {
    const sortedUsers = await User.find().sort(sortOptions);
    res.status(200).json(sortedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  paginate,
  sort,
};

