document.getElementById('solveButton').addEventListener('click', function() {
    sendMessage();
  });
  
  document.getElementById('mathProblem').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
  
  function sendMessage() {
    const problem = document.getElementById('mathProblem').value;
  
    const data = JSON.stringify({
      messages: [
        {
          role: 'user',
          content: problem
        }
      ],
      model: 'gpt-4o',
      max_tokens: 100,
      temperature: 0.9
    });
  
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
  
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === this.DONE) {
        console.log("Raw response:", this.responseText); // Log the raw response for debugging
        try {
          const response = JSON.parse(this.responseText);
          console.log("Parsed response:", response); // Log the parsed response
          if (response.choices && response.choices.length > 0 && response.choices[0].message) {
            document.getElementById('resultText').textContent = response.choices[0].message.content || "No response found";
          } else {
            document.getElementById('resultText').textContent = "Unexpected response structure";
          }
        } catch (e) {
          document.getElementById('resultText').textContent = "Error parsing response";
          console.error("Parsing error:", e);
        }
      }
    });
  
    xhr.addEventListener('error', function () {
      document.getElementById('resultText').textContent = "Network error occurred";
      console.error("Network error:", this.status, this.statusText);
    });
  
    xhr.open('POST', 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions'); xhr.setRequestHeader('x-rapidapi-key', '30b010fe3bmsh9c62862375a0477p1de84fjsncd33719126eb'); xhr.setRequestHeader('x-rapidapi-host', 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com'); xhr.setRequestHeader('Content-Type', 'application/json');
  
    xhr.send(data);
  }
  
  console.log("hi");
  