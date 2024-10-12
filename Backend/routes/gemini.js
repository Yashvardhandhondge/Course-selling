const { GoogleGenerativeAI } =require("@google/generative-ai");
require('dotenv').config()


async function yash(prompt){
    try{
        const geniAi = new GoogleGenerativeAI(process.env.API_KEY);
        const model = geniAi.getGenerativeModel({model:'gemini-1.5-flash'});
        const result = await model.generateContent(prompt);
        console.log("Gemini response " +result.response.text());
        return result.response.text()
    }catch(e){
        console.error(e);
    }
}
module.exports={
    yash
}