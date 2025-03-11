const Banner_model = require('../models/bannner_model');
const About_data = require('../models/about');
const welcome_model = require('../models/welcome_model');
const contact_model = require('../models/contact_model');
const prayer_model = require('../models/prayer_model');
const gallery_model = require('../models/gallery_model');
 const audio_model = require('../models/sermon_audio_model');
 const book_model = require('../models/book_model');


exports.home = async(req,res)=>{
    const locals={
        title:"Hilltop-Home"
    }
    try{
       
        const banners = await Banner_model.find();
        const getData = await About_data.find();
        const WelcomeNote = await welcome_model.find();
        //console.log(banners)
        res.render("index",
            {
                locals,
                banners,
                getData,
                WelcomeNote

            });

    }catch(error){
       console.error(error);
       res.status(500).json({message:'server error'});
    }
    
}

exports.sermon =  async(req,res)=>{
    const locals={
        title:"Hilltop-sermon",
        breadcomb: "Sermon",
    }
    res.render("pages/sermon",{locals});
}
exports.audio_sermon = async(req,res)=>{
    const locals={
        title:"Hilltop-sermon",
        breadcomb: " Audio-Sermon",
    }
     const audio_sermon = await audio_model.find()
    res.render("pages/audio_sermon",{locals,audio_sermon});
}
exports.about = async(req,res)=>{
    const locals={
        title:"Hilltop-about",
        breadcomb: "About"
    }
    try{
        about_data = await About_data.find();
        res.render("pages/about",{locals,about_data});

    }catch(error){
        console.error(error);
    }
}
exports.contact = async(req,res)=>{
    const locals={
        title:"Hilltop-contact",
        breadcomb: "Contact"
    }
    try{
         const getContact= await contact_model.find();

         res.render("pages/contact",{locals,getContact});
    }catch(error){
        console.error(error);
        res.json({error:"server error"})
    }
   
}
exports.ministries = async(req,res)=>{
    const locals={
        title:"Hilltop-Ministries",
        breadcomb: "Ministries"
    }
    res.render("pages/ministries",{locals});
}
exports.media = async(req,res)=>{
    const locals={
        title:"Hilltop-Media",
        breadcomb: "Media"
    }
    try{
         gal_data = await gallery_model.find();
        res.render("pages/media",{locals,gal_data});

    }catch(error){
       console.error(error);
    }
}
exports.community = async(req,res)=>{
    const locals={
        title:"Hilltop-community",
        breadcomb: "Community"
    }
    res.render("pages/community",{locals});
}


//Admin End
exports.signin = async(req,res)=>{
    const   locals ={
                   title:"Hilltop-Admin_signin"
       }
       res.render('Admin/pages-login',{locals});
   }

   exports.dashboard = async(req,res)=>{
    const  username = req.session.username;
        if(req.session.loggedin==true){
            locals ={
                title:"Admin Dashboard"
            }
         
            res.render('Admin/dashboards-crm',{username,locals});
        }
         else{
              res.redirect('/login');
         }
     
   }
   exports.dashboard_aboutPage = async(req,res)=>{
    if(req.session.loggedin == true){
        locals ={
            title:"Dashboard-ABout"
        }
      const  username = req.session.username;
        res.render('Admin/dashboards-about',{username,locals});
    }else{
        res.redirect('/login');
   }
   }
   exports.photoGallery = async(req,res)=>{
    if(req.session.loggedin==true){
        locals ={
            title:"Admin Dashboard"
        }
        const  username = req.session.username;
        res.render('Admin/dashboards-photo-upload',{locals,username});
    }
     else{
          res.redirect('/login');
     }
   
}
exports.upload_sermon= async(req,res)=>{
    if(req.session.loggedin == true){
        locals={
            title:"Admin-sermon"
        }
        const  username = req.session.username;
          audio_file = await audio_model.find()
        res.render('Admin/dashboards-sermon',{locals,username,audio_file});

    }else{
        res.redirect('/login');
    }
}

exports.manageHome = async(req,res)=>{
    if(req.session.loggedin == true){
        locals ={
            title:"Manage Home"
        }
  const  username = req.session.username;
       
        try{

            const banners = await Banner_model.find();
            const rs_welcome = await welcome_model.find();
            res.render('Admin/manage_home',{username,locals,banners,rs_welcome});
            //res.render('users',{banners})

        }catch(error){
           console.error(error);
           res.status(500).json({message:'server error'});
        }
    }else{
        res.redirect('/login');
   }
   }
   exports.test_page = async(req,res)=>{
         try{

             const banners = await Banner_model.find();
             res.status(200).json(banners);
             //res.render('users',{banners})

         }catch(error){
            console.error(error);
            res.status(500).json({message:'server error'});
         }
   }
   exports.MangeCntact = async(req,res)=>{
    if(req.session.loggedin == true){
        locals ={
            title:"Admin-Contact"
        }
        const  username = req.session.username;
        try{
            const prayerRequest = await prayer_model.find();
            res.render('Admin/dashboards-contact',{locals,username,prayerRequest});
          // console.log(prayerRequest);

        }catch(error){
            console.error(error)
        }
      }
        
   }
   exports.dashboard_book = async(req,res)=>{
      if(req.session.loggedin==true){
        locals ={
            title:"Admin-Books"
        }
         try{

            const  username = req.session.username;
            const Books = await book_model.find();
            res.render('Admin/dashboards-books',{locals,username,Books})

         }catch(error){
            console.error(error)
         }

      }else{
        res.redirect('/login');
      }
   }
   exports.logout = (req, res, next) => {
    req.session.destroy(err => {
      if (err) {
        next(err)
      } else {
        res.clearCookie('connect.sid')
        res.redirect('/login')
      }
    })
  }