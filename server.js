const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const port = process.env.PORT || 3000;

const app = express()
app.use(bodyParser.urlencoded({extended:true})) // to use body parser package
app.use(express.static("public")) 

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
// to fetch data post is use

app.post('/',(req,res)=>{ 
    const firstname = req.body.first_name // to fetch details
    const lastname = req.body.last_name
    const email = req.body.email

    const data={
        members:[{
            email_address : email,
            status : "subscribed",
            merge_fields:{
                FNAME : firstname,
                LNAME : lastname
            }
        }]
    }

    const options={
        method:"POST",
        
    }

    const request = https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })

    jsonData = JSON.stringify(data)
    request.write(jsonData)
    request.end()

    res.sendFile(__dirname+"/index.html")
})


app.listen(port,function(req,res){
    console.log("Server is running at port")
})
