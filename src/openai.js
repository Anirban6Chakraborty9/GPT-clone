import OpenAI from 'openai';

const APIKEY = process.env.REACT_APP_SECRET_KEY;
console.log(`API Key: ${APIKEY}`);

const openai = new OpenAI({
        apiKey: APIKEY, //'sk-proj-JlUyzIVfNcJRxc2NjxKvT3BlbkFJm07iuhUpM8A82fpn5iv9', //process.env.SECRET_KEY,
        dangerouslyAllowBrowser: true
      });


export async function sendMsgToOpenAI(message){
        const res = await openai.completions.create({
                model: 'gpt-3.5-turbo-instruct',
                prompt: message,
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0
        });
        return res.choices[0].text;
}