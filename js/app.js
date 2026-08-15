const sample8355Data = [
    { kelas: "VII C", nis: "7772", nisn: "0124588785", nama: "ADRIELL ALVARISNO NATALAGA", tmpt: "Pontianak", tgl: "2012-11-09", gender: "L", agama: "B", ayah: "", ibu: "", dom: "0", pkjA: "I", pkjI: "K", pdkA: "C", pdkI: "C", pghA: "C", pghI: "A", alamat: "JL. KEBANGKITAN NASIONAL GG. BANTILANKARYA, Rt. 1, Rw. 4, Kel. Batu Layang, Kec. Pontianak Utara", saudar: 0, sttb: 0, thn: 0 },
    { kelas: "VII C", nis: "7773", nisn: "0137942439", nama: "ALVIN PRATISTA AGNI", tmpt: "Pontianak", tgl: "2013-04-09", gender: "L", agama: "D", ayah: "", ibu: "", dom: "0", pkjA: "G", pkjI: "A", pdkA: "A", pdkI: "D", pghA: "C", pghI: "A", alamat: "GG. TELUK SAHANG 2, Rt. 5, Rw. 3, Kel. Siantan Hilir, Kec. Pontianak Utara", saudar: 0, sttb: 0, thn: 0 }
];

function renderTable8355(data) {
    const tbody = document.getElementById("tableBody8355");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="22" style="text-align:center; padding: 16px;">Tidak ada data yang sesuai filter.</td></tr>`;
        return;
    }

    data.forEach((row, i) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${i + 1}</td>
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

    const totalLaki = data.filter(s => s.gender === 'L').length;
    const totalPerempuan = data.filter(s => s.gender === 'P').length;

    document.getElementById("countLaki").innerText = totalLaki;
    document.getElementById("countPerempuan").innerText = totalPerempuan;
    document.getElementById("countTotal").innerText = data.length;
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

function handleAddSiswa(event) {
    event.preventDefault();

    const newSiswa = {
        kelas: document.getElementById("inKelas").value.trim(),
        nis: document.getElementById("inNIS").value.trim(),
        nisn: document.getElementById("inNISN").value.trim(),
        nama: document.getElementById("inNama").value.trim().toUpperCase(),
        tmpt: document.getElementById("inTempatLahir").value.trim(),
        tgl: document.getElementById("inTglLahir").value,
        gender: document.getElementById("inGender").value,
        agama: document.getElementById("inAgama").value,
        ayah: "", ibu: "", dom: "0",
        pkjA: document.getElementById("inPkjAyah").value,
        pkjI: document.getElementById("inPkjIbu").value,
        pdkA: document.getElementById("inPdkAyah").value,
        pdkI: document.getElementById("inPdkIbu").value,
        pghA: document.getElementById("inPghAyah").value,
        pghI: document.getElementById("inPghIbu").value,
        alamat: document.getElementById("inAlamat").value.trim(),
        saudar: 0, sttb: 0, thn: 0
    };

    sample8355Data.push(newSiswa);
    applyFilters();
    document.getElementById("form8355").reset();
    alert("Sistem: Data siswa berhasil ditambahkan dengan opsi Dropdown!");
}

function printPage() { window.print(); }
function saveData() { alert("Sistem: Data Format 8355 tersimpan."); }

window.onload = () => {
    renderTable8355(sample8355Data);
};