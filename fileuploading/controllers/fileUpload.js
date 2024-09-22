const File=  require("../models/File");
const cloudinary= require("cloudinary").v2;


//localfileupload ->handler function
exports.localFileUpload= async(req, res)=>{
    try{
        //fetch the file from request
        const file= req. files.file;
        console.log("file aai jee: ", file);

        //create path where file need to be stored on server
        let path =__dirname + "/files/" + Date.now()+ `.${file.name.split('.')[1]}`;
        console.log("path -> ", path);

        //add path to the move function
        file.mv(path , (err) =>{
            console.log(err);
        });

        //create a successfull response
        res.json({
            success:true,
            message:"local file uploaded successfully",
        })
    }
    catch(error){
        console.log("not able to upload file on server.")
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options= {folder};
    console.log("temp file path :", file.tempFilePath);
    //quality ke under koi valid value hai to wo options ke under add ho jayegi
    if(quality){
        options.quality=quality;
    }

    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
//image upload ka handler
exports.imageUpload= async(req, res)=>{
    try{
        //fetch data
        const {name, tags, email}=req.body;
        console.log(name , tags, email);

        //file= req.files.filename
        const  file= req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes =["jpg", "png", "jpeg"];
        //file type
        const fileType= file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate not supported",
            })
        }

        //file formate supported -> upload to cloudinary
        console.log("Uploading to codehelp");
        const response= await uploadFileToCloudinary(file, "codehelp"); // codehelp folder created on cloudinary
        console.log(response);

        //db me entry save karna
        const fileData= await File.create({
            name, 
            tags,
            email,
            imageUrl:response.secure_url, //resopnse ke under secure_url respresent the image 
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image successfully uploaded.",
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"something went wrong",
        })
    }
}


//video upload handler
exports.videoUpload = async (req, res)=>{
    try{
        //fetch data
        const {name, tags, email}=req.body;
        console.log(name , tags, email);

        const file= req.files.videoFile;
        console.log(file);

        //validation
        const supportedTypes =["mp4", "mov"];
        //file type
        const fileType= file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        //HW -> add a upper limit for video
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate not supported",
            })
        }

        
        //file formate supported -> upload to cloudinary
        console.log("Uploading to codehelp");
        const response= await uploadFileToCloudinary(file, "codehelp"); // codehelp folder created on cloudinary
        console.log(response);

        //db me entry save karna
        const fileData= await File.create({
            name, 
            tags,
            email,
            imageUrl:response.secure_url, //resopnse ke under secure_url respresent the image 
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"video successfully uploaded.",
        })



    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:'something went wrong.',
        })
    }
}

//imageSizeReducer
exports.imageSizeReducer= async (req, res)=>{
    try{
        //fetch data
        const {name, tags, email}=req.body;
        console.log(name , tags, email);

        const file= req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes =["jpg", "png", "jpeg"];
        //file type
        const fileType= file.name.split('.')[1].toLowerCase();
        console.log(fileType);

        //HW -> add a upper limit for video
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate not supported",
            })
        }

        
        //file formate supported -> upload to cloudinary
        console.log("Uploading to codehelp");

        //hw -> do compression with the help of height property.
        const response= await uploadFileToCloudinary(file, "codehelp", 30); // codehelp folder created on cloudinary , here -> 30 is quality
        console.log(response);

        //db me entry save karna
        const fileData= await File.create({
            name, 
            tags,
            email,
            imageUrl:response.secure_url, //resopnse ke under secure_url respresent the image 
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"image successfully uploaded.",
        })

    }
    catch(error){
        console.error(error);
        res.status(400).json({
            status:false,
            message:"something wents wrong.", 
        })
    }
}

