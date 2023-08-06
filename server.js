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

    //  apiKey="a4b224b3c2030b24e23308c2fd7b7cdc-us21"

// list_id="65987d9a1e"
    const url = "https://us13.api.mailchimp.com/3.0/lists/b857bbc11d"
    // https://us21.admin.mailchimp.com/
    const options={
        method:"POST",
        auth:"diya:acac0a94fdec0c9a17efd697cb0a4dd8-us13"
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