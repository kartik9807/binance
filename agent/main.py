from fastapi import FastAPI
from typing import List, Dict

from agents import (
    guard_other_agents,
    classify_response_agent,
    market_analysis_agent,
    trade_signal_agent,
    risk_management_agent
)

app = FastAPI()


@app.post("/chat")
async def chat_endpoint(messages: List[Dict]):

    print("Incoming messages:", messages)

    # 1️⃣ Guard Agent
    guard_output = guard_other_agents(messages)

    if guard_output["decision"] == "not allowed":
        messages.append(guard_output)
        return {"messages": messages}

    messages.append(guard_output)

    # 2️⃣ Classification Agent
    classification_output = classify_response_agent(messages)

    messages.append(classification_output)

    decision = classification_output["decision"]

    # 3️⃣ Route to correct agent
    if decision == "market_analysis_agent":
        agent_output = market_analysis_agent(messages)

    elif decision == "trade_signal_agent":
        agent_output = trade_signal_agent(messages)

    elif decision == "risk_management_agent":
        agent_output = risk_management_agent(messages)

    else:
        agent_output = {
            "role": "assistant",
            "content": "I could not determine the correct trading agent.",
            "agent": "system"
        }

    messages.append(agent_output)

    return {
        "messages": messages
    }