Authentication => identify krna ki request kis user ke pass se aayi hai 


Authorization => user kya kya kr sakta hai 


Validation  => data ka formate check krna 


verification => data shi hai ya nahi


////////////////////////////////////////////////////////////////////////////////////////////

# JWT Authentication Flow

## 1. User sends data

Frontend sends:

```js
axios.post("/login", data)
```

Backend gets:

```js
req.body
```

---

## 2. Backend checks user

- email check
- password check

---

## 3. Backend creates token

```js
const token = jwt.sign(
   { id:user._id },
   process.env.JWT_SECRET
)
```

---

## 4. JWT_SECRET

Stored in `.env`

```env
JWT_SECRET=mysecretkey
```

Used to create signature.

---

## 5. Backend sends token

```js
res.json({ token })
```

---

## 6. Frontend stores token

```js
localStorage.setItem("token", token)
```

---

## 7. Frontend sends token again

```js
Authorization: Bearer token
```

---

## 8. Backend verifies token

```js
jwt.verify(token, JWT_SECRET)
```

If valid:
- access granted

If invalid:
- access denied

---

# JWT Structure

```text
HEADER.PAYLOAD.SIGNATURE
```

- Header → token info
- Payload → user data
- Signature → security check

---

# Signature Meaning

Token is signed using `JWT_SECRET`.

If someone changes token data:
- signature breaks
- token becomes invalid

---

# Important Functions

## Create Token

```js
jwt.sign(payload, secret)
```

## Verify Token

```js
jwt.verify(token, secret)
```

---

# One Line Summary

User logs in →
backend creates token →
frontend stores token →
frontend sends token →
backend verifies token.