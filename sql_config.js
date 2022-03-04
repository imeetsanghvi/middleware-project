"use strict";

const config = {
    user: "SA",
    password: "P@ssw0rd",
    database: "student_record",
    server: 'localhost',
    options: {
      encrypt: true, // for azure
      trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

module.exports = config