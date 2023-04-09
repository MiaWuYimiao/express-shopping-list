const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError");
const items = require("../items");

router.get("/", (req, res) => {
    const allItems = items.getAllItems();
    return res.json(allItems);
})

router.post("/", (req, res, next) => {
    try {
        if(!req.body.name || !req.body.price) throw new ExpressError("Name and price are requires", 400);
        const newItem = {
            name: req.body.name,
            price: req.body.price
        }
        items.createItem(newItem);
        return res.status(201).json({"added" : newItem});
    } catch(e) {
        return next(e);
    }
})

router.get("/:name", (req, res) => {
    const item = items.getItem(req.params.name);
    if(item === undefined) throw new ExpressError("Item not found.", 404);
    return res.json(item);
})

router.patch("/:name", (req, res, next) => {
    try {
        if(!req.body.name || !req.body.price) throw new ExpressError("Name and price are requires", 400);
        const item = items.updateItem(req.params.name, req.body.name, req.body.price);
        if(item === undefined) throw new ExpressError("Item not found.", 404);
        return res.json({"updated" : item});
    } catch(e) {
        return next(e);
    }
})

router.delete("/:name", (req, res) => {
    const item = items.deleteItem(req.params.name);
    if(item === -1) throw new ExpressError("Item not found.", 404);
    return res.json({ message : "Deleted" });
})

module.exports = router;