from agents import guard_other_agents, classify_response_agent, provide_details_agent

def main():
    while True:
        messages = []
        prompt = input("user:")

        messages.append({"role":"user", "content":prompt})

        guard_agent_output = guard_other_agents(messages)

        if guard_agent_output['decision'] == "not allowed":
            messages.append(guard_agent_output)
            continue

        classification_agent_output = classify_response_agent(messages)
        
        details_agent_output = provide_details_agent(messages)

        print(details_agent_output)

if __name__ == '__main__':
    main()