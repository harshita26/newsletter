const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;
    console.log(firstName, lastName,email);


    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
        };
        
        const jsonData= JSON.stringify(data);

    const url="https://us17.api.mailchimp.com/3.0/lists/d860b20b8f"
    
    const options={
        method:"POST",
        auth:"harshitakha:7c9e9fe78189de1d71b48ea534f0077a-us17"
    }
    
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.sendFile(__dirname+"/signup.html")
});

// process.env.PORT dynamic port
app.listen(process.env.PORT || 3000,function(){
    console.log("the connection is establised");
})


// api key - 7c9e9fe78189de1d71b48ea534f0077a-us17
// login id d860b20b8f