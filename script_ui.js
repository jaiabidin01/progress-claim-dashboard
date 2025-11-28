/******************************************************
 * 📌 PC13 vs PC14 Web Visualization — JAVASCRIPT FILE
 *   Full Master Version (Slab → PT → Column → MC →
 *   Poly → Parapet → Staircase → Liftcore → Shearwall)
 ******************************************************/

/******************************************************
 * 🗂 SECTION A — CONFIGURE PNG FILE SOURCES (REAL MAP)
 ******************************************************/

// ---------- SLAB ----------
const SLAB_IMAGES = {
    "T4": {
        "L1":  { pc13: "Slab_T4_L1_PC13.png", pc14: "Slab_T4_L1_PC14.png" },
        "L1M": { pc13: "Slab_T4_L1M_PC13.png", pc14: "Slab_T4_L1M_PC14.png" },
        "L2":  { pc13: "Slab_T4_L2_PC13.png", pc14: "Slab_T4_L2_PC14.png" },
        "L3":  { pc13: "Slab_T4_L3_PC13.png", pc14: "Slab_T4_L3_PC14.png" }
    },
    "T3": {
        "L3": { pc13: "Slab_T3_L3_PC13.png", pc14: "Slab_T3_L3_PC14.png" },
        "L4": { pc13: "Slab_T3_L4_PC13.png", pc14: "Slab_T3_L4_PC14.png" }
    }
};

// ---------- PT ----------
const PT_IMAGES = {
    "T4": {
        "L1M": { pc13: "PT_T4_L1M_PC13.png", pc14: "PT_T4_L1M_PC14.png" },
        "L2":  { pc13: "PT_T4_L2_PC13.png",  pc14: "PT_T4_L2_PC14.png"  },
        "L3":  { pc13: "PT_T4_L3_PC13.png",  pc14: "PT_T4_L3_PC14.png"  }
    },
    "T3": {
        "L3":  { pc13: "PT_T3_L3_PC13.png",  pc14: "PT_T3_L3_PC14.png"  },
        "L4":  { pc13: "PT_T3_L4_PC13.png",  pc14: "PT_T3_L4_PC14.png"  }
    }
};

// ---------- COLUMN ----------
const COLUMN_IMAGES = {
    "T4": {
        "L1":  { pc13: "Column_T4_L1_PC13.png", pc14: "Column_T4_L1_PC14.png" },
        "L1M": { pc13: "Column_T4_L1M_PC13.png", pc14: "Column_T4_L1M_PC14.png" },
        "L2":  { pc13: "Column_T4_L2_PC13.png", pc14: "Column_T4_L2_PC14.png" }
    },
    "T3": {
        "L1":  { pc13: "Column_T3_L1_PC13.png", pc14: "Column_T3_L1_PC14.png" },
        "L3":  { pc13: "Column_T3_L3_PC13.png", pc14: "Column_T3_L3_PC14.png" }
    }
};

// ---------- MOMENT COUPLER ----------
const MC_IMAGES = {
    "T4": { "L3": { pc13: "MC_T4_L3_PC13.png", pc14: "MC_T4_L3_PC14.png" }},
    "T3": { "L4": { pc13: "MC_T3_L4_PC13.png", pc14: "MC_T3_L4_PC14.png" }}
};

// ---------- POLYSTYRENE ----------
const POLY_IMAGES = {
    "T4": { "L3": { pc13: "Poly_T4_L3_PC13.png", pc14: "Poly_T4_L3_PC14.png" }},
    "T3": { "L4": { pc13: "Poly_T3_L4_PC13.png", pc14: "Poly_T3_L4_PC14.png" }}
};

// ---------- PARAPET ----------
const PARAPET_IMAGES = {
    "T3": {
        "L3": { pc13: "Parapet_T3_L3_PC13.png", pc14: "Parapet_T3_L3_PC14.png" },
        "L4": { pc13: "Parapet_T3_L4_PC13.png", pc14: "Parapet_T3_L4_PC14.png" }
    }
};

// ---------- SHEARWALL (using only Shearwall_T4.png for all) ----------
const SHEARWALL_IMAGES = {
    "T4": {
        "L3": { pc13: "Shearwall_T4.png", pc14: "Shearwall_T4.png" },
        "L4": { pc13: "Shearwall_T4.png", pc14: "Shearwall_T4.png" }
    }
};






