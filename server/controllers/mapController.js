const Store = require('../Models/store');
const Store3 = require('../Models/store3');



module.exports.addName = async (req, res) => {
  const { name } = req.body;

  try {
    const existingStore = await Store.findOne({ name });

    if (existingStore) {
      return res.status(422).json({ msg: 'This place is already added in the list!' });
    }
   // const id = Math.floor(Math.random() * 10);
    const newStore = new Store({  name });
    await newStore.save();
    res.status(200).json({ msg: 'Added place successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.mapInfo = async (req, res) => {
  const { name } = req.body;

  try {
    const store = await Store.findOne({ name });

    if (store) {
      res.status(200).json(store);
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.addMap = async (req, res) => {
  const { parentId, coordinates, color } = req.body;
 //const parentId2 = parseInt(parentId);
 
//const parentId2 = parentId.toString();
  try {
   console.log(parentId);
    const newMap = new Store3({ parentId, coordinates, color });
    await newMap.save();
    res.status(200).json({ msg: 'Polygon added successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.getAllMaps = async (req, res) => {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.getGeoMapinfo = async (req, res) => {
  const { parentId } = req.body;
  //const { parentId2 } = parseInt(parentId);
  //console.log("bbbbb", parentId)
  try {
    const store3 = await Store3.find({ parentId });

    if (store3.length > 0) {
      res.status(200).json(store3);
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};





module.exports.updateGeoMap = async (req, res) => {
//const { parentId } = req.body;
  //const { parentId2 } = parseInt(parentId);

  const {  parentId,coordinates, color } = req.body;

  console.log("Received parentId:", parentId);
  console.log("Received coordinates:", coordinates);
  console.log("Received color:", color);

  try {
    const result = await Store3.updateOne(
      { parentId },
      { $set: { coordinates, color } }
    );

    if (result.nModified > 0) {
      res.status(200).json({ msg: 'Updated' });
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.deleteMap = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Store3.deleteOne({ parentId: id });

    if (result.deletedCount > 0) {
      res.status(200).json({ msg: 'Deleted Map successfully' });
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.deleteMapName = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Store.deleteOne({ _id: id });

    if (result.deletedCount > 0) {
      res.status(200).json({ msg: 'Deleted Map successfully' });
    } else {
      res.status(400).json({ msg: 'Something went wrong' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.getAllCoordinateMaps = async (req, res) => {
  try {
    const stores2 = await Store3.find();
    res.status(200).json(stores2);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports.viewAllMaps = async (req, res) => {
  try {
    const stores2 = await Store3.find({}, 'coordinates color');
    res.status(200).json(stores2);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
