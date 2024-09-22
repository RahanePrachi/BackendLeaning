const mongoose= require("mongoose");
const nodemailer= require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true,
    },
    imageUrl:{
        type:String, 
        
    },
    tags:{
        type:String, 
       
    },
   email:{
        type:String, 
        required:true,
    }
})

//post middleware
fileSchema.post("save", async function(doc){ 
    try{
        console.log("DOC: ", doc); //doc is nothing but the entry created in your db

        //transpoter -> good practise -> shift this configuration under config folder
        let transpoter= nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS,
            },
        });

        //send mail
        let info= transpoter.sendMail({
            form:'codehelp- babber',
            to:doc.email,
            subject:"New file uploaded on cloudinary",
            html:`<h2>Hello jee</h2> <p>File uploaded .view here: <a href="${doc.imageUrl}" >${doc.imageUrl}</a> </p>`, 
        })

        console.log("info : ", info);

    }
    catch(error){
        console.error(error);
    }
})
const File= mongoose.model("File", fileSchema);
module.exports=File;