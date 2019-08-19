const addTodo = (req, res, db) => {
  const { item } = req.body;
  db("items")
    .insert({ item })
    .returning("*")
    .then(item => {
      res.json(item);
    })
    .catch(err => res.status(400).json({ msg: `${err}` }));
};

const getTodos = (req, res, db) => {
  db.select("*")
    .from("items")
    .returning("*")
    .then(items => {
      if (items.length) {
        return res.json(items);
      }
      res.status(400).json({ dataExists: "false" });
    })
    .catch(err => res.status(400).json({ msg: `${err}` }));
};

const deleteTodo = (req, res, db) => {
  const id = req.params.id;
  console.log(req.params.id);
  db("items")
    .where({ id })
    .returning("*")
    .del()
    .then(item => {
      res.json({ msg: `delete item of id:${id}` });
    })
    .catch(err => res.status(400).json({ msg: `item is not able to delete` }));
};

const changeTodo = (req, res, db) => {
  const { item, id } = req.body;
  db("items")
    .where({ id })
    .update({ item })
    .returning("*")
    .then(item => {
      res.json({ item });
    })
    .catch(err => res.status(400).json({ msg: `${err}` }));
};

module.exports = {
  addTodo,
  getTodos,
  deleteTodo,
  changeTodo
};
