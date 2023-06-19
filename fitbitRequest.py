import logging
import requests

access_token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1FYOVEiLCJzdWIiOiJCTEJZOTIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyYWN0IiwiZXhwIjoxNjg4NzQwNDI3LCJpYXQiOjE2ODYxNDg0Mjd9.tYd10_-F21AYu5pyziCR2GEBCUknqhppVb57I0mn6_w"

header = {'Authorization': 'Bearer {}'.format(access_token)}
response = requests.get("https://api.fitbit.com/1/user/BLBY92/activities/steps/date/2023-05-31/1d/5min.json", headers=header).json()

# Configure logging
logging.basicConfig(
    filename='log_file.log',
    level=logging.DEBUG,
    filemode = 'w',
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Create a logger
logger = logging.getLogger()

# Log messages
logger.info(response)