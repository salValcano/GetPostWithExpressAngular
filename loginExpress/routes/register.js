var mongoose=require("mongoose")

//schema
var registeSchema=mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  phoneNumber:{
    type:Number,
    require:true
  },
  email:{
    type:String,
    require:true
  },
  password:{
    type:String,
    require:true
  },
  create_data:{
    type:Date,
    default:Date.now
  }
})

var RegisterUser=module.exports=mongoose.model("userdata",registeSchema)


// get registration

module.exports.getRegistration=function(callback,limit)
{
  RegisterUser.find(callback).limit(limit);
}


module.exports.addRegistration=function(userdata,callback)
{
  RegisterUser.create(userdata,callback);
}

module.exports.updateRegistration=function(id,userdata,options,callback)

{
  var query={_id:id};
  var update={name:userdata.name};
  RegisterUser.findOneAndUpdate(query,update,options,callback);
}
