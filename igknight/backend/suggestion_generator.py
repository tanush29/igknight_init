from langchain_openai import OpenAI  # Updated import
from langchain.prompts import PromptTemplate
from langchain.schema.runnable import RunnableSequence  # RunnableSequence import

def generate_suggestions(idea, trends_analysis):
    """
    Generate suggestions for the user's startup idea based on trend data.
    """
    # Initialize GPT using the new OpenAI class
    llm = OpenAI(api_key='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', temperature=0.7)

    # Prepare the prompt template
    prompt = PromptTemplate(
        input_variables=['idea', 'trends'],
        template="""
Given the startup idea: "{idea}"

And the following trend analysis data: {trends}

Provide two suggestions to improve or pivot the idea, considering the current market trends.
"""
    )

    # Create a chain using the pipe (|) operator (this replaces the list structure)
    chain = prompt | llm

    # Use the new `invoke` method (replaces `run`)
    response = chain.invoke({'idea': idea, 'trends': trends_analysis})

    # Split the response into suggestions
    suggestions = response.strip().split('\n')
    return suggestions
