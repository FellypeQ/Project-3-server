const router = require("express").Router();
const Lista = require("../models/Lista");

// Crud (CREATE): POST
router.post("/lista", async (req, res) => {
  try {
    const result = await Lista.create(req.body);

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// cRud (READ): GET List
router.get("/lista", async (req, res) => {
  try {
    const listasDoUsuario = await Lista.find();
    return res.status(200).json(listasDoUsuario);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// cRud (READ): GET Detail
router.get("/lista/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const lista = await Lista.findOne({ _id: id });

    if (lista) {
      return res.status(200).json(lista);
    }

    return res.status(404).json({ msg: "Lista não encontrada" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// crUd (UPDATE): PATCH (non-destructive)
router.patch("/lista/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const lista = await Lista.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (lista) {
      return res.status(200).json(lista);
    }

    return res.status(404).json({ msg: "Lista não encontrada" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

// cruD (DELETE): DELETE
router.delete("/lista/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const lista = await Lista.deleteOne({ _id: id });

    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;