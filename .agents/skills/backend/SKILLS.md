# Story Generation API — Integration Guide

> **Model:** Mistral-MOE-4X7B-Dark-MultiVerse-Uncensored-Enhanced32-24B (Q4_K_M)  
> **Base URL:** `http://206.189.135.39:8080`  
> **Protocol:** OpenAI-compatible REST API  
> **Auth:** None required (add your own auth layer in production)

---

## 1. Health Check

Verify the server is running before sending requests.

### Request
```
GET http://206.189.135.39:8080/health
```

### Response
```json
{
  "status": "ok"
}
```

### Example (cURL)
```bash
curl http://206.189.135.39:8080/health
```

---

## 2. Generate a Story

The main endpoint for story generation. Uses the OpenAI Chat Completions format.

### Endpoint
```
POST http://206.189.135.39:8080/v1/chat/completions
```

### Headers
```
Content-Type: application/json
```

### Request Body

```json
{
  "model": "local",
  "messages": [
    {
      "role": "system",
      "content": "You are a creative fiction writer. Write vivid, detailed, immersive stories."
    },
    {
      "role": "user",
      "content": "Write a dark fantasy story about a rogue assassin in a medieval city."
    }
  ],
  "max_tokens": 1024,
  "temperature": 0.9,
  "top_p": 0.95,
  "top_k": 50,
  "min_p": 0.05,
  "repeat_penalty": 1.1,
  "presence_penalty": 0.5,
  "frequency_penalty": 0.3,
  "stream": false
}
```

### Request Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `model` | string | ✅ | — | Always set to `"local"` |
| `messages` | array | ✅ | — | Array of message objects (see below) |
| `max_tokens` | integer | ❌ | 512 | Max tokens to generate. Use 512–2048 for stories |
| `temperature` | float | ❌ | 0.9 | Creativity level. Range: 0.0–2.0. Higher = more creative |
| `top_p` | float | ❌ | 0.95 | Nucleus sampling. Range: 0.0–1.0 |
| `top_k` | integer | ❌ | 50 | Top-K sampling. Set to 0 to disable |
| `min_p` | float | ❌ | 0.05 | Min-P sampling threshold |
| `repeat_penalty` | float | ❌ | 1.1 | Penalize repetition. Range: 1.0–1.5 |
| `presence_penalty` | float | ❌ | 0.5 | Penalize already-used topics |
| `frequency_penalty` | float | ❌ | 0.3 | Penalize frequently-used tokens |
| `stream` | boolean | ❌ | false | Stream response token by token |

### Message Object Structure

```json
{
  "role": "system" | "user" | "assistant",
  "content": "string"
}
```

| Role | Purpose |
|------|---------|
| `system` | Sets the model's behavior and persona |
| `user` | The user's story prompt or instruction |
| `assistant` | Previous model responses (for multi-turn conversations) |

---

## 3. Response Format

### Non-Streaming Response (`stream: false`)

```json
{
  "id": "chatcmpl-abc123",
  "object": "chat.completion",
  "created": 1718000000,
  "model": "local",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "The cobblestones glistened under the pale moonlight..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 48,
    "completion_tokens": 312,
    "total_tokens": 360
  }
}
```

### Extracting the Story Text

```python
story = response["choices"][0]["message"]["content"]
```

```javascript
const story = response.choices[0].message.content;
```

### Finish Reason Values

| Value | Meaning |
|-------|---------|
| `"stop"` | Generation completed normally |
| `"length"` | Hit `max_tokens` limit — increase it for longer stories |
| `"error"` | Something went wrong |

---

## 4. Streaming Response (`stream: true`)

Use streaming for real-time word-by-word output in your UI.

### Request
```json
{
  "model": "local",
  "messages": [...],
  "max_tokens": 1024,
  "stream": true
}
```

### Response Format (Server-Sent Events)

The server returns a stream of `data:` lines:

```
data: {"id":"chatcmpl-abc","choices":[{"delta":{"content":"The"},"finish_reason":null}]}
data: {"id":"chatcmpl-abc","choices":[{"delta":{"content":" cobblestones"},"finish_reason":null}]}
data: {"id":"chatcmpl-abc","choices":[{"delta":{"content":" glistened"},"finish_reason":null}]}
data: [DONE]
```

### Extracting Streaming Tokens

```python
# Extract each token
token = chunk["choices"][0]["delta"].get("content", "")
```

```javascript
const token = chunk.choices[0].delta.content || "";
```

---

## 5. Code Examples

### Python (requests)

```python
import requests

url = "http://206.189.135.39:8080/v1/chat/completions"

payload = {
    "model": "local",
    "messages": [
        {
            "role": "system",
            "content": "You are a creative fiction writer. Write vivid, immersive stories."
        },
        {
            "role": "user",
            "content": "Write a dark fantasy story about a rogue assassin."
        }
    ],
    "max_tokens": 1024,
    "temperature": 0.9,
    "min_p": 0.05,
    "repeat_penalty": 1.1,
    "presence_penalty": 0.5,
    "frequency_penalty": 0.3,
    "stream": False
}

response = requests.post(url, json=payload)
data = response.json()
story = data["choices"][0]["message"]["content"]
print(story)
```

---