/******************************************************
 * 🖱 SECTION B — TAB SWITCHING (NAVIGATION)
 ******************************************************/
document.querySelectorAll(".nav-item").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach(sec => sec.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.target).classList.add("active");
    });
});


/******************************************************
 * 🛠 SECTION C — HELPER FUNCTION
 ******************************************************/
function setImage(img, file, errorDiv, label) {
    if (!file) {
        img.src = "";
        img.style.visibility = "hidden";
        if (errorDiv && label) errorDiv.textContent = `No ${label} image available.`;
        return;
    }
    img.src = "png/" + file;
    img.style.visibility = "visible";
}



/******************************************************
 * 🧱 SECTION D — SLAB
 ******************************************************/
function initSLAB() {
    const towerSel = document.getElementById("slab_tower_select");
    const levelSel = document.getElementById("slab_level_select");
    const img13 = document.getElementById("slab_pc13_img");
    const img14 = document.getElementById("slab_pc14_img");
    const notice = document.getElementById("slab_notice");

    Object.keys(SLAB_IMAGES).forEach(t => towerSel.add(new Option(t, t)));

    function refreshLevels() {
        levelSel.innerHTML = "";
        Object.keys(SLAB_IMAGES[towerSel.value]).forEach(L => levelSel.add(new Option(L, L)));
        updateSLAB();
    }

    function updateSLAB() {
        const info = SLAB_IMAGES[towerSel.value][levelSel.value];
        notice.textContent = "";
        setImage(img13, info.pc13, notice, "PC13");
        setImage(img14, info.pc14, notice, "PC14");
    }

    towerSel.addEventListener("change", refreshLevels);
    levelSel.addEventListener("change", updateSLAB);

    refreshLevels();
}

/******************************************************
 * 🔧 SECTION E — POST-TENSION
 ******************************************************/
function initPT() {
    const towerSel = document.getElementById("pt_tower_select");
    const levelSel = document.getElementById("pt_level_select");
    const img13 = document.getElementById("pt_pc13_img");
    const img14 = document.getElementById("pt_pc14_img");
    const notice = document.getElementById("pt_notice");

    Object.keys(PT_IMAGES).forEach(t => towerSel.add(new Option(t, t)));

    function refreshLevels() {
        levelSel.innerHTML = "";
        const tower = towerSel.value;
        if (!tower) return;
        const levels = Object.keys(PT_IMAGES[tower]);
        levels.forEach(L => levelSel.add(new Option(L, L)));
        levelSel.value = levels[0];
        updatePT();
    }

    function updatePT() {
        const tower = towerSel.value;
        const level = levelSel.value;
        if (!tower || !level) return;

        const info = PT_IMAGES[tower][level];
        notice.textContent = "";
        setImage(img13, info.pc13);
        setImage(img14, info.pc14);
    }

    towerSel.addEventListener("change", refreshLevels);
    levelSel.addEventListener("change", updatePT);

    refreshLevels();
}

/******************************************************
 * 🏛 SECTION F — COLUMN
 ******************************************************/
function initCOLUMN() {
    const towerSel = document.getElementById("column_tower_select");
    const levelSel = document.getElementById("column_level_select");
    const img13 = document.getElementById("column_pc13_img");
    const img14 = document.getElementById("column_pc14_img");

    Object.keys(COLUMN_IMAGES).forEach(t => towerSel.add(new Option(t, t)));

    function refreshLevels() {
        levelSel.innerHTML = "";
        const tower = towerSel.value;
        if (!tower) return;

        Object.keys(COLUMN_IMAGES[tower]).forEach(L =>
            levelSel.add(new Option(L, L))
        );
        updateCOLUMN();
    }

    function updateCOLUMN() {
        const tower = towerSel.value;
        const level = levelSel.value;
        if (!tower || !level) return;

        const info = COLUMN_IMAGES[tower][level];
        setImage(img13, info.pc13);
        setImage(img14, info.pc14);
    }

    towerSel.addEventListener("change", refreshLevels);
    levelSel.addEventListener("change", updateCOLUMN);

    refreshLevels();
}

