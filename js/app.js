const rawData = [
    { id: "REG-2025-001", date: "2025-02-14", year: "2025", category: "Operasional Poin A", desc: "Alokasi Pemeliharaan Rutin Sarana", budget: 350000000, status: "SELESAI" },
    { id: "REG-2025-002", date: "2025-05-20", year: "2025", category: "Operasional Poin B", desc: "Pengadaan Material & Fasilitas Poin B", budget: 780000000, status: "SELESAI" },
    { id: "REG-2025-003", date: "2025-09-10", year: "2025", category: "Logistik & Distribusi", desc: "Distribusi Armada Semester II", budget: 420000000, status: "PROSES" },
    { id: "REG-2025-004", date: "2025-11-05", year: "2025", category: "Operasional Poin A", desc: "Evaluasi Sistem Periodik Akhir Tahun", budget: 150000000, status: "SELESAI" },
    { id: "REG-2026-001", date: "2026-01-18", year: "2026", category: "Operasional Poin A", desc: "Pengembangan Infrastruktur Tahap I", budget: 950000000, status: "PROSES" },
    { id: "REG-2026-002", date: "2026-03-22", year: "2026", category: "Operasional Poin B", desc: "Peningkatan Kapasitas SDM & Sistem", budget: 310000000, status: "SELESAI" },
    { id: "REG-2026-003", date: "2026-06-12", year: "2026", category: "Logistik & Distribusi", desc: "Peremajaan Perangkat Operasional", budget: 640000000, status: "PROSES" },
    { id: "REG-2026-004", date: "2026-07-30", year: "2026", category: "Operasional Poin B", desc: "Audit Teknis Berkala Lapangan", budget: 125000000, status: "PENDING" }
];

let lineChartObj = null;
let doughnutChartObj = null;

function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(number);
}

function renderTable(data) {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    if(data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--text-muted); padding: 20px;">Tidak ada data yang sesuai filter.</td></tr>`;
        return;
    }

    data.forEach(item => {
        let badgeClass = "badge-info";
        if (item.status === "SELESAI") badgeClass = "badge-success";
        if (item.status === "PENDING") badgeClass = "badge-warning";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${item.id}</strong></td>
            <td>${item.date}</td>
            <td>${item.category}</td>
            <td>${item.desc}</td>
            <td>${formatRupiah(item.budget)}</td>
            <td><span class="badge ${badgeClass}">${item.status}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

function initCharts() {
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    lineChartObj = new Chart(ctxLine, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'],
            datasets: [
                {
                    label: 'Tren 2025',
                    data: [30, 45, 55, 60, 48, 70, 65, 80, 75, 85, 90, 95],
                    borderColor: '#64748b',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    tension: 0.2
                },
                {
                    label: 'Tren 2026',
                    data: [50, 65, 70, 82, 90, 95, 105, 110, null, null, null, null],
                    borderColor: '#0284c7',
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    tension: 0.2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } } }
            },
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: '#e2e8f0' } }
            }
        }
    });

    const ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');
    doughnutChartObj = new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: ['Operasional A', 'Operasional B', 'Logistik'],
            datasets: [{
                data: [45, 35, 20],
                backgroundColor: ['#1e293b', '#0284c7', '#94a3b8'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { family: 'Inter', size: 11 } } }
            }
        }
    });
}

function applyFilters() {
    const yearVal = document.getElementById("filterYear").value;
    const catVal = document.getElementById("filterCategory").value;
    const searchVal = document.getElementById("searchKeyword").value.toLowerCase();

    const filtered = rawData.filter(item => {
        const matchYear = (yearVal === "ALL" || item.year === yearVal);
        const matchCat = (catVal === "ALL" || item.category === catVal);
        const matchSearch = item.desc.toLowerCase().includes(searchVal) || item.id.toLowerCase().includes(searchVal);
        return matchYear && matchCat && matchSearch;
    });

    renderTable(filtered);

    const totalBudget = filtered.reduce((sum, i) => sum + i.budget, 0);
    document.getElementById("kpiTotalBudget").innerText = formatRupiah(totalBudget);
    document.getElementById("kpiTotalVolume").innerText = `${filtered.length} Berkas`;
}

// FUNGSI INPUT DATA BARU
function handleAddData(event) {
    event.preventDefault();

    const id = document.getElementById("inputID").value.trim();
    const date = document.getElementById("inputDate").value;
    const year = date ? date.split("-")[0] : new Date().getFullYear().toString();
    const category = document.getElementById("inputCategory").value;
    const budget = parseFloat(document.getElementById("inputBudget").value) || 0;
    const status = document.getElementById("inputStatus").value;
    const desc = document.getElementById("inputDesc").value.trim();

    const newItem = { id, date, year, category, desc, budget, status };

    // Sisipkan data baru ke posisi paling atas
    rawData.unshift(newItem);

    // Refresh tabel & KPI
    applyFilters();

    // Reset Form
    document.getElementById("dataForm").reset();

    alert("Sistem: Data registrasi baru berhasil ditambahkan!");
}

function printPage() {
    window.print();
}

function saveData() {
    alert("Sistem: Rekapitulasi data berhasil tersimpan.");
}

window.onload = () => {
    renderTable(rawData);
    initCharts();
    applyFilters();
};