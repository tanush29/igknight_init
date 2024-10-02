import spacy
from spacy.lang.en.stop_words import STOP_WORDS

nlp = spacy.load("en_core_web_sm")

def extract_keywords(text):
    """
    Extracts and prioritizes meaningful keywords from the input text using NLP.
    Removes stopwords and ranks keywords by length.
    """
    doc = nlp(text)
    keywords = set()

    # Extract noun chunks (longer phrases)
    for chunk in doc.noun_chunks:
        keywords.add(chunk.text.lower().strip())

    # Extract individual nouns and proper nouns
    for token in doc:
        if token.pos_ in ['NOUN', 'PROPN'] and token.text.lower() not in STOP_WORDS and len(token.text) > 2:
            keywords.add(token.text.lower().strip())

    # Prioritize keywords by length (longer phrases first)
    sorted_keywords = sorted(keywords, key=len, reverse=True)

    # Remove duplicates and return the top results
    return list(dict.fromkeys(sorted_keywords))
