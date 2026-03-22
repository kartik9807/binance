from utils import create_client, get_response_llm


def provide_details_agent(messages):

    client = create_client()

    system_prompt = """
You are MarketKnowledgeAgent, an AI assistant specialized in cryptocurrency trading.

Your job is to answer questions about:
- cryptocurrency markets
- trading strategies
- technical indicators (RSI, MACD, support/resistance)
- price trends
- trading terminology

Respond clearly and helpfully like a professional trading assistant.
"""

    input_messages = [{"role": "system", "content": system_prompt}] + messages[-3:]

    response = get_response_llm(client, input_messages)

    return pre_process(response)


def pre_process(response):
    return {
        "role": "assistant",
        "content": response,
        "agent": "market_knowledge_agent"
    }
