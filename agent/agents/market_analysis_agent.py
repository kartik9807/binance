from utils import get_response_llm, create_client
import json


def market_analysis_agent(messages):
    client = create_client()

    system_prompt = """
You are MarketAnalysisAgent, an AI specialized in cryptocurrency market analysis.

Your job:
Analyze the user's question and provide insights about market conditions.

You can discuss:
- price trends
- RSI
- MACD
- support and resistance
- momentum
- market sentiment

Output format (JSON only):

{
"chain_of_thought": "Explain briefly how you analyzed the market question.",
"analysis": "Write the market analysis here."
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
        output = {"analysis": "Unable to analyze the market at the moment."}

    return {
        "role": "assistant",
        "content": output["analysis"],
        "agent": "market_analysis_agent"
    }