from utils import get_response_llm, create_client
import json


def risk_management_agent(messages):
    client = create_client()

    system_prompt = """
You are RiskManagementAgent, a crypto trading risk expert.

Your job:
Provide advice about risk management in trading.

Topics you handle:
- position sizing
- risk-reward ratio
- stop-loss strategy
- portfolio diversification
- capital management

Output format (JSON only):

{
"chain_of_thought": "Explain briefly how you evaluated the risk.",
"message": "Provide clear risk management advice."
}

Rules:
1. Respond ONLY with JSON.
2. Do NOT write anything outside the JSON.
3. Do NOT use code fences.
"""

    input_message = [{"role": "system", "content": system_prompt}] + messages[-3:]

    response = get_response_llm(client, input_message)

    return pre_process_output(response)


def pre_process_output(response):
    try:
        output = json.loads(response)
    except:
        output = {"message": "Unable to evaluate trading risk."}

    return {
        "role": "assistant",
        "content": output["message"],
        "agent": "risk_management_agent"
    }