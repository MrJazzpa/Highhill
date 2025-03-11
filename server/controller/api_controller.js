// const flash = require('connect-flash');
 const Admin_user = require('../models/create_admin');
 const About_data = require('../models/about');
 const Home_data = require('../models/home');
 const welcome_model = require('../models/welcome_model');
 const Contact_model = require('../models/contact_model');
 const Prayer_model = require('../models/prayer_model');
 const audio_model = require('../models/sermon_audio_model');
 const book_model = require('../models/book_model');
 const transporter = require('../middleware/email');
 const bcrypt = require('bcryptjs');
 //const mongoose = require('mongoose');
 const session = require('express-session');
 const banner_model = require('../models/bannner_model');
 const path = require('path')
 const fs = require('fs');
const prayer_model = require('../models/prayer_model');
const { constants } = require('buffer');
const gallery_model = require('../models/gallery_model');





exports.createUser = async(req,res) => {

    const {username,password,confirm_password}=req.body;
    if(confirm_password != password){
        res.status(403).json({error:"passwords does not mtach"});
    }
    try{

            //check exixting user
            const existingUser = await Admin_user.findOne({username:username});
            if(existingUser){
                return res.status(403).json({message:existingUser.username+" already exixts"});
            }
            //hash password
            const salt = await bcrypt.genSalt(15);
            const hashedPassword = await  bcrypt.hash(password,salt);

            //create new User
            const newUser = ({username,password:hashedPassword});
              const createUser = await Admin_user.create(newUser);
              res.status(200).json(createUser);

    }catch(error){

    }
}

exports.post_login = async(req,res)=>{
    const getuser = {
           username : req.body.username,
           password : req.body.password
          
    }
    if(getuser.username =="" && getuser.password == ""){
       req.flash('error_msg','Please fill in all credentials......');
        res.redirect('/login');
       //res.status(403).json({error:"Please fill all fields"});
        
    }else{
        //req.flash('success_msg', 'login successfull');
        //res.redirect('/login');
        try{

            const check =  await Admin_user.findOne({username:getuser.username});
            if(!check){
                req.flash('error_msg','Please this user is not found ......');
              
            }
            const passwordMatch = await bcrypt.compare(getuser.password,check.password);
            if(passwordMatch){
               req.session.loggedin = true;
                req.session.username = check.username;
                res.redirect('/dashboard');
                /// res.status(200).json({user:check});
            }else{
                req.flash('error_msg','password does not match ......');
                res.redirect('/login');
            }

        }catch(error){
            res.status(403).json({error:"not working"});
            res.redirect('/login');
        }
    }
 }
exports.post_manageHome = async(req,res)=>{
     
           header_txt = req.body.Header_txt
           welcome_txt= req.body.Welcome_txt

     
     try{
     
         const rs_data = await Home_data.create({header:header_txt,welcome_txt})
         res.json({response:rs_data,status:200});
        console.log(rs_data);

     }catch(error){
        res.json({error:error,status:403})
        console.log(error);
     }
    
}
exports.post_banner =  async(req,res)=>{
   
   try{
    
    if(!req.file){
        res.json({data:"no file inserted",status:403});
       }
      const bannerimg1 =req.file.filename;
      const contype = req.file.mimetype;
      const  data={name:bannerimg1,contentType:contype}
       rs_img = await banner_model.create(data)
        console.log({name:rs_img.name,Contentype:rs_img.contentType});
        res.json({success: rs_img.name +" inserted successfully",status:200});
       
   }catch(error){
    console.error(error);
      res.json({data:error,status:403})
   }

};

