const dotenv = require("dotenv");
dotenv.config({ path: `./config.env` });
const app = require("./app");
const mongoose = require("mongoose");
// const Email = require("./utils/email");
// console.log("printing", typeof Email);
// const email = new Email(
//   { email: "undefined"n name: "undefined" },
//   "789000",
//   "signup"
// );

const DB = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
// console.log(
//   new Email({ email: "undefined", name: "undefined" }, "789000", "signup")
// );
// console.log("printing", email);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
mongoose
  .connect(DB)
  .then(() => console.log("DB connection succesful"))
  .catch((err) => console.log(err.message));
app.listen(PORT, "127.0.0.1", () => console.log("app is running"));
