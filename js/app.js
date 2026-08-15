let sample8355Data = [
    { kelas: "VII C", nis: "7772", nisn: "0124588785", nama: "ADRIELL ALVARISNO NATALAGA", tmpt: "Pontianak", tgl: "2012-11-09", gender: "L", agama: "B", ayah: "NATALAGA", ibu: "MARIA", dom: "0", pkjA: "I", pkjI: "K", pdkA: "C", pdkI: "C", pghA: "C", pghI: "A", alamat: "JL. KEBANGKITAN NASIONAL GG. BANTILANKARYA, Rt. 1, Rw. 4", saudar: 0, sttb: 0, thn: 0 },
    { kelas: "VII C", nis: "7773", nisn: "0137942439", nama: "ALVIN PRATISTA AGNI", tmpt: "Pontianak", tgl: "2013-04-09", gender: "L", agama: "D", ayah: "AGNI", ibu: "LISA", dom: "0", pkjA: "G", pkjI: "A", pdkA: "A", pdkI: "D", pghA: "C", pghI: "A", alamat: "GG. TELUK SAHANG 2, Rt. 5, Rw. 3, Kel. Siantan Hilir", saudar: 0, sttb: 0, thn: 0 }
];

let masterKode = {
    agama: [
        { code: "A", label: "Islam" }, { code: "B", label: "Katolik" },
        { code: "C", label: "Kristen" }, { code: "D", label: "Budha" },
        { code: "E", label: "Hindu" }, { code: "F", label: "Kong Hu Chu" }, { code: "G", label: "Lainnya" }
    ],
    pekerjaan: [
        { code: "A", label: "Petani/Peternak" }, { code: "B", label: "PNS" },
        { code: "C", label: "TNI/POLRI" }, { code: "D", label: "Guru/Dosen" },
        { code: "E", label: "Dokter" }, { code: "F", label: "Politikus" },
        { code: "G", label: "Pedagang/Wiraswasta" }, { code: "H", label: "Pegawai Swasta" },
        { code: "I", label: "Buruh" }, { code: "J", label: "Seni/Lukis/Artis" },
        { code: "K", label: "Tidak Bekerja" }, { code: "L", label: "Lainnya" }
    ],
    pendidikan: [
        { code: "A", label: "SD/MI/Paket A" }, { code: "B", label: "SMP/MTs/Paket B" },
        { code: "C", label: "SMA/MA/SMK/Paket C" }, { code: "D", label: "D1" },
        { code: "E", label: "D2" }, { code: "F", label: "D3" },
        { code: "G", label: "D4/S1" }, { code: "H", label: "S2" }, { code: "I", label: "S3" }
    ],
    penghasilan: [
        { code: "A", label: "Tidak berpenghasilan" }, { code: "B", label: "< Rp 500.000" },
        { code: "C", label: "Rp 500.000 - Rp 999.999" }, { code: "D", label: "Rp 1.000.000 - Rp 1.999.999" },
        { code: "E", label: "Rp 2.000.000 - Rp 4.999.999" }, { code: "F", label: ">= Rp 5.000.000" }
    ]
};

function switchView(tabId) {
    document.querySelectorAll(".tab-view").forEach(v => v.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));

    document.getElementById(`view-${tabId}`).classList.add("active");
    event.currentTarget.classList.add("active");
}

