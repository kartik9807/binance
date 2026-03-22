from utils import get_response_llm, create_client
import json


def trade_signal_agent(messages):
    client = create_client()

    system_prompt = """
You are TradeSignalAgent, an AI trading assistant.

Your task:
Generate a crypto trade signal based on the user's request.

Your response must include:
- decision (BUY / SELL / HOLD)
- entry price
- take profit
- stop loss
- short reasoning

Output format (JSON only):

{
"chain_of_thought": "Explain briefly how you generated the trade signal.",
"decision": "BUY or SELL or HOLD",
"entry_price": "",
"take_profit": "",
"stop_loss": "",
"message": "Short explanation of the trade signal."
}

Rules:
1. Respond ONLY with JSON.
2. Do NOT write anything outside JSON.
3. Do NOT use code fences.
"""

    input_message = [{"role": "system", "content": system_prompt}] + messages[-3:]

    response = get_response_llm(client, input_message)

    return pre_process_output(response)


def pre_process_output(response):
    try:
        output = json.loads(response)
    except:
        output = {
            "decision": "HOLD",
            "message": "Unable to generate trade signal."
        }

    return {
        "role": "assistant",
        "content": output["message"],
        "decision": output["decision"],
        "entry_price": output.get("entry_price"),
        "take_profit": output.get("take_profit"),
        "stop_loss": output.get("stop_loss"),
        "agent": "trade_signal_agent"
    }