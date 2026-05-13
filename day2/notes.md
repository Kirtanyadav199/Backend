# 🌐 Server, Request, Response & Port

## 🖥️ Server
A server is a continuously running program that:
- listens for requests
- processes them
- sends responses

### Flow

```text
Client/Browser → Request → Server → Response → Browser
```

---

# 📨 Request (`req`)

Request means:
> Client/browser kya maang raha hai

It contains:
- route
- data
- params
- headers
- query etc.

Example:

```js
req
```

---

# 📤 Response (`res`)

Response means:
> Server client ko kya bhej raha hai

Example:

```js
res.send("Hello")
```

---

# 🚪 Port

Port is like a gate/door of the computer.

Different services run on different ports.

| Port | Service |
|---|---|
| 3000 | Express Server |
| 5173 | Vite React App |
| 27017 | MongoDB |

Example:

```js
app.listen(3000)
```

Meaning:

```text
Server ko port 3000 par chalu karo
```

Then browser can access it using:

```text
localhost:3000
```

---

# ⚡ Express Server Example

```js
const express = require("express")

const app = express()

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(3000)
```

---

# 🧠 Understanding

## `app.get("/")`

Creates a route.

Meaning:
> Agar koi `/` route par aaye to ye function chalao

---

## `req`

Client ki demand/data.

---

## `res`

Server ka answer.

---

## `res.send()`

Response bhejne ke liye use hota hai.

---

## `app.listen(3000)`

Server ko port 3000 par continuously run karata hai.

---

