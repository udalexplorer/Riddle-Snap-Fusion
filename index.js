import express  from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL_1 = "https://picsum.photos/500/200";
const API_URL_2 = "https://riddles-api.vercel.app/random";

app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get("/", async (req, res) => {
try {
    const photoResult = await axios.get(API_URL_1)
    const riddleResult = await axios.get(API_URL_2);

    const photo = { url: API_URL_1, data: photoResult.data };
    const { riddle, answer } = riddleResult.data; 
    res.render("index.ejs", { photo, riddle, answer })
} catch(error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
}
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}) 