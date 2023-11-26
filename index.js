import OpenAI from "openai";

const ctaEl = document.getElementById("cta");

let isStart = true;

ctaEl.addEventListener('click', () => {
    if (isStart) {
       translate();
    } else {
        toggleUI();
    }
});

async function translate() {
    let selectedLanguage = null;
    const radios = document.getElementsByName('language');
    for (let radio of radios) {
        if (radio.checked) {
            selectedLanguage = radio.value;
            break;
        }
    }

    if (selectedLanguage) {
        const translation = await request(selectedLanguage);
        console.log('3', translation)
        document.getElementById('output').textContent = translation;
        toggleUI();
    }

}

function toggleUI() {
    isStart = !isStart;
    ctaEl.textContent = isStart ? 'Translate' : 'Start Over';
    document.getElementById('radios').classList.toggle('hide');
    const output = document.getElementById('output')
    output.classList.toggle('hide');
    if (isStart) {
        output.textContent = '';
    }

}

async function request(language) {
    const openai = new OpenAI();

    const input = document.getElementById('input').value

    const messages = [
        {
            "role": "system",
            "content": `Given a text in English you will translate the text to the specified language. 
                In response only return the translation. There is an example included between ###.`
        },
        {
            "role": "user",
            "content": `${input} to ${language} ### How are you? Comment allez-vous?`
        }
    ]

    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: messages
    });

   return response.choices[0].message.content
}