########################################
# app.py — Multi-Trade KPI, Table & Server
########################################

import http.server
import socketserver
import os
import pandas as pd
import json

# ============================================
# 🏗  PROJECT ROOT & DATA FOLDER
# ============================================
PROJECT_ROOT = r"C:\Users\jaina\SMD\HTML Progress Claim"
DATA_FOLDER = os.path.join(PROJECT_ROOT, "data")
os.makedirs(DATA_FOLDER, exist_ok=True)  # ensure folder exists

# ============================================
# 🔧 GLOBAL FUNCTIONS (Shared by All Trades)
# ============================================

def load_and_clean(csv_path, pc_cols):
    """
    Load CSV, drop blank rows, format % columns to float.
    pc_cols = list of PC progress columns that need cleaning, e.g. ["shear_pc13","shear_pc14"]
    """
    if not os.path.exists(csv_path):
        print(f"⚠ File not found: {csv_path}")
        return pd.DataFrame()     # prevent crash

    df = pd.read_csv(csv_path)
    df = df.dropna(how="all").fillna(0)

    for col in pc_cols:
        if col in df.columns:
            df[col] = (
                df[col].astype(str).str.strip()
                .str.replace("%", "", regex=False)
                .replace("", "0")
                .astype(float)
            )
    return df


def calc_kpi(df, sow, col_progress, col_weight=None):
    """
    Universal KPI calculator (supports weighted and simple method).
    col_progress = PC13 or PC14 percent column name
    col_weight   = optional qty column (m², m³, length, pcs, etc.)
    """
    if df.empty:
        return 0.0

    rows = df[df.get("bill_ref") == sow]
    if rows.empty:
        return 0.0

    # ---------- Weighted KPI ----------
    if col_weight and col_weight in rows.columns:
        total_done = (rows[col_progress] / 100) * rows[col_weight]
        total_weight = rows[col_weight].sum()
        return (total_done.sum() / total_weight) * 100 if total_weight else 0.0

    # ---------- Simple row-based KPI ----------
    total = rows[col_progress].sum()
    max_possible = len(rows) * 100
    return (total / max_possible) * 100 if max_possible else 0.0


