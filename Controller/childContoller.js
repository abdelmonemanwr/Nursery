const Child = require("./../Model/Child");

exports.getAllChildren=(req,res,next)=>{
    Child.find()
    .then(data=>{
        res.status(200).json(data)
    })
    .catch(error=>next(error));
};

exports.addNewChild=(req,res,next)=>{
    const obj = new Child(req.body);
    obj.save()
    .then(data=>res.status(201).json(data))
    .catch(error=>next(error))
};

exports.updateChildData=(req,res,next)=>{
    Child.findByIdAndUpdate(req.body._id, req.body)
    .then(data=>data?res.status(200).json(req.body):res.status(200).json({data:"not found"}))
    .catch(error=>next(error))
};

exports.getChildById=(req,res,next)=>{
    Child.findById(req.params.id)
    .then(data=>data?res.status(200).json(data):res.status(200).json({data:"Child not found"}))
    .catch(error=>next(error))
};

exports.deleteChild=(req,res,next)=>{
    Child.findByIdAndDelete(req.params.id)
    .then(data=>data?res.status(200).json({"deleted data":data}):res.status(200).json({"deleted data":"not found"}))
    .catch(error=>next(error))
};