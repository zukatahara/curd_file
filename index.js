const express = require("express");
const app = express();
const fs = require("fs");
app.get("/",(req,res)=>{
  res.send(`hello`);

})
app.get("/create", (req, res) => {
  const data = req.query.data;
  if (data) {
    fs.appendFile(`${data}.txt`, `${data} and ${Date.now()}`, (err) => {
      if (err) throw err;
      res.send(`Tao thanh cong ${data}.txt`)
      console.log(`Saved!`);
    });
  }
});
app.get("/read", (req, res) => {
  const fileUrl = req.query.data;
  if (fileUrl) {
    const rs = fs.readFile(
      `${fileUrl}.txt`,
      { encoding: "utf-8" },
      (err, data) => {
        if (err) res.send(`ko tim thay file ${fileUrl}.txt`);
        res.download(`${fileUrl}.txt`);
      }
    );
  }
});
app.get("/delete", (req, res) => {
  const fileUrl = req.query.data;
  if (fileUrl) {
    fs.unlink(`${fileUrl}.txt`, function (err) {
      if (err) res.send(`Ko tim thay ${fileUrl}.txt`);
      res.send(`Delelte success!!!!`)
    });
  }
});
app.listen(3000, console.log(`running!!!`));