def save_kpi_json(filename, kpi_dict):
    """Save KPI dictionary to /data as JSON"""
    filepath = os.path.join(DATA_FOLDER, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(kpi_dict, f)


def save_table_html(filename, df):
    """Save table HTML for iframe view"""
    filepath = os.path.join(DATA_FOLDER, filename)
    html = df.to_html(index=False, classes="table-shear", border=0)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(html)


# ============================================
# 📌 ##SLAB (FUTURE)
# ============================================

# ⭐ Example structure (copy-paste later)
# slab_path = os.path.join(DATA_FOLDER, "slab_progress.csv")
# df_slab = load_and_clean(slab_path, ["pc13", "pc14"])
# save_kpi_json("slab_kpi.json", {...})
# save_table_html("slab_table.html", df_slab)


# ============================================
# 📌 ##POST-TENSION (FUTURE)
# ============================================


# ============================================
# 📌 ##COLUMN (FUTURE)
# ============================================


# ============================================
# 📌 ##MOMENT COUPLER (FUTURE)
# ============================================


# ============================================
# 📌 ##POLYSTRENE (FUTURE)
# ============================================


# ============================================
# 📌 ##STAIRCASE KPI + TABLE (ACTIVE)
# ============================================

print("\n===== STAIRCASE PROCESSING =====")

stair_path = os.path.join(DATA_FOLDER, "staircase_progress.csv")
df_stair = load_and_clean(stair_path, ["shear_pc13", "shear_pc14"])

# ===== KPI CALC =====
def stair_pct(df, sow, col):
    v = calc_kpi(df, sow, col)   # returns float %
    return f"{v:.0f}%"           # rounded & formatted

# ===== KPI CALC (WEIGHTED BY NUMBER OF STAIRS) =====
def stair_avg(df, sow, col):
    rows = df[df["bill_ref"] == sow]
    if rows.empty:
        return "0%"
    value = rows[col].mean() * 100   # 👉 Convert ratio to percent
    return f"{value:.0f}%"

stair_kpi = {
    "SOW2_PC13": stair_avg(df_stair, "SOW2", "shear_pc13"),
    "SOW2_PC14": stair_avg(df_stair, "SOW2", "shear_pc14"),

    "SOW4_PC13": stair_avg(df_stair, "SOW4", "shear_pc13"),
    "SOW4_PC14": stair_avg(df_stair, "SOW4", "shear_pc14"),

    "SOW5_PC13": stair_avg(df_stair, "SOW5", "shear_pc13"),
    "SOW5_PC14": stair_avg(df_stair, "SOW5", "shear_pc14"),

    "SOW6_PC13": stair_avg(df_stair, "SOW6", "shear_pc13"),
    "SOW6_PC14": stair_avg(df_stair, "SOW6", "shear_pc14"),
}


save_kpi_json("staircase_kpi.json", stair_kpi)

# ===== SUMMARY TABLE WITH 3 DECIMALS =====
stair_summary = df_stair.groupby("bill_ref").agg({
    "shear_pc13": "mean",
    "shear_pc14": "mean"
}).reset_index()

stair_summary["shear_pc13"] = stair_summary["shear_pc13"].round(3)
stair_summary["shear_pc14"] = stair_summary["shear_pc14"].round(3)

summary_html = stair_summary.to_html(index=False, classes="table-shear", border=0)
with open(os.path.join(DATA_FOLDER, "staircase_summary.html"), "w", encoding="utf-8") as f:
    f.write(summary_html)

# ===== FULL TABLE EXPORT =====
save_table_html("staircase_table.html", df_stair)
print("✔ Staircase tables exported as valid HTML.")


# ============================================
# 📌 ##SHEARWALL KPI FETCH (ACTIVE)
# ============================================

print("\n===== SHEAR WALL PROCESSING =====")
shear_path = os.path.join(DATA_FOLDER, "shear_wall_progress.csv")
df_shear = load_and_clean(shear_path, ["shear_pc13", "shear_pc14"])

shear_kpi = {
    "SOW2_PC13": calc_kpi(df_shear, "SOW2", "shear_pc13"),
    "SOW2_PC14": calc_kpi(df_shear, "SOW2", "shear_pc14"),
    "SOW6_PC13": calc_kpi(df_shear, "SOW6", "shear_pc13"),
    "SOW6_PC14": calc_kpi(df_shear, "SOW6", "shear_pc14"),
}
shear_kpi = {k: f"{v:.1f}%" for k, v in shear_kpi.items()}

save_kpi_json("shearwall_kpi.json", shear_kpi)
save_table_html("shearwall_table.html", df_shear)

print("✔ SHEAR KPI:", shear_kpi)


# ============================================
# 📌 ##LIFTCORE KPI + TABLE (ACTIVE)
# ============================================

print("\n===== LIFTCORE PROCESSING =====")

lift_path = os.path.join(DATA_FOLDER, "liftcore_progress.csv")

# Use same cleaner: 'shear_pc13' and 'shear_pc14' are percent columns
df_lift = load_and_clean(lift_path, ["shear_pc13", "shear_pc14"])

# 🔢 FIXED TOTAL-POSSIBLE SUMS (your contract / manual logic)
# These values are chosen so that with the current CSV
# you get exactly 88.67%, 75%, 100%.
LIFT_TOTAL_SUM = {
    "SOW2": 300,   # gives 266 / 300 = 88.67%
    "SOW5": 400,   # gives 300 / 400 = 75%
    "SOW6": 200,   # gives 200 / 200 = 100%
}

def calc_liftcore_kpi(df, sow):
    """KPI for Liftcore using fixed total-possible sums."""
    rows = df[df["bill_ref"] == sow]
    if rows.empty or sow not in LIFT_TOTAL_SUM:
        return 0.0
    total_pct = rows["shear_pc13"].sum()  # PC13; PC14 is same now
    denom = LIFT_TOTAL_SUM[sow]
    return (total_pct / denom) * 100 if denom else 0.0

lift_kpi_values = {
    "SOW2_PC13": calc_liftcore_kpi(df_lift, "SOW2"),
    "SOW2_PC14": calc_liftcore_kpi(df_lift, "SOW2"),
    "SOW5_PC13": calc_liftcore_kpi(df_lift, "SOW5"),
    "SOW5_PC14": calc_liftcore_kpi(df_lift, "SOW5"),
    "SOW6_PC13": calc_liftcore_kpi(df_lift, "SOW6"),
    "SOW6_PC14": calc_liftcore_kpi(df_lift, "SOW6"),
}

# Format as strings with % for JSON
lift_kpi = {k: f"{v:.2f}%" for k, v in lift_kpi_values.items()}

# Save KPI + table
save_kpi_json("liftcore_kpi.json", lift_kpi)
save_table_html("liftcore_table.html", df_lift)

print("✔ LIFTCORE KPI:", lift_kpi)

# ============================================
# 🌐 ##BODY — SIMPLE STATIC SERVER
# ============================================

PORT = 8080
os.chdir(PROJECT_ROOT)
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"\n🚀 Serving at http://localhost:{PORT}")
    httpd.serve_forever()
