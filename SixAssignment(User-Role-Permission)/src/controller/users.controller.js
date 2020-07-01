const service = require('../service/users.service');

async function getRecord(req, res) {
  const isEmpty = obj => Object.keys(obj).length <= 0;
  if (!isEmpty(req.query)) {
    console.log(req.query);
    var options = {};
    var orderByParam = req.query.sortBy;
 
    if(!isEmpty(orderByParam)){
      options.order = [[ orderByParam, 'ASC']];
    }
 
    res.status(200).send( await service.findAll(options));
    return;  
  }
  res.status(200).send( await service.findAll());
}

async function getRecordById(req, res) {
  try {
    const id = req.params.id;
    console.log("getting user details by id : " + id);
    const user = await service.find({ id });
    console.log("getting user details : " + user);
    res.send(user);
  } catch (e) {
    console.log("getting user details error : " + e);
    res.status(400).send(e.message);
  }
  res.send();
}

async function search(req, res) {
  try {
    const isEmpty = obj => Object.keys(obj).length <= 0;
    if (!isEmpty(req.body)) {
      console.log(req.body);
      
      options = { where: req.body }   
      
      console.log(options);
      res.status(200).send( await service.findAll(options));
      return;  
    }
    res.status(200).send( await service.findAll());
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
}


async function searchByDobRecord(req, res) {
  try {
    const isEmpty = obj => Object.keys(obj).length <= 0;
    if (!isEmpty(req.body)) {
      console.log(req.body);
      var options = {};
      var dobParam = req.body.dob;
   
      if(!isEmpty(dobParam)){
        options = { where: {dob : dobParam}}
      }
   
      console.log(options);
      res.status(200).send( await service.findAll(options));
      return;  
    }
    res.status(200).send( await service.findAll());
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
}

async function searchByNameRecord(req, res) {
  try {
    const isEmpty = obj => Object.keys(obj).length <= 0;
    if (!isEmpty(req.body)) {
      console.log(req.body);
      var options = {};
      var nameParam = req.body.name;
   
      if(!isEmpty(nameParam)){
        options = { where: {name : nameParam}}
      }
   
      console.log(options);
      res.status(200).send( await service.findAll(options));
      return;  
    }
    res.status(200).send( await service.findAll());
  } catch (e) {
    console.log(e);
    res.status(400).send(e.message);
  }
}


async function postRecord(req, res) {
  const usr = req.body;
  const record = await service.insert(usr);
  res.status(201).send(record);

  res.send();
}

async function putRecord(req, res) {
  const user = req.body;
  const record = await service.update(user);
  res.status(201).send(record);

  res.send();
}

async function deleteRecord(req, res) {
  try {
    const id = req.params.id;
    const user = await service.deleteById(id);
    res.status(200).send(user);
  } catch (e) {
    if (e.message === 'ID_NOT_FOUND') {
      res.status(400).send('invalid user id');
      return;
    }
    res.status(400).send(e.message);
  }
}

async function updatePicture(req, res, next){
  if(!req.body.id){
    res.status(400).send("No user id found");
  } else if(!req.file){
    res.status(400).send("No file found");
  } else {
    const record = await service.updatePicture(req.body.id, req.file);
    res.status(200).send(record);  
  }
}

module.exports = {
  getRecord,
  getRecordById,
  search,
  searchByDobRecord,
  searchByNameRecord,
  postRecord,
  deleteRecord,
  putRecord,
  updatePicture
};
