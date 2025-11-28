/*****************************************************
 * 🖨 A3 PRINT BUILDER — PC13 vs PC14 (33 fixed pages)
 * - Uses explicit mapping, independent of dropdowns
 * - Called from script_ui.js when user clicks Print
 *****************************************************/

/* ---------- Small HTML helpers ---------- */

function printHeader(title) {
    return `
        <div class="print-header">
            <img src="png/logo_telford.png" class="print-logo" alt="Logo">
            <h1 class="print-title">${title}</h1>
        </div>
    `;
}

// Two images side-by-side (PC13 vs PC14 or T3 vs T4)
function twoImagePage(title, leftSrc, rightSrc, leftLabel, rightLabel) {
    return `
    <div class="print-page">
        ${printHeader(title)}
        <div class="print-row">
            <figure class="print-fig">
                <figcaption>${leftLabel}</figcaption>
                <img src="png/${leftSrc}" class="print-img" alt="${leftLabel}">
            </figure>
            <figure class="print-fig">
                <figcaption>${rightLabel}</figcaption>
                <img src="png/${rightSrc}" class="print-img" alt="${rightLabel}">
            </figure>
        </div>
    </div>`;
}

// Single big image page
function singleImagePage(title, src, label) {
    return `
    <div class="print-page">
        ${printHeader(title)}
        <figure class="print-fig">
            <figcaption>${label}</figcaption>
            <img src="png/${src}" class="print-img-single" alt="${label}">
        </figure>
    </div>`;
}

// Table-only page, using iframe to external HTML
function tableIframePage(title, srcPath) {
    return `
    <div class="print-page">
        ${printHeader(title)}
        <iframe src="${srcPath}" class="print-table-frame"></iframe>
    </div>`;
}

// KPI + table page (KPI HTML comes from existing DOM)
function kpiTablePage(title, kpiHTML, tableSrc) {
    return `
    <div class="print-page">
        ${printHeader(title)}
        <div class="print-kpi-row">
            ${kpiHTML || ""}
        </div>
        <iframe src="${tableSrc}" class="print-table-frame"></iframe>
    </div>`;
}

// Generic "embed existing HTML" as table page (PT / Column / Parapet summaries)
function embedHtmlTablePage(title, innerHTML) {
    return `
    <div class="print-page">
        ${printHeader(title)}
        <div class="print-table-wrapper">
            ${innerHTML || "<p>No data.</p>"}
        </div>
    </div>`;
}


/* ---------- MAIN: BUILD ALL 33 PAGES ---------- */

