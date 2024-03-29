const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const proxyOptions = { timeout: 600000 };

app.use("/message", proxy("http://localhost:8007", proxyOptions));
app.use("/chat", proxy("http://localhost:8006", proxyOptions));
app.use("/comment", proxy("http://localhost:8005", proxyOptions));
app.use("/like", proxy("http://localhost:8004", proxyOptions));
app.use("/post", proxy("http://localhost:8003", proxyOptions));
app.use("/connection", proxy("http://localhost:8002", proxyOptions));
app.use("/auth", proxy("http://localhost:8001", proxyOptions));
app.use("/", (req, res) => {
  res.status(200).json("Oops Nothing here");
});

// app.use(
//   "/message",
//   proxy("https://social-backend-message.onrender.com", proxyOptions)
// );
// app.use(
//   "/chat",
//   proxy("https://social-backend-chat.onrender.com", proxyOptions)
// );
// app.use(
//   "/comment",
//   proxy("https://social-backend-comment.onrender.com", proxyOptions)
// );
// app.use(
//   "/like",
//   proxy("https://social-backend-like.onrender.com", proxyOptions)
// );
// app.use(
//   "/post",
//   proxy("https://social-backend-post.onrender.com", proxyOptions)
// );
// app.use(
//   "/connection",
//   proxy("https://social-backend-connection.onrender.com", proxyOptions)
// );
// app.use(
//   "/auth",
//   proxy("https://social-backend-auth.onrender.com", proxyOptions)
// );
// app.use("/", (req, res) => {
//   res.status(200).json("Oops Nothing here");
// });

app.listen(8000, () => {
  console.log("Gateway is Listening to Port 8000");
});
