const Cart = require("../models/Cart");

const handleSave = async (req, res) => {
  const { carts } = req.body;
  try {
    const cartDoc = await Cart.create({
      items: carts.carts,
      userEmail: carts.email || "",
    });
    return res.json({ cartDoc });
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
};

const handleGetFromCart = async (req, res) => {
  const { email } = req.body;
  try {
    const cartItems = await Cart.find({ email });
    return res.json(cartItems || []);
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = { handleSave, handleGetFromCart };
