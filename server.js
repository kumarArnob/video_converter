//jshint esversion:6
const express = require("express");
const BodyParser = require("body-parser");
const ejs =require("ejs");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const fileUpload = require("express-fileupload");


const app = express();
app.use(express.static("public"));
app.use(BodyParser.urlencoded({extended:true}));
app.use(BodyParser.json());
app.set('view engine','ejs');


app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );



//locate ffmpeg:-
ffmpeg.setFfmpegPath("C:/ffmpeg/bin/ffmpeg.exe");

ffmpeg.setFfprobePath("C:/ffmpeg/bin");

ffmpeg.setFlvtoolPath("C:/flvtool");

console.log(ffmpeg);

  
//Index page :-
app.get("/",(req,res)=>{
  var send = "Successfull ..";
  let send2 = "Host ...";
  res.render("index",{
      text:send,
      text2:send2

  });
});

//Post request :-
app.post("/convert",(req,res)=>{
    let to = req.body.to;
    //console.log(to);
    let file = req.files.file;
    let filename = `output.${to}`;
    console.log(filename);

   // console.log(file);
   
    file.mv("tmp/" + file.name, function (err) {
        if (err) return res.sendStatus(500).send(err);
        console.log("File Uploaded successfully");
      });
    
      ffmpeg("tmp/" + file.name)
      .withOutputFormat(to)
      .on('end',(stdout,stderr)=>{
          console.log("finished..");
            res.download(__dirname + filename, function (err) {
             if (err) throw err;
    
             fs.unlink(__dirname + filename, function (err) {
              if (err) throw err;
              console.log("File deleted");
             });
            });
            fs.unlink("tmp/" + file.name, function (err) {
                if (err) throw err;
                console.log("File deleted");
              });
          })
        .on("error",(err)=>{
         
              console.log("Error occur ..");

              fs.unlink("tmp/" + file.name, function (err) {
                if (err) throw err;
                console.log("File deleted");
              });
          

         })
      .saveToFile(__dirname + filename)
})


app.listen(3000,()=>{
    console.log("Server is running ....@3000");
})