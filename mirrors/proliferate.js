/**
 * This code mirrors data in DB in such order
 * test -> development -> staging -> production
 */

if(process.argv.includes("--dev")) {
    console.log("Mirror test DB into development DB");
} else if(process.argv.includes("--stag")) {
    console.log("Mirror development DB into staging DB");
} else if(process.argv.includes("--prod")) {
    console.log("Mirror staging DB into production DB");
} else {
    console.log("Mirror initialized");
}