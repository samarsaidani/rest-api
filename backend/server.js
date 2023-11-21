const  express = require('express');
const connectDb=require('./config/connect');
const app = express();
const clientSchema = require('./models/client')

require('dotenv').config(); //configuration de port
const port = process.env.PORT;
connectDb();
//midellware pour afficher la db

app.use(express.json({extended : false}))


//creation des routes
app.post('/create',(req,res)=>{
    // clientSchema.insertMany([
    //     {nom:"samar",
    //     email:"samar@gmail.com",
    //     age:27}
    //     ,{nom:"oumaima"
    //     ,email:"oumaima@gmail.com",
    //     age:33},
    //     {nom:"riadh",
    //     email:"riadh@gmail.com",
    //     age:32}])

    const { nom , email , age }= req.body ; 
    const newClient = new clientSchema({
        nom,
        email,
        age
    })
    newClient.save()
        .then(()=>{
            console.log('client ajouter :)')
            res.status(200).json({msg:"bien"})
        }).catch((err)=>{
            console.log(err);
            res.status(500).json({msg:" client non ajouter"})}
        )
        
      
})



//creation de serveur 
app.listen(port,(err)=>{
    if (err) {
        console.log(err);
        
    }
    console.log(`server  run ${port}`);
})



// retour de user

app.get('/users',(req,res)=>{
    clientSchema.find({}).
    then((result)=>{
    console.log('list des clients')
    res.status(200).json({msg:"list des clients",result})
}).catch((err)=>{
    console.log(err);
    res.status(500).json({msg:" error"})}
)})


// update  avec id 

app.put('/users/:id',(req,res)=>{
    const {id}=req.params;
    const {nom,email,age}=req.body;
    clientSchema.updateOne({_id : id},{$set:{nom,email,age}},{new : true})
    .then(()=>{
    console.log('list des clients')
    res.status(200).json({msg:"list des clients"})
}).catch((err)=>{
    console.log(err);
    res.status(500).json({msg:" error"})}
)})

//  delete user
 
app.delete('/remove/:id',(req,res)=>{
const {id}= req.params;

clientSchema.deleteOne({_id: id})
.then(()=>{
  res.status(200).json({msg:"client supprimer"})

})
.catch(()=>{
    res.status(500).json({msg:'error'})

})

})

// delete plusieur clients

app.delete('/supp',(req,res)=>{

    clientSchema.deleteMany({age:{$gt:27}})
    .then(()=>{
        res.status(200).json({msg:"supp"})
    }).catch(()=>{
        res.status(500).json({msg:"error"})

    })

})