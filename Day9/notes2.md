# Serving React Frontend from Express Backend

## Why We Do This

During development:

```txt
Frontend  -> http://localhost:5173
Backend   -> http://localhost:3000
```

Both run on different origins, so CORS issues can happen.

In production, instead of running two separate servers, we build the React app and serve it directly from Express backend.

This allows both frontend and backend to run on:

```txt
http://localhost:3000
```

So:

- Easier deployment
- No separate frontend server
- No CORS issue
- Single origin setup

---

# Step 1 — Build the React App

Inside frontend folder:

```bash
npm run build
```

This converts the React app into optimized static files.

Example build output:

```txt
index.html
assets/index.js
assets/index.css
```

These files contain the entire frontend code.

---

# Step 2 — Move Build Files to Backend

Create a `public` folder inside backend:

```txt
backend/
 ├── public/
```

Copy all build files into this `public` folder.

---

# Step 3 — Serve Static Files

In `app.js`:

```js
app.use(express.static("./public"))
```

This makes all files inside `public` publicly accessible.

Now browser can access:

```txt
/assets/index.js
/assets/index.css
/images/logo.png
```

Without this line, CSS and JS files would not load.

---

# Step 4 — Send index.html for Unknown Routes

Import path module:

```js
const path = require("path")
```

Note:

`path` is a built-in Node.js module.  
No installation required.

Now add:

```js
app.use("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "public", "index.html")
  )
})
```

---

# Understanding This Properly

## __dirname

```js
console.log(__dirname)
```

Gives current folder path.

Example:

```txt
C:/project/backend/src
```

---

## ".."

Means:

```txt
Go one folder back
```

So:

```js
path.join(__dirname,"..","/public/index.html")
```

creates correct path to:

```txt
public/index.html
```

---

# What Happens Internally

Suppose user visits:

```txt
http://localhost:3000/profile
```

Backend does not have `/profile` API route.

So Express sends:

```txt
index.html
```

as response.

Now browser reads `index.html`.

Inside it, links already exist:

```html
<script src="/assets/index.js"></script>

<link rel="stylesheet" href="/assets/index.css">
```

Browser now requests these files from backend server.

Because of:

```js
app.use(express.static("./public"))
```

Express can successfully serve them.

Then React loads completely in browser.

After that, React Router handles routes like:

```txt
/profile
/dashboard
/about
```

on frontend side.

---

# Final Understanding

React frontend is converted into static files and served by Express backend using `express.static()`.

For unknown routes, backend returns `index.html`, allowing React Router to handle frontend routing.

This setup runs both frontend and backend on the same server and avoids CORS issues.