exports.post_gallery = async(req,res,err)=>{
    
    if(!req.file){
        res.json({data:"no file inserted",status:403});
       }else{
            try{

                const gltxt = req.body.gallery_text;
                const fileName= req.file.filename;
                const getfiles={name:fileName,content:gltxt}
                const insert_gallery = await gallery_model.create(getfiles);
                if(insert_gallery){
                    return res.json({success:"record inserted successfilly",status:200});
                }else{
                    return res.json({error:"coult not insert document",status:403});
                }
            }catch(error){
                console.error(error);
            }
       }
}
exports.post_audio_sermon = async(req,res)=>{
   const audio_heading = req.body.audio_heading;
    const fileName =  req.file.filename;
    
    if(!req.file){
          res.json({error:"file cannot be empty",status:404})
     }else{
        const insert_upload=({heading:audio_heading,audio_file:fileName,cover_photo:"no file"})
        await audio_model.create(insert_upload)
        .then(()=>  res.json({success:"successfully uploaded sermon",status:200}))
        .catch(()=>res.json({error:"error uploading to database",statu:403}))
       
         
     }
}

 exports.post_about = async(req,res)=>{
    const about= req.body.about;
    const heading = req.body.heading;
    try{
        const result = await About_data.create({heading:heading,about:about});
        res.json({response:result,status:200});

    }catch(error){
         res.json({error:error,status:403})
    }
 }

 exports.post_welcome = async(req,res)=>{
     welcome_header = req.body.Welcome_header;
     welcome_note = req.body.Welcome_note;
     try{
          check_exist_text = await welcome_model.findOne({welcome_text:welcome_note})
          if(check_exist_text){
            console.log(check_exist_text)
               return res.json({response:"Welcome note Already exits",status:403});
          }
          else{
            const insert_data =({heading:welcome_header,welcome_text:welcome_note});
             const rs_insert = await welcome_model.create(insert_data);
             if(rs_insert){
                return  res.json({response:rs_insert,status:200});
             }else{
                return  res.json({error:"data could not be inserted",status:403});
             }
          }
     }catch(error){
         console.error(error)
     }
   
 }

 //update endpoint
 exports.update_welcome = async(req,res)=>{
    get_id = req.params.id;
     try{
        const get_welcom_update = req.body.update_welcome;
         await welcome_model.updateOne({_id:get_id},{welcome_text:get_welcom_update})
        .then(result =>{
            if(result){
                return res.json({data:'success',status:200})
             }else{
                return res.json({error:"document not found",status:403})
             }
        })
        .catch(error=>{
            console.error("error updating",error)
        });
     }catch(error){
        console.error(error);
        return res.json({error:error})
     }
 }
 exports.update_audio_sermon_cover_photo = async(req,res)=>{
    if(!req.file){
        res.json({error:"cannot have an empty input file",status:403})
    }
    else{
       console.log(req.file);
        photoName = req.file.filename;
        ID = req.body.id_upload;
         await audio_model.updateOne({_id:ID},{cover_photo:photoName})
         .then(result=>{
             if(result){
                res.json({message:'fileuploaded',status:200});
             }else{
                res.json({message:"file could not be updated",status:403});
             }
         }).catch(error=>{
             console.error(error);
         })
      
    }

}
 exports.postContact = async(req,res)=>{
      email = req.body.email;
      phone_number = req.body.phone_number;
      address = req.body.address;
      try{
              contact_data =({email:email,phoneNumber:phone_number,address:address})
             rs_contact = await Contact_model.create(contact_data);
            if(rs_contact){
            console.log(contact_data);
            return res.json({data:rs_contact,status:200})
        }else{
          return res.json({data:"Record could not be inserted",status:403})
        }
      }catch(error){
        console.error(error);
      }
     
 }
 exports.Prayers = async(req,res)=>{
      member_name  = req.body.Name;
     member_email = req.body.Email;
      phone_number = req.body.Phone;
      Prayer = req.body.Message;
      try{
                const post_prayer= ({name:member_name,email:member_email,phone:phone_number,prayer:Prayer});
                const rs_prayer = await Prayer_model.create(post_prayer);
                if(rs_prayer){
                    return res.json({Message:rs_prayer,status:200});
                }else{
                    return res.json({error:"could not insert to database",status:403})
                }
      }catch(error){
        console.error(error);
      }
 }
 exports.books = async(req,res)=>{
      // details = req.file;
       if(!req.file){
          return  res.json({error:"no file found"})
       }else{
        const data={
            title:req.body.title,
            book_name:req.file.filename,
            author:req.body.author

        }
        const save_data = ({title:data.title,book_name:data.book_name,author:data.author})
        await book_model.create(save_data)
        .then(result=>{
            if(result){
                res.json({success:"Success",status:200})
            }else{
                res.json({error:"could not upload books to database",status:403});
            }
        }).catch(error=>{
            console.error(error);
        })
          
       }
        
        
 }
//DELETE
exports.delete_img= async(req,res)=>{
    try{
         get_id = req.params.id;
        await banner_model.findOneAndDelete(get_id);
        res.json({message:"Record Has Been Deleted Successfully",status:200})
    }catch(error){
        res.status(500).json({message:'Error deleting item'})
    }
}
exports.delete_prayer = async(req,res)=>{
    try{
          getID = req.params.id;
          await prayer_model.findByIdAndDelete({_id:getID});
          return res.json({success:"record has been deleted",status:200})

    }catch(error){
        console.error(error)
    }
}
exports.delete_welcome = async(req,res)=>{
    get_welcome_id = req.params.id;
     try{
           await welcome_model.findOneAndDelete(get_welcome_id);
           res.json({message:"record has been deleted successfully",status:200});
     }catch(error){
        console.error(error);
     }
}
exports.delete_audio_sermon = async(req,res)=>{
        get_audio_id = req.params.id;
         await audio_model.findOneAndDelete(get_audio_id)
         .then( deleted =>{
              if(deleted){
                res.json({message:"deleted",status:200});
              }else{
                    res.json({message:"could not delete audio"})
              }
           
         })
        .catch(error =>{
            console.log(error);
        })
}

exports.send_email = async(req,res)=>{
      data = req.body;
      const {to,subject,text}=req.body;
      const mailOptions = {
          from: process.env.EMAIL,
          to,
          subject,
          text
      }
        
      try{
         await transporter.sendMail(mailOptions);
         res.status(200).json({message:"email sent successfully"});
      }catch(error){
        res.status(500).json({error:error.message});
      }
    
}

 