function buildAllPrint() {

    // Ensure Staircase KPI is populated even if user never clicked tab
    if (typeof loadStaircaseKPI === "function") {
        try { loadStaircaseKPI(); } catch (e) { console.log("Staircase KPI load error:", e); }
    }

    // Remove old container if exists
    const old = document.getElementById("print_container");
    if (old) old.remove();

    // Create fresh container
    const container = document.createElement("div");
    container.id = "print_container";

    let html = "";

    /* =========================
       PAGES 1–6 : SLAB (PNG)
       ========================= */

    html += twoImagePage("SLAB – T4 L1 (PC13 vs PC14)",
        "Slab_T4_L1_PC13.png", "Slab_T4_L1_PC14.png", "PC13", "PC14");

    html += twoImagePage("SLAB – T4 L1M (PC13 vs PC14)",
        "Slab_T4_L1M_PC13.png", "Slab_T4_L1M_PC14.png", "PC13", "PC14");

    html += twoImagePage("SLAB – T4 L2 (PC13 vs PC14)",
        "Slab_T4_L2_PC13.png", "Slab_T4_L2_PC14.png", "PC13", "PC14");

    html += twoImagePage("SLAB – T4 L3 (PC13 vs PC14)",
        "Slab_T4_L3_PC13.png", "Slab_T4_L3_PC14.png", "PC13", "PC14");

    html += twoImagePage("SLAB – T3 L3 (PC13 vs PC14)",
        "Slab_T3_L3_PC13.png", "Slab_T3_L3_PC14.png", "PC13", "PC14");

    html += twoImagePage("SLAB – T3 L4 (PC13 vs PC14)",
        "Slab_T3_L4_PC13.png", "Slab_T3_L4_PC14.png", "PC13", "PC14");

    /* =========================
       PAGES 7–8 : PT SUMMARY TABLES
       (use existing HTML built in #pt_summary_1 and #pt_summary_2)
       ========================= */

    const pt1HTML = document.getElementById("pt_summary_1")?.innerHTML || "";
    const pt2HTML = document.getElementById("pt_summary_2")?.innerHTML || "";

    html += embedHtmlTablePage("POST-TENSION – Summary Table 1", pt1HTML); // Page 7
    html += embedHtmlTablePage("POST-TENSION – Summary Table 2", pt2HTML); // Page 8

    /* =========================
       PAGES 9–13 : PT DRAWINGS
       ========================= */

    html += twoImagePage("POST-TENSION – T4 L1M (PC13 vs PC14)",
        "PT_T4_L1M_PC13.png", "PT_T4_L1M_PC14.png", "PC13", "PC14");   // Page 9

    html += twoImagePage("POST-TENSION – T4 L2 (PC13 vs PC14)",
        "PT_T4_L2_PC13.png", "PT_T4_L2_PC14.png", "PC13", "PC14");    // Page 10

    html += twoImagePage("POST-TENSION – T4 L3 (PC13 vs PC14)",
        "PT_T4_L3_PC13.png", "PT_T4_L3_PC14.png", "PC13", "PC14");    // Page 11

    html += twoImagePage("POST-TENSION – T3 L3 (PC13 vs PC14)",
        "PT_T3_L3_PC13.png", "PT_T3_L3_PC14.png", "PC13", "PC14");    // Page 12

    html += twoImagePage("POST-TENSION – T3 L4 (PC13 vs PC14)",
        "PT_T3_L4_PC13.png", "PT_T3_L4_PC14.png", "PC13", "PC14");    // Page 13

    /* =========================
       PAGE 14 : COLUMN SUMMARY TABLE
       (#column_summary_container already built from CSV)
       ========================= */

    const columnSummaryHTML = document.getElementById("column_summary_container")?.innerHTML || "";
    html += embedHtmlTablePage("COLUMN – Progress Summary", columnSummaryHTML);

    /* =========================
       PAGES 15–19 : COLUMN DRAWINGS
       ========================= */

    html += twoImagePage("COLUMN – T4 L1 (PC13 vs PC14)",
        "Column_T4_L1_PC13.png", "Column_T4_L1_PC14.png", "PC13", "PC14");   // 15

    html += twoImagePage("COLUMN – T4 L1M (PC13 vs PC14)",
        "Column_T4_L1M_PC13.png", "Column_T4_L1M_PC14.png", "PC13", "PC14"); // 16

    html += twoImagePage("COLUMN – T4 L2 (PC13 vs PC14)",
        "Column_T4_L2_PC13.png", "Column_T4_L2_PC14.png", "PC13", "PC14");   // 17

    html += twoImagePage("COLUMN – T3 L1 (PC13 vs PC14)",
        "Column_T3_L1_PC13.png", "Column_T3_L1_PC14.png", "PC13", "PC14");   // 18

    html += twoImagePage("COLUMN – T3 L3 (PC13 vs PC14)",
        "Column_T3_L3_PC13.png", "Column_T3_L3_PC14.png", "PC13", "PC14");   // 19

    /* =========================
       PAGES 20–21 : MC
       ========================= */

    html += twoImagePage("MOMENT COUPLER – T4 L3 (PC13 vs PC14)",
        "MC_T4_L3_PC13.png", "MC_T4_L3_PC14.png", "PC13", "PC14");     // 20

    html += twoImagePage("MOMENT COUPLER – T3 L4 (PC13 vs PC14)",
        "MC_T3_L4_PC13.png", "MC_T3_L4_PC14.png", "PC13", "PC14");     // 21

    /* =========================
       PAGES 22–23 : POLY
       ========================= */

    html += twoImagePage("POLYESTERENE – T4 L3 (PC13 vs PC14)",
        "Poly_T4_L3_PC13.png", "Poly_T4_L3_PC14.png", "PC13", "PC14"); // 22

    html += twoImagePage("POLYESTERENE – T3 L4 (PC13 vs PC14)",
        "Poly_T3_L4_PC13.png", "Poly_T3_L4_PC14.png", "PC13", "PC14"); // 23

    /* =========================
       PAGE 24 : PARAPET SUMMARY TABLE
       (from #parapet_summary_container)
       ========================= */

    const parapetSummaryHTML = document.getElementById("parapet_summary_container")?.innerHTML || "";
    html += embedHtmlTablePage("PARAPET – Progress Summary", parapetSummaryHTML);

    /* =========================
       PAGES 25–26 : PARAPET DRAWINGS
       ========================= */

    html += twoImagePage("PARAPET – T3 L3 (PC13 vs PC14)",
        "Parapet_T3_L3_PC13.png", "Parapet_T3_L3_PC14.png", "PC13", "PC14"); // 25

    html += twoImagePage("PARAPET – T3 L4 (PC13 vs PC14)",
        "Parapet_T3_L4_PC13.png", "Parapet_T3_L4_PC14.png", "PC13", "PC14"); // 26

    /* =========================
       PAGES 27–29 : STAIRCASE
       27 = KPI + Table 1
       28 = Table 2
       29 = Overall Layout (T3 + T4 images)
       ========================= */

    const stairKPIHTML = document.getElementById("stair_kpi_cards")?.innerHTML || "";

    // Page 27: KPI + Summary table
    html += kpiTablePage("STAIRCASE – KPI + Summary Table",
        stairKPIHTML,
        "data/staircase_summary.html");

    // Page 28: Table 2 only (entry list)
    html += tableIframePage("STAIRCASE – Entry List (Table 2)",
        "data/staircase_table.html");

    // Page 29: Overall layout – T3 vs T4
    html += twoImagePage("STAIRCASE – Overall Layout",
        "Staircase_T3.png", "Staircase_T4.png", "Tower 3", "Tower 4");

    /* =========================
       PAGES 30–31 : LIFTCORE
       30 = KPI + Table
       31 = Overall layout image
       ========================= */

    const liftKPIHTML = document.getElementById("liftcore_kpis")?.innerHTML || "";

    // Page 30: KPI + table
    html += kpiTablePage("LIFTCORE – KPI + Claim Table",
        liftKPIHTML,
        "data/liftcore_table.html");

    // Page 31: Overall layout (single image)
    html += singleImagePage("LIFTCORE – Overall Layout",
        "Liftcore_T4.png",
        "Tower 4");

    /* =========================
       PAGES 32–33 : SHEARWALL
       32 = KPI + Table
       33 = Overall layout image
       ========================= */

    const shearKpiRow = document.querySelector("#shear_tab .kpi-row");
    const shearKPIHTML = shearKpiRow ? shearKpiRow.innerHTML : "";

    // Page 32: KPI + table
    html += kpiTablePage("SHEAR WALL – KPI + Claim Table",
        shearKPIHTML,
        "data/shearwall_table.html");

    // Page 33: Overall layout
    html += singleImagePage("SHEAR WALL – Overall Layout",
        "Shearwall_T4.png",
        "Tower 4");

    // Attach to container and body
    container.innerHTML = html;
    document.body.appendChild(container);
}