/*** COLUMN SUMMARY TABLE (SCREEN) ***/
function loadColumnSummaryScreen() {
    fetch("data/column_summary.csv")
        .then(res => res.text())
        .then(csv => {
            document.getElementById("column_summary_container").innerHTML =
                csvToHtml(csv);
        });
}


/******************************************************
 * 🧲 SECTION G — MOMENT COUPLER
 ******************************************************/
function initMC() {
    const towerSel = document.getElementById("mc_tower_select");
    const img13 = document.getElementById("mc_pc13_img");
    const img14 = document.getElementById("mc_pc14_img");

    towerSel.innerHTML = "";
    Object.keys(MC_IMAGES).forEach(t => towerSel.add(new Option(t, t)));

    function updateMC() {
        const tower = towerSel.value;
        const level = Object.keys(MC_IMAGES[tower])[0];
        const info = MC_IMAGES[tower][level];
        setImage(img13, info.pc13);
        setImage(img14, info.pc14);
    }

    towerSel.addEventListener("change", updateMC);
}



/******************************************************
 * 🧊 SECTION H — POLYSTYRENE
 ******************************************************/
function initPOLY() {
    const towerSel = document.getElementById("poly_tower_select");
    const levelSel = document.getElementById("poly_level_select");
    const img13 = document.getElementById("poly_pc13_img");
    const img14 = document.getElementById("poly_pc14_img");

    towerSel.innerHTML = "";
    Object.keys(POLY_IMAGES).forEach(t => towerSel.add(new Option(t, t)));

    function refreshLevels() {
        levelSel.innerHTML = "";
        Object.keys(POLY_IMAGES[towerSel.value]).forEach(l => levelSel.add(new Option(l, l)));
        updatePOLY();
    }

    function updatePOLY() {
        const info = POLY_IMAGES[towerSel.value][levelSel.value];
        setImage(img13, info.pc13);
        setImage(img14, info.pc14);
    }

    towerSel.addEventListener("change", refreshLevels);
    levelSel.addEventListener("change", updatePOLY);
}
/******************************************************
 * 🟥 SECTION I — PARAPET
 ******************************************************/
function initPARAPET() {
    const towerSel = document.getElementById("parapet_tower_select");
    const levelSel = document.getElementById("parapet_level_select");
    const img13 = document.getElementById("parapet_pc13_img");
    const img14 = document.getElementById("parapet_pc14_img");

    Object.keys(PARAPET_IMAGES).forEach(t =>
        towerSel.add(new Option(t, t))
    );

    function refreshLevels() {
        const tower = towerSel.value;
        levelSel.innerHTML = "";
        if (!tower) return;

        Object.keys(PARAPET_IMAGES[tower]).forEach(L =>
            levelSel.add(new Option(L, L))
        );
        levelSel.value = Object.keys(PARAPET_IMAGES[tower])[0];
        updatePARAPET();
    }

    function updatePARAPET() {
        const tower = towerSel.value;
        const level = levelSel.value;
        if (!tower || !level) return;

        const info = PARAPET_IMAGES[tower][level];
        setImage(img13, info.pc13);
        setImage(img14, info.pc14);
    }

    towerSel.addEventListener("change", refreshLevels);
    levelSel.addEventListener("change", updatePARAPET);

    refreshLevels();
}

/*** PARAPET SUMMARY TABLE (SCREEN) ***/
function loadParapetSummaryScreen() {
    fetch("data/parapet_progress_level.csv")
        .then(res => res.text())
        .then(csv => {
            document.getElementById("parapet_summary_container").innerHTML =
                csvToHtml(csv);
        });
}

/******************************************************
 * 🏢 SECTION J — LIFTCORE (KPI + PRINT TABLE)
 ******************************************************/