function renderTable8355(data) {
    const tbody = document.getElementById("tableBody8355");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="23" style="text-align:center; padding: 16px;">Tidak ada data yang sesuai.</td></tr>`;
        return;
    }

    data.forEach((row, i) => {
        const originalIndex = sample8355Data.indexOf(row);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>
                <button class="btn-row-edit" onclick="editSiswa(${originalIndex})">Edit</button>
                <button class="btn-row-delete" onclick="deleteSiswa(${originalIndex})">Hapus</button>
            </td>
            <td>${row.kelas}</td>
            <td>${row.nis}</td>
            <td>${row.nisn}</td>
            <td><strong>${row.nama}</strong></td>
            <td>${row.tmpt}</td>
            <td>${row.tgl}</td>
            <td><strong>${row.gender}</strong></td>
            <td>${row.agama}</td>
            <td>${row.ayah}</td>
            <td>${row.ibu}</td>
            <td>${row.dom}</td>
            <td>${row.pkjA}</td>
            <td>${row.pkjI}</td>
            <td>${row.pdkA}</td>
            <td>${row.pdkI}</td>
            <td>${row.pghA}</td>
            <td>${row.pghI}</td>
            <td>${row.alamat}</td>
            <td>${row.saudar}</td>
            <td>${row.sttb}</td>
            <td>${row.thn}</td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("countLaki").innerText = data.filter(s => s.gender === 'L').length;
    document.getElementById("countPerempuan").innerText = data.filter(s => s.gender === 'P').length;
    document.getElementById("countTotal").innerText = data.length;
}

// FUNGSI UPDATE PRATINJAU LANGSUNG (LIVE PREVIEW)
function updatePreview() {
    const previewRow = document.getElementById("previewRow");
    if (!previewRow) return;

    const kelas = document.getElementById("inKelas").value.trim() || "-";
    const nis = document.getElementById("inNIS").value.trim() || "-";
    const nisn = document.getElementById("inNISN").value.trim() || "-";
    const nama = document.getElementById("inNama").value.trim().toUpperCase() || "[NAMA PESERTA DIDIK]";
    const tmpt = document.getElementById("inTempatLahir").value.trim() || "-";
    const tgl = document.getElementById("inTglLahir").value || "-";
    const gender = document.getElementById("inGender").value || "L";
    const agama = document.getElementById("inAgama").value || "-";
    const ayah = document.getElementById("inAyah").value.trim().toUpperCase() || "-";
    const ibu = document.getElementById("inIbu").value.trim().toUpperCase() || "-";
    const pkjA = document.getElementById("inPkjAyah").value || "-";
    const pkjI = document.getElementById("inPkjIbu").value || "-";
    const pdkA = document.getElementById("inPdkAyah").value || "-";
    const pdkI = document.getElementById("inPdkIbu").value || "-";
    const pghA = document.getElementById("inPghAyah").value || "-";
    const pghI = document.getElementById("inPghIbu").value || "-";
    const alamat = document.getElementById("inAlamat").value.trim() || "-";
    const saudar = document.getElementById("inSaudara").value || "0";
    const sttb = document.getElementById("inSTTB").value.trim() || "0";
    const thn = document.getElementById("inTahun").value.trim() || "0";

    previewRow.innerHTML = `
        <td><span class="badge badge-info" style="font-size:0.65rem;">PRATINJAU</span></td>
        <td>${kelas}</td>
        <td>${nis}</td>
        <td>${nisn}</td>
        <td><strong>${nama}</strong></td>
        <td>${tmpt}</td>
        <td>${tgl}</td>
        <td><strong>${gender}</strong></td>
        <td>${agama}</td>
        <td>${ayah}</td>
        <td>${ibu}</td>
        <td>0</td>
        <td>${pkjA}</td>
        <td>${pkjI}</td>
        <td>${pdkA}</td>
        <td>${pdkI}</td>
        <td>${pghA}</td>
        <td>${pghI}</td>
        <td>${alamat}</td>
        <td>${saudar}</td>
        <td>${sttb}</td>
        <td>${thn}</td>
    `;
}

function deleteSiswa(index) {
    if (confirm(`Hapus data siswa: ${sample8355Data[index].nama}?`)) {
        sample8355Data.splice(index, 1);
        applyFilters();
    }
}

function editSiswa(index) {
    const item = sample8355Data[index];
    document.getElementById("editIndex").value = index;
    document.getElementById("inKelas").value = item.kelas;
    document.getElementById("inNIS").value = item.nis;
    document.getElementById("inNISN").value = item.nisn;
    document.getElementById("inNama").value = item.nama;
    document.getElementById("inTempatLahir").value = item.tmpt;
    document.getElementById("inTglLahir").value = item.tgl;
    document.getElementById("inGender").value = item.gender;
    document.getElementById("inAgama").value = item.agama;
    document.getElementById("inAyah").value = item.ayah;
    document.getElementById("inIbu").value = item.ibu;
    document.getElementById("inPkjAyah").value = item.pkjA;
    document.getElementById("inPkjIbu").value = item.pkjI;
    document.getElementById("inPdkAyah").value = item.pdkA;
    document.getElementById("inPdkIbu").value = item.pdkI;
    document.getElementById("inPghAyah").value = item.pghA;
    document.getElementById("inPghIbu").value = item.pghI;
    document.getElementById("inSaudara").value = item.saudar;
    document.getElementById("inSTTB").value = item.sttb;
    document.getElementById("inTahun").value = item.thn;
    document.getElementById("inAlamat").value = item.alamat;

    document.getElementById("formTitle").innerText = "Edit Data Siswa (Format 8355)";
    document.getElementById("btnSubmitForm").innerText = "Update Data Siswa";

    updatePreview();

    document.querySelectorAll(".tab-view").forEach(v => v.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("view-input").classList.add("active");
    document.querySelectorAll(".tab-btn")[1].classList.add("active");
}

function resetFormSiswa() {
    document.getElementById("form8355").reset();
    document.getElementById("editIndex").value = "-1";
    document.getElementById("formTitle").innerText = "Form Input Data Siswa (Format 8355)";
    document.getElementById("btnSubmitForm").innerText = "Simpan Data Siswa";
    updatePreview();
}

function handleSaveSiswa(event) {
    event.preventDefault();
    const index = parseInt(document.getElementById("editIndex").value);

    const dataObj = {
        kelas: document.getElementById("inKelas").value.trim(),
        nis: document.getElementById("inNIS").value.trim(),
        nisn: document.getElementById("inNISN").value.trim(),
        nama: document.getElementById("inNama").value.trim().toUpperCase(),
        tmpt: document.getElementById("inTempatLahir").value.trim(),
        tgl: document.getElementById("inTglLahir").value,
        gender: document.getElementById("inGender").value,
        agama: document.getElementById("inAgama").value,
        ayah: document.getElementById("inAyah").value.trim().toUpperCase(),
        ibu: document.getElementById("inIbu").value.trim().toUpperCase(),
        dom: "0",
        pkjA: document.getElementById("inPkjAyah").value,
        pkjI: document.getElementById("inPkjIbu").value,
        pdkA: document.getElementById("inPdkAyah").value,
        pdkI: document.getElementById("inPdkIbu").value,
        pghA: document.getElementById("inPghAyah").value,
        pghI: document.getElementById("inPghIbu").value,
        alamat: document.getElementById("inAlamat").value.trim(),
        saudar: document.getElementById("inSaudara").value || "0",
        sttb: document.getElementById("inSTTB").value.trim() || "0",
        thn: document.getElementById("inTahun").value.trim() || "0"
    };

    if (index >= 0) {
        sample8355Data[index] = dataObj;
        alert("Sistem: Data siswa berhasil diperbarui!");
    } else {
        sample8355Data.push(dataObj);
        alert("Sistem: Siswa baru berhasil ditambahkan!");
    }

    resetFormSiswa();
    applyFilters();

    document.querySelectorAll(".tab-view").forEach(v => v.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.getElementById("view-tabel").classList.add("active");
    document.querySelectorAll(".tab-btn")[0].classList.add("active");
}

function renderMasterKode() {
    ['agama', 'pekerjaan', 'pendidikan', 'penghasilan'].forEach(cat => {
        const ul = document.getElementById(`list_${cat}`);
        ul.innerHTML = masterKode[cat].map((item, i) => `
            <li>
                <span><strong>${item.code}</strong> = ${item.label}</span>
                <button class="btn-del-sm" onclick="deleteKode('${cat}', ${i})">&times;</button>
            </li>
        `).join('');

        const legEl = document.getElementById(`legend${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
        if (legEl) {
            legEl.innerHTML = masterKode[cat].map(item => `${item.code} = ${item.label}`).join(', ');
        }
    });

    populateDropdowns();
}

