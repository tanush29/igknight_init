from flask import Flask, request, jsonify
from keyword_extractor import extract_keywords
from trend_analyzer import get_trend_data
from suggestion_generator import generate_suggestions
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/generate', methods=['POST'])
def generate():
    """
    Main endpoint to generate suggestions for the user's startup idea.
    """
    data = request.get_json()
    idea = data.get('idea', '')

    # Step 1: Extract Keywords from User Input
    keywords = extract_keywords(idea)
    print(f"Extracted Keywords: {keywords}")

    # Step 2: Fetch Google Trends Data
    trends_analysis = get_trend_data(keywords)
    print(f"Trends Analysis: {trends_analysis}")

    # Step 3: Generate Suggestions using LangChain
    suggestions = generate_suggestions(idea, trends_analysis)

    return jsonify({'suggestions': suggestions})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
