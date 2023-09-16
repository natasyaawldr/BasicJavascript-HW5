class Registration {

    static counter = 1;

    // constructor
    constructor(nama, umur, uang) {
        this.nama = nama;
        this.umur = umur;
        this.uang = uang;
        this.counter = Registration.counter++;
    }

    // processRegistration
    static async processRegistration(event) {
        event.preventDefault();

        const nama = document.getElementById("nama").value;
        const umur = parseInt(document.getElementById("umur").value);
        const uang = parseInt(document.getElementById("uang").value);

        try {
            await this.validateData(nama, umur, uang);
            this.showSuccessMessage("Pendaftaran sukses!");
            this.resume();
        } catch (error) {
            this.showErrorMessage(error);
        }
    }

    //data validation
    static validateData(nama, umur, uang) {
        return new Promise((resolve, reject) => {
            if (nama.length < 10) {
                reject("Nama harus terdiri dari minimal 10 karakter.");
            } else if (umur < 25) {
                reject("Umur minimal 25 tahun");
            } else if (uang < 100000 || uang > 1000000) {
                reject("Uang saku harus setidaknya 100.000 dan tidak boleh lebih dari 1.000.000.");
            } else {
                const newPendaftar = new Registration(nama, umur, uang);
                newPendaftar.createTableRow();
                resolve(newPendaftar);
            }
        });
    }

    // create table row
    createTableRow() {
        const tableBody = document.getElementById('table-body');
        const row = tableBody.insertRow();
        row.id = `tr-${this.counter}`;

        this.createTableData(row, this.nama);
        this.createTableData(row, this.umur);
        this.createTableData(row, this.uang);
    }

    // create table data
    createTableData(row, data) {
        const cell = row.insertCell();
        const text = document.createTextNode(data);
        cell.appendChild(text);
    }

    // resume
    static resume() {
        const rows = document.querySelectorAll("#table-body tr");

        let totalUmur = 0;
        let totalUang = 0;

        rows.forEach((row) => {
            const umur = parseInt(row.cells[1].textContent);
            const uang = parseInt(row.cells[2].textContent);

            totalUmur += umur;
            totalUang += uang;
        });

        const avgUmur = Math.round(totalUmur / rows.length);
        const avgUang = Math.round(totalUang / rows.length);

        document.getElementById("averageAge").textContent = avgUmur;
        document.getElementById("averageMoney").textContent = avgUang;
    }

    //Helper functions to show messages
    static showSuccessMessage(message) {
    const alertContainer = document.getElementById("alert-container");
    const alert = document.getElementById("alert");
    alert.textContent = message;
    alert.className = "alert alert-success"; // Menambahkan kelas CSS untuk pesan sukses
    alertContainer.style.display = "flex"; // Menampilkan pesan alert

    setTimeout(() => {
        alertContainer.style.display = "none"; // Sembunyikan pesan alert setelah beberapa detik
    }, 3000); // Sembunyikan setelah 3 detik (3000 milidetik)
    }

    static showErrorMessage(message) {
    const alertContainer = document.getElementById("alert-container");
    const alert = document.getElementById("alert");
    alert.textContent = message;
    alert.className = "alert alert-error";
    alertContainer.style.display = "flex"; // Menampilkan pesan alert

    setTimeout(() => {
        alertContainer.style.display = "none"; // Sembunyikan pesan alert setelah beberapa detik
    }, 3000); // Sembunyikan setelah 3 detik (3000 milidetik)
    }

}

// Event listener for form submission
document.getElementById("registrationForm").addEventListener("submit", (event) => {
    Registration.processRegistration(event);
});