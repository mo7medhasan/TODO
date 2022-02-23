const express =require('express');
const app =express();
const cors =require('cors');


app.use(express.json())
app.use(cors())

require("./DB");






app.listen(process.env.PORT || 5000, () => {
    console.log(`server listen on ${process.env.PORT}  👌👏`)
})
