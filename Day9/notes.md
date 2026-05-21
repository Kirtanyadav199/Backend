# CORS

## Why CORS Exists

Frontend and backend often run on different origins.

Example:

Frontend:
http://localhost:5173

Backend:
http://localhost:3000

Different ports = different origins.

So browser blocks frontend from accessing backend response for security.

---

## Important Point

Frontend CAN send request.

But browser blocks the RESPONSE if backend does not allow it.

---

## Solution

Install cors package:

```bash
 npm i cors 

## Use in app.js

```js
const cors = require("cors")

app.use(cors())


## Production

=> Instead of allowing everyone:

app.use(cors()) 

=> Allow only your frontend:

app.use(cors({
  origin: "https://yourfrontend.com"
}))


--------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////


frontend folder me ham npm run build command chalate hain jisse ki 3 files ban jati hai index.html, .css, .js aur ye teeno file me react ka sara ab tk ka code hota hai , fir ham backend ke folder me ek public folder bna kr in teeno ko usme daal dete hain, fir backend me ham app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})
 is line ka use krte hain, lekin usse pehle hame require('path') likh kr path package install krna padta hai, uske baad agar ham console.log(__dirname); kre to isse hame hamari current file ke folder tk ka adrress mil jata hai bs isi ka use krke ham response me res.sendFile(path.join(__dirname,"..","/public/index.html")) send kr dete hain, ".." back jane ke liye use krte hain, iska mtlb ye hua ki response me hamne index.html file bhej di , mtlb use jab bhi esi koi api request bbhejehga jo hamne nahi banai hai to usko index.html file mil jayegi response me , fir kyuki is index.html file ke andar .js aur .css file ki link hai to ye unse connect hone ke liye request kregi, lekin vo request backend ke server pr hogi http://localhost:3000/assests/index.css , lekin hamne to esi koi api nhi banai esliye hame firse , index.html file hi milegi, fir ham hamari app.js file ke andar app.use(express.static("./public")) iska use krenge , isse public folder ke andar ki sari file , publically access ki ja sakti hai, to ab jab index.html file , .css.js ko acess kregi http://localhost:3000/assests/index.css is url se to vo kr payegi, isse ye hua ki hamne ek single url http://localhost:3000 pr frontend aur backend dono chala diya 