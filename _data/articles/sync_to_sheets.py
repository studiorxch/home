import gspread
from google.oauth2.service_account import Credentials
import pandas as pd

# CONFIG
SHEET_NAME = "lofi_articles_sync"
CSV_FILE = "/Users/studio/Sites/studiorich/home/_data/articles/articles.csv"
SERVICE_ACCOUNT_FILE = "blog-automator-468810-e9ac2ca5c307.json"

# Authenticate
scope = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"]
creds = Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=scope)
client = gspread.authorize(creds)


# Load CSV
df = pd.read_csv(CSV_FILE)
if "approved" not in df.columns:
    df["approved"] = ""

# Sanitize
df = df.replace({float('inf'): '', float('-inf'): '', pd.NA: '', None: ''}).fillna('')

# Sync
sheet = client.open(SHEET_NAME).sheet1
sheet.clear()
sheet.update([df.columns.values.tolist()] + df.values.tolist())


print(f"✅ Synced {len(df)} articles to Google Sheet: {SHEET_NAME}")
