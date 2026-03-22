from utils import get_response_llm, create_client
import json


def guard_other_agents(messages):
    client = create_client()

    system_prompt = """
You are GuardAgent for a crypto trading AI assistant.

Your task is to check whether the user's request is relevant to cryptocurrency trading.

Allowed questions:
1. Questions about cryptocurrencies (BTC, ETH, etc.).
2. Market analysis or price discussion.
3. Trade signals or trading strategies.
4. Risk management or portfolio discussion.
5. Questions about indicators (RSI, MACD, volume, trends).

Not allowed questions:
1. Questions unrelated to trading or cryptocurrency.
2. Illegal activities (fraud, hacking exchanges, market manipulation).
3. Personal advice unrelated to trading.
4. Harmful or unethical requests.

Output format:
Respond ONLY in JSON exactly like this example:

{
"chain_of_thought": "Brief reasoning why the input is allowed or not.",
"decision": "allowed" or "not allowed",
"message": "If allowed say: Request accepted. Analyzing the market. If not allowed say: Sorry, I can only assist with cryptocurrency trading related questions."
}

Do NOT write anything outside the JSON.
Do NOT use code fences.
Do NOT change the JSON structure.
"""

    input_message = [{"role": "system", "content": system_prompt}] + messages[-3:]

    response = get_response_llm(client, input_message)

    print("response of guard-agent:", response)

    return pre_process_output(response)


def pre_process_output(response):
    try:
        output = json.loads(response)
    except Exception:
        output = {
            "decision": "not allowed",
            "message": "Sorry, I can only assist with cryptocurrency trading related questions."
        }

    return {
        "role": "assistant",
        "content": output["message"],
        "decision": output["decision"],
        "agent": "guard_agent"
    }


