from pytrends.request import TrendReq

def get_trend_data(keywords):
    """
    Fetch Google Trends data for the provided keywords.
    """
    # Clean the keywords list: Remove short/invalid keywords and limit to 5
    keywords = [kw for kw in keywords if len(kw) > 2 and kw.strip()]
    
    # If the list has more than 5 keywords, prioritize longer and more specific ones
    if len(keywords) > 5:
        keywords = keywords[:5]  # Pick the top 5 after sorting by length in extract_keywords()

    if not keywords:
        raise ValueError("No valid keywords provided for Google Trends")

    pytrends = TrendReq(hl='en-US', tz=360)

    try:
        # Pass the cleaned keywords to Google Trends
        print(f"Fetching trends for keywords: {keywords}")  # Debugging line
        pytrends.build_payload(keywords, timeframe='today 12-m')
        data = pytrends.interest_over_time()

        trends = {}
        if not data.empty:
            trends = {kw: data[kw].mean() for kw in keywords}

        return trends

    except Exception as e:
        print(f"Error fetching trends: {e}")
        raise
