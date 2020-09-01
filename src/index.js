const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const blogRouter = require("./routes/blogRouter");

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/blog/", blogRouter);

app.listen(process.env.PORT || 5000);
