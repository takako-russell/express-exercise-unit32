const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
let items = require("../fakeDb");

router.get("/", function (req, res) {
  res.json({ items });
  console.log("you're here");
});

router.post("/", function (req, res) {
  const newItem = { name: req.body.name, price: req.body.price };
  items.push(newItem);
  res.status(201).json({ item: newItem });
});

router.get("/:name", function (req, res) {
  foundItem = items.find((item) => item.name == req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  res.json({ item: foundItem });
});

router.patch("/:name", function (req, res) {
  foundItem = items.find((item) => item.name == req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;

  res.json({ foundItem });
});

router.delete("/:name", function (req, res) {
  foundItem = items.find((item) => item.name == req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item not found", 404);
  }
  items = items.filter((item) => item.name !== foundItem.name);
  // items.splice(foundItem, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
