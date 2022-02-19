import express from "express";
const port = process.env.PORT || 3000;
const app = express();

app.listen(port, (error) => {
  if (error) console.log(`Wystąpił błąd: ${error}`);
  console.log(`Serwer uruchomiony na porcie ${port}`);
});