function populateDropdowns() {
    ['inAgama', 'inPkjAyah', 'inPkjIbu', 'inPdkAyah', 'inPdkIbu', 'inPghAyah', 'inPghIbu'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        let cat = 'agama';
        if (id.includes('Pkj')) cat = 'pekerjaan';
        if (id.includes('Pdk')) cat = 'pendidikan';
        if (id.includes('Pgh')) cat = 'penghasilan';

        el.innerHTML = masterKode[cat].map(item => `<option value="${item.code}">${item.code} - ${item.label}</option>`).join('');
    });
}

function handleSaveKode(event, cat) {
    event.preventDefault();
    const code = document.getElementById(`code_${cat}`).value.trim().toUpperCase();
    const label = document.getElementById(`label_${cat}`).value.trim();

    const existing = masterKode[cat].find(i => i.code === code);
    if (existing) {
        existing.label = label;
    } else {
        masterKode[cat].push({ code, label });
    }

    renderMasterKode();
    document.getElementById(`code_${cat}`).value = "";
    document.getElementById(`label_${cat}`).value = "";
    alert(`Sistem: Kode Master ${cat.toUpperCase()} berhasil diperbarui!`);
}

function deleteKode(cat, index) {
    if (confirm("Hapus kode master ini?")) {
        masterKode[cat].splice(index, 1);
        renderMasterKode();
    }
}

function applyFilters() {
    const kVal = document.getElementById("filterKelas").value;
    const gVal = document.getElementById("filterGender").value;
    const sVal = document.getElementById("searchKeyword").value.toLowerCase();

    const filtered = sample8355Data.filter(item => {
        const matchK = (kVal === "ALL" || item.kelas === kVal);
        const matchG = (gVal === "ALL" || item.gender === gVal);
        const matchS = item.nama.toLowerCase().includes(sVal) || item.nisn.includes(sVal);
        return matchK && matchG && matchS;
    });

    renderTable8355(filtered);
}

function printPage() { window.print(); }
function saveData() { alert("Sistem: Data Lembar Induk Format 8355 berhasil disinkronkan."); }

window.onload = () => {
    renderMasterKode();
    renderTable8355(sample8355Data);
    updatePreview();
};