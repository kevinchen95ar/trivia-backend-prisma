//Imports
import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/routes";

//Definition
const app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(morgan("dev"));
app.use(express.json());
app.use(router);
app.use(cors(corsOptions));

const PORT = 4000;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