### Python (openai library)

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://206.189.135.39:8080/v1",
    api_key="dummy"  # Required by library but ignored by server
)

response = client.chat.completions.create(
    model="local",
    messages=[
        {"role": "system", "content": "You are a creative fiction writer."},
        {"role": "user", "content": "Write a dark fantasy story about a rogue assassin."}
    ],
    max_tokens=1024,
    temperature=0.9,
    presence_penalty=0.5,
    frequency_penalty=0.3
)

story = response.choices[0].message.content
print(story)
```

---

### Python (Streaming)

```python
from openai import OpenAI

client = OpenAI(
    base_url="http://206.189.135.39:8080/v1",
    api_key="dummy"
)

stream = client.chat.completions.create(
    model="local",
    messages=[
        {"role": "system", "content": "You are a creative fiction writer."},
        {"role": "user", "content": "Write a story about a dragon."}
    ],
    max_tokens=1024,
    temperature=0.9,
    stream=True
)

for chunk in stream:
    token = chunk.choices[0].delta.content or ""
    print(token, end="", flush=True)
```

---

### JavaScript (fetch)

```javascript
const response = await fetch("http://206.189.135.39:8080/v1/chat/completions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "local",
    messages: [
      { role: "system", content: "You are a creative fiction writer." },
      { role: "user", content: "Write a dark fantasy story about a rogue assassin." }
    ],
    max_tokens: 1024,
    temperature: 0.9,
    min_p: 0.05,
    repeat_penalty: 1.1,
    presence_penalty: 0.5,
    frequency_penalty: 0.3,
    stream: false
  })
});

const data = await response.json();
const story = data.choices[0].message.content;
console.log(story);
```

---

### JavaScript (Streaming)

```javascript
const response = await fetch("http://206.189.135.39:8080/v1/chat/completions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "local",
    messages: [
      { role: "system", content: "You are a creative fiction writer." },
      { role: "user", content: "Write a story about a dragon." }
    ],
    max_tokens: 1024,
    temperature: 0.9,
    stream: true
  })
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const lines = decoder.decode(value).split("\n");
  for (const line of lines) {
    if (line.startsWith("data: ") && line !== "data: [DONE]") {
      const chunk = JSON.parse(line.slice(6));
      const token = chunk.choices[0].delta.content || "";
      process.stdout.write(token);
    }
  }
}
```

---

## 6. Multi-Turn Conversation (Story Continuation)

To continue a story across multiple turns, pass the full conversation history:

```python
messages = [
    {"role": "system", "content": "You are a creative fiction writer."},
    {"role": "user", "content": "Start a story about a pirate captain."},
    {"role": "assistant", "content": "Captain Rael stood at the bow..."},  # Previous response
    {"role": "user", "content": "Continue the story, make it more intense."}
]
```

### Context Management

The model has a **32,768 token context window**. For long stories, trim old messages to avoid hitting the limit:

```python
MAX_CONTEXT_TOKENS = 28000  # Leave buffer

def trim_history(messages):
    system = messages[0]  # Always keep system prompt
    history = messages[1:]
    
    # Rough token estimate: 1 token ≈ 4 characters
    while sum(len(m["content"]) // 4 for m in history) > MAX_CONTEXT_TOKENS:
        history.pop(0)  # Remove oldest message
    
    return [system] + history
```

---

## 7. Error Handling

### Common Errors

| HTTP Code | Error | Fix |
|-----------|-------|-----|
| `400` | `exceed_context_size_error` | Reduce message history or increase server `-c` flag |
| `500` | `Internal Server Error` | Server overloaded, retry after a few seconds |
| `Connection refused` | Server not running | Check if llama-server is running on port 8080 |

### Error Response Format

```json
{
  "error": {
    "code": 400,
    "message": "request (10913 tokens) exceeds the available context size (8192 tokens)",
    "type": "exceed_context_size_error"
  }
}
```

### Retry Logic (Python)

```python
import time

def generate_story(prompt, retries=3):
    for attempt in range(retries):
        try:
            response = requests.post(url, json=payload, timeout=120)
            response.raise_for_status()
            return response.json()["choices"][0]["message"]["content"]
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(2 ** attempt)  # Exponential backoff
            else:
                raise e
```

---

## 8. Recommended Sampler Settings

| Use Case | temperature | top_p | top_k | repeat_penalty |
|----------|-------------|-------|-------|----------------|
| **Creative fiction** | 0.9 | 0.95 | 50 | 1.1 |
| **Dark/intense stories** | 1.0 | 0.95 | 50 | 1.15 |
| **Consistent/factual** | 0.5 | 0.9 | 20 | 1.05 |
| **Experimental/wild** | 1.2 | 1.0 | 0 | 1.2 |

---

## 9. Available Endpoints Summary

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Server health check |
| `/v1/chat/completions` | POST | Generate story (main endpoint) |
| `/v1/models` | GET | List available models |
| `/metrics` | GET | Server performance metrics |

---

## 10. Performance Expectations

| Metric | Value |
|--------|-------|
| Prompt processing speed | ~1889 t/s |
| Generation speed | ~54 t/s |
| Time for 500 token story | ~9 seconds |
| Time for 1000 token story | ~18 seconds |
| Max context window | 32,768 tokens |
| Concurrent requests | 4 slots (default) |
