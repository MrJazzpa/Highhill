fetch('/api/insert_about',{
    method:'POST',
    haders:{
        'Content-Type':'application/json'
    },
    body: formData
})
.then(response=>response.text())
.then(data=>{
    alert('data')
})
.catch(error=>{
    console.error('Error:',error)
})




$(document).ready(function(){
    $('#about_form').on('submit',function(e){
        var msg ="";
        e.preventDefault();
        const formData = {
            about_text: $('#about_text').val()
        }
       
        if(formData.about_text==""){
             msg ="<div class='alert alert-danger alert-dismissible fade show'> <button type='button' class='close' data-dismiss='alert'>&times;</button> Please fill in the text field</div>";
            $('#msg').append(msg)
        }
        $ajax({
            type:'POST',
            url:'http://localhost:3000/api/insert_about',
            data:$('#about_form').serialize(),
            dataType:'json',
            encode:true,
            success:function(data){
                $('#msg').html('<p>'+data+'</p>');
            },
            error:function(xhr,status,error){
                $('#msg').html('<p>An error occurred: ' + error + '</p>');
            }
        })
    })
})



$.post('http://localhost:3000/api/insert_banner',
    {
       data: formdata
   },
   function(response){
             if(response.status==200){
           msg ="<div class='alert alert-success alert-dismissible fade show'> <button type='button' class='close' data-dismiss='alert'>&times;</button>Record has been Inserted</div>";
           $('#msg').append(msg)
       }else{
           msg ="<div class='alert alert-danger alert-dismissible fade show'> <button type='button' class='close' data-dismiss='alert'>&times;</button>an error !! Please make sure all the fields are inputed</div>";
           $('#msg').append(msg)
       }
   });


    try{
       const {originalname,filename}= req.file;
       const filepath =path.join('./uploads',filename);
       const newimage = ({
           name:originalname,
           path:filepath
       })
       // rs_image = await bannerModel(newimage)
       // if(rs_image){
         //  console.log('fileuploaded successfully');
        //}
        console.log(newimage);
      }catch(error){
        console.log(error);
      } 



      var storage = multer.diskStorage({
          destination:(req,file,cb)=>{
              //cb(null,'../public/uploads/')
              const uploadpath = path.join(__dirname,'./uploads');
              if(!fs.existsSync(uploadpath)){
                  fs.mkdirSync(uploadpath);
              }
              cb(null,uploadpath);
          },
          filename:(req,file,cb)=>{
              const fileExtension = path.extname(file.originalname);
              const filename = Date.now()+fileExtension;
              cb(null,filename);
          }
      });


      <div id="camera_wrap">
						<div data-src="images/slide01.jpg">
							<div class="camera_caption fadeFromRight">
								<a href="#" class="button0">read more<em></em></a>
							</div>
						</div>
						<div data-src="images/slide02.jpg">
							<div class="camera_caption fadeFromRight">
								<a href="#" class="button0">read more<em></em></a>
							</div>
						</div>
						<div data-src="images/slide03.jpg">
							<div class="camera_caption fadeFromRight">
								<a href="#" class="button0">read more<em></em></a>
							</div>
						</div>
					</div>




$.post("http://localhost:3000/api/update_welcome",{
                       
    update_welcome_text :update_welcome
},
function(response){

 if(response.status==200){
     msge ="<div class='alert alert-success alert-dismissible fade show'> <button type='button' class='close' data-dismiss='alert'>&times;</button>Record has been updated</div>";
     $('#msge').append(msge)
 }else{
     msge ="<div class='alert alert-danger alert-dismissible fade show'> <button type='button' class='close' data-dismiss='alert'>&times;</button>Error updating record</div>";
     $('#msge').append(msge)
 }

});



document.getElementById("logo_file").addEventListener("change",
    function(event){
        const file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = function(e){
                const imgElement = document.createElement("img");
                imgElement.src = e.target.result;
                const previewDiv = document.getElementById("preview_image");
                previewDiv.innerHTML='';
                previewDiv.appendChild(imgElement);
            };
            reader.readAsDataURL(file);
        }else{
            document.getElementById('preview_image').innerHTML = "no image selected";
        }

    })

    if(!req.file && heading== "" ){
    
          return  res.status(403).json({message:"file cannot be empty "})
    
         }else{
            try{
                const heading = req.body.audio_heading;
                const fileName = req.file.filename;
               
          }catch(error){
              console.error(error);
          }
         }