fetch("data/liftcore_kpi.json")
    .then(res => res.json())
    .then(kpi => {
        document.getElementById("liftcore_kpis").innerHTML = `
            <div class="kpi-box kpi-blue">
                <h3>SOW 2</h3>
                <strong>PC13: ${kpi.SOW2_PC13}</strong><br>
                <strong>PC14: ${kpi.SOW2_PC14}</strong>
            </div>
            <div class="kpi-box kpi-green">
                <h3>SOW 5</h3>
                <strong>PC13: ${kpi.SOW5_PC13}</strong><br>
                <strong>PC14: ${kpi.SOW5_PC14}</strong>
            </div>
            <div class="kpi-box kpi-red">
                <h3>SOW 6</h3>
                <strong>PC13: ${kpi.SOW6_PC13}</strong><br>
                <strong>PC14: ${kpi.SOW6_PC14}</strong>
            </div>
        `;
    });

function loadLiftcoreTableForPrint() {
    fetch("data/liftcore_table.html")
        .then(res => res.text())
        .then(html => document.getElementById("print_liftcore_table").innerHTML = html);
}

/******************************************************
 * 🧱 SECTION I — SHEARWALL (FINAL WORKING VERSION)
 ******************************************************/
function initSHEARWALL() {
    const towerSel = document.getElementById("shear_tower_select");
    const levelSel = document.getElementById("shear_level_select");
    const img13 = document.getElementById("shear_pc13_img");
    const img14 = document.getElementById("shear_pc14_img");

    // Populate tower dropdown
    Object.keys(SHEARWALL_IMAGES).forEach(t =>
        towerSel.add(new Option(t, t))
    );

    function refreshLevels() {
        const tower = towerSel.value;
        levelSel.innerHTML = "";

        if (!tower) return;

        Object.keys(SHEARWALL_IMAGES[tower]).forEach(L =>
            levelSel.add(new Option(L, L))
        );

        levelSel.value = Object.keys(SHEARWALL_IMAGES[tower])[0];
        updateShearwallImages();
    }

    function updateShearwallImages() {
        const tower = towerSel.value;
        const level = levelSel.value;

        if (!tower || !level) return;

        const info = SHEARWALL_IMAGES[tower][level];
        setImage(img13, info.pc13);
        setImage(img14, info.pc14);
    }

    towerSel.addEventListener("change", refreshLevels);
    levelSel.addEventListener("change", updateShearwallImages);

    refreshLevels();

    // Load FULL summary table once
    loadShearwallSummaryTable();
}


/******************************************************
 * 📋 SCREEN SUMMARY TABLE (FULL TABLE)
 ******************************************************/
function loadShearwallSummaryTable() {
    const container = document.getElementById("shearwall_summary_container");

    fetch("data/shearwall_table.html")
        .then(res => res.text())
        .then(html => container.innerHTML = html)
        .catch(err => {
            container.innerHTML = `<p style="color:red;">❌ Cannot load shear wall summary table.</p>`;
            console.error(err);
        });
}


/******************************************************
 * 🖨 PRINT VERSION (exact same HTML table)
 ******************************************************/
function loadShearwallTableForPrint() {
    const target = document.getElementById("print_shearwall_table");

    fetch("data/shearwall_table.html")
        .then(res => res.text())
        .then(html => target.innerHTML = html)
        .catch(err => {
            target.innerHTML = `<p style="color:red;">❌ Print summary table missing.</p>`;
            console.error(err);
        });
}


/******************************************************
 * 📊 SHEAR WALL KPI (SCREEN)
 ******************************************************/
function loadShearwallKPI() {
    fetch("data/shearwall_kpi.json")
        .then(res => res.json())
        .then(k => {

            const html = `
                <div class="kpi-box kpi-blue">
                    <h3>SOW 2</h3>
                    <p>PC13: <strong>${k.SOW2_PC13}</strong></p>
                    <p>PC14: <strong>${k.SOW2_PC14}</strong></p>
                </div>

                <div class="kpi-box kpi-green">
                    <h3>SOW 6</h3>
                    <p>PC13: <strong>${k.SOW6_PC13}</strong></p>
                    <p>PC14: <strong>${k.SOW6_PC14}</strong></p>
                </div>
            `;

            const box = document.getElementById("shearwall_kpi_cards");
            if (box) box.innerHTML = html;
        })
        .catch(err => console.error("Shearwall KPI load error:", err));
}

// Load KPI when SHEARWALL TAB is clicked
document.getElementById("tab-shear")
    .addEventListener("click", loadShearwallKPI);


