# 🧠 Backend Notes

> ⚠️ If you truly want to master backend, never leave even the smallest doubt uncleared.  
> Small confusion today becomes a massive problem later.

---

# ▶️ Running JavaScript Outside the Browser

Node.js allows us to run JavaScript directly in the terminal.

## Command

```bash
node <fileName>
```

## Example

```bash
node app.js
```

This executes the `app.js` file using Node.js.

---

# 📦 Using Packages in JavaScript

To use installed packages/modules inside a JS file, we use:

```js
const variable = require("package-name")
```

## Example

```js
const express = require("express")
```

Here:
- `express` → variable
- `"express"` → installed package name

Now we can use all features of the Express package through the `express` variable.

---


/////////////////////////////////////////////////////////////////////////////////////

# package.json vs node_modules vs package-lock.json

## 📦 package.json
The blueprint/config file of the project.

It contains:
- project information
- scripts
- dependencies
- versions

Example:

```json
{
  "name": "my-app",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^5.0.0"
  }
}
```

### Main Purpose
Tells Node/npm:
> "What packages this project needs."

---

## 📁 node_modules
The actual storage folder of all installed packages.

When we run:

```bash
npm install
```

npm downloads all dependencies inside:

```bash
node_modules/
```

It contains:
- installed packages
- sub-dependencies
- package source code

### Important
- Very large folder
- Auto-generated
- Never push to GitHub
- Can be recreated using `npm install`
- Added in `.gitignore`:

---

## 🔒 package-lock.json
Automatically generated lock file.

It stores:
- exact package versions
- exact dependency tree
- exact installed structure

### Main Purpose
Ensures:
> "Everyone installs the EXACT same versions."

Without it:
- different developers may get different package versions
- project may behave differently


//////////////////////////////////////////////////////////////////////////////////////

