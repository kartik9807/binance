from utils import get_response_llm, create_client
import json


def classify_response_agent(messages):
    client = create_client()

    system_prompt = """
You are ClassificationAgent for a crypto trading AI system.

Your job is to decide which specialized trading agent should handle the user's request.

Available agents:

1. market_analysis_agent
Handles:
- Market analysis
- Trend discussion
- Technical indicators (RSI, MACD, support/resistance)
- Price movement explanations

2. trade_signal_agent
Handles:
- Requests for trade signals
- Entry price
- Stop loss
- Take profit
- Buy/sell decisions

3. risk_management_agent
Handles:
- Portfolio management
- Risk control
- Position sizing
- Risk-reward discussions

Task:
Analyze the user's request and decide which agent should respond.

Output format:
Respond ONLY in JSON exactly like this:

{
"chain_of_thought": "Explain briefly why this agent is the best choice.",
"decision": "market_analysis_agent" | "trade_signal_agent" | "risk_management_agent",
"message": ""
}

Rules:
1. Output MUST be valid JSON.
2. Do NOT write anything outside the JSON.
3. Do NOT use code fences.
4. Follow the format exactly.
"""

    input_message = [{"role": "system", "content": system_prompt}] + messages[-3:]

    response = get_response_llm(client, input_message)

    print("classification raw response:", response)

    output = pre_process_output(response)

    print("classification processed output:", output)

    return output


def pre_process_output(response):

    try:
        output = json.loads(response)
    except Exception:
        output = {
            "decision": "market_analysis_agent",
            "message": ""
        }

    return {
        "role": "assistant",
        "content": output.get("message", ""),
        "decision": output["decision"],
        "agent": "classification_agent"
    }