/******************************************************
 * 🪜 SECTION K — STAIRCASE (KPI + PRINT TABLE)
 ******************************************************/
function loadStaircaseKPI() {
    fetch("data/staircase_kpi.json")
        .then(res => res.json())
        .then(k => {
            document.getElementById("stair_kpi_cards").innerHTML = `
                <div class="kpi-box kpi-blue"><h3>SOW 2</h3>
                    <p>PC13: <strong>${k.SOW2_PC13}</strong></p>
                    <p>PC14: <strong>${k.SOW2_PC14}</strong></p></div>

                <div class="kpi-box kpi-yellow"><h3>SOW 4</h3>
                    <p>PC13: <strong>${k.SOW4_PC13}</strong></p>
                    <p>PC14: <strong>${k.SOW4_PC14}</strong></p></div>

                <div class="kpi-box kpi-green"><h3>SOW 5</h3>
                    <p>PC13: <strong>${k.SOW5_PC13}</strong></p>
                    <p>PC14: <strong>${k.SOW5_PC14}</strong></p></div>

                <div class="kpi-box kpi-red"><h3>SOW 6</h3>
                    <p>PC13: <strong>${k.SOW6_PC13}</strong></p>
                    <p>PC14: <strong>${k.SOW6_PC14}</strong></p></div>
            `;
        });
}

document.getElementById("tab-stair").addEventListener("click", loadStaircaseKPI);

function loadStaircaseTablesForPrint() {
    fetch("data/staircase_summary.html")
        .then(res => res.text())
        .then(html => document.getElementById("print_stair_summary").innerHTML = html);

    fetch("data/staircase_table.html")
        .then(res => res.text())
        .then(html => document.getElementById("print_stair_table").innerHTML = html);
}


/******************************************************
 * 🧮 SUMMARY TABLE LOADERS (SCREEN)
 ******************************************************/

function loadPTtablesScreen() {
    // PT Table 1
    fetch("data/pt_summary_table1.csv")
        .then(res => res.text())
        .then(csv => {
            document.getElementById("pt_summary_1").innerHTML = csvToHtml(csv);
        });

    // PT Table 2
    fetch("data/pt_summary_table2.csv")
        .then(res => res.text())
        .then(csv => {
            document.getElementById("pt_summary_2").innerHTML = csvToHtml(csv);
        });
}

function loadColumnSummaryScreen() {
    fetch("data/column_summary.csv")
        .then(res => res.text())
        .then(csv => {
            document.getElementById("column_summary_container").innerHTML =
                csvToHtml(csv);
        });
}

function loadParapetSummaryScreen() {
    fetch("data/parapet_progress_level.csv")
        .then(res => res.text())
        .then(csv => {
            document.getElementById("parapet_summary_container").innerHTML =
                csvToHtml(csv);
        });
}

/******************************************************
 * Helper: CSV → HTML table
 ******************************************************/
function csvToHtml(csvText) {
    const rows = csvText.trim().split("\n").map(r => r.split(","));
    let html = `<table class="table-shear"><thead><tr>`;

    rows[0].forEach(h => html += `<th>${h}</th>`);
    html += `</tr></thead><tbody>`;

    rows.slice(1).forEach(r => {
        html += `<tr>`;
        r.forEach(c => html += `<td>${c}</td>`);
        html += `</tr>`;
    });

    html += `</tbody></table>`;
    return html;
}


/******************************************************
 * 🚀 PAGE INIT (FINAL / CLEAN / CORRECT)
 ******************************************************/
document.addEventListener("DOMContentLoaded", () => {

    initSLAB();
    initPT();
    initCOLUMN();
    initMC();
    initPOLY();
    initPARAPET();
    initSHEARWALL();

    loadPTtablesScreen();             
    loadColumnSummaryScreen();        
    loadParapetSummaryScreen();       

    loadStaircaseKPI();
    loadStaircaseTablesForPrint();
    loadLiftcoreTableForPrint();
    loadShearwallTableForPrint();

});



/******************************************************
 * 🖨 PRINT MODE BUTTON
 ******************************************************/
document.getElementById("print_mode_btn")?.addEventListener("click", () => {
    if (typeof buildAllPrint === "function") buildAllPrint();
    setTimeout(() => window.print(), 300);
});
