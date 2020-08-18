const express = require('express');
const uuid = require('uuid');

const members = require('../../Members');

const router = express.Router();

// Gets all members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get('/:id', (req, res) => {
  const found = members.some((m) => m.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((m) => m.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ message: `Member not found with id ${req.params.id}` });
  }
});

// Create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
  };

  if (!newMember.name) {
    return res.status(400).json({
      message: 'Please include a name!',
    });
  }

  members.push(newMember);
  // res.redirect('/');
  res.json(members);
});

// Update member
router.put('/:id', (req, res) => {
  const found = members.some((m) => m.id === parseInt(req.params.id));

  if (found) {
    console.log(req.body);
    const updatedMember = req.body;
    members.forEach((m) => {
      if (m.id === parseInt(req.params.id)) {
        m.name = updatedMember.name;
      }
    });
    res.json({ message: 'Member updated!', members });
  } else {
    res
      .status(400)
      .json({ message: `Member not found with id ${req.params.id}` });
  }
});

// Delete member
router.delete('/:id', (req, res) => {
  const found = members.some((m) => m.id === parseInt(req.params.id));

  if (found) {
    res.json({
      message: 'Member deleted!',
      members: members.filter((m) => m.id !== parseInt(req.params.id)),
    });
  } else {
    res
      .status(400)
      .json({ message: `Member not found with id ${req.params.id}` });
  }
});

module.exports = router;
