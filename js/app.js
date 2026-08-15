// DATA MASTER SISWA FORMAT SHEET 8355
let dataSiswa8355 = [
    { nisn: "0081122334", nama: "Ahmad Rizky Pratama", gender: "L", kelas: "Kelas X-A", ttl: "Pontianak, 14 Januari 2008", status: "AKTIF" },
    { nisn: "0084455667", nama: "Siti Nurhaliza", gender: "P", kelas: "Kelas X-A", ttl: "Pontianak, 20 Mei 2008", status: "AKTIF" },
    { nisn: "0079988776", nama: "Budi Santoso", gender: "L", kelas: "Kelas X-B", ttl: "Mempawah, 05 Agustus 2007", status: "AKTIF" },
    { nisn: "0083344551", nama: "Dewi Anggraini", gender: "P", kelas: "Kelas XI-A", ttl: "Kubut Raya, 12 Oktober 2008", status: "MUTASI MASUK" },
    { nisn: "0071122445", nama: "Muhammad Fikri", gender: "L", kelas: "Kelas XII-A", ttl: "Pontianak, 02 Februari 2007", status: "AKTIF" }
];

function renderTable8355(data) {
    const tbody = document.getElementById("tableSiswaBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: var(--text-muted); padding: 20px;">Tidak ada data siswa yang sesuai filter.</td></tr>`;
        return;
    }

    data.forEach((item, index) => {
        let badgeClass = "badge-success";
        if (item.status === "MUTASI MASUK") badgeClass = "badge-info";
        if (item.status === "MUTASI KELUAR") badgeClass = "badge-warning";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td><strong>${item.nisn}</strong></td>
            <td>${item.nama}</td>
            <td><strong>${item.gender}</strong></td>
            <td>${item.kelas}</td>
            <td>${item.ttl}</td>
            <td><span class="badge ${badgeClass}">${item.status}</span></td>
        `;
        tbody.appendChild(tr);
    });

    updateKPI(data);
}

function updateKPI(data) {
    const total = data.length;
    const laki = data.filter(s => s.gender === "L").length;
    const perempuan = data.filter(s => s.gender === "P").length;

    document.getElementById("kpiTotalSiswa").innerText = `${total} Siswa`;
    document.getElementById("kpiTotalLaki").innerText = `${laki} Siswa`;
    document.getElementById("kpiTotalPerempuan").innerText = `${perempuan} Siswa`;
}

function applyFilters() {
    const kelasVal = document.getElementById("filterKelas").value;
    const genderVal = document.getElementById("filterGender").value;
    const searchVal = document.getElementById("searchKeyword").value.toLowerCase();

    const filtered = dataSiswa8355.filter(item => {
        const matchKelas = (kelasVal === "ALL" || item.kelas === kelasVal);
        const matchGender = (genderVal === "ALL" || item.gender === genderVal);
        const matchSearch = item.nama.toLowerCase().includes(searchVal) || item.nisn.toLowerCase().includes(searchVal);
        return matchKelas && matchGender && matchSearch;
    });

    renderTable8355(filtered);
}

function handleAddSiswa(event) {
    event.preventDefault();

    const nisn = document.getElementById("inputNISN").value.trim();
    const nama = document.getElementById("inputNama").value.trim();
    const gender = document.getElementById("inputGender").value;
    const kelas = document.getElementById("inputKelas").value;
    const ttl = document.getElementById("inputTTL").value.trim();
    const status = document.getElementById("inputStatus").value;

    const newSiswa = { nisn, nama, gender, kelas, ttl, status };

    dataSiswa8355.unshift(newSiswa);
    applyFilters();

    document.getElementById("formSiswa8355").reset();
    alert("Sistem: Data siswa berhasil ditambahkan ke Sheet 8355!");
}

function switchTab(tabId) {
    document.querySelectorAll(".tab-view").forEach(v => v.classList.remove("active"));
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));

    document.getElementById(`view-${tabId}`).classList.add("active");
    event.currentTarget.classList.add("active");
}

function printPage() { window.print(); }
function saveData() { alert("Sistem: Form 8355 berhasil tersimpan."); }

window.onload = () => {
    renderTable8355(dataSiswa8355);
};