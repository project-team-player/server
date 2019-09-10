/**
 * This code mirrors data in DB in such order
 * test -> development -> staging -> production
 * WARNING: Copies teams, games and gamethreads collections!!!!!!
 * Except for fudge, fudge only copies games, gamethreads, users and bets
 */
const fudgeMirror = require('./fudge-mirror');
const devMirror = require('./developement-mirror');
const stagMirror = require('./staging-mirror');
const prodMirror = require('./production-mirror');

if(process.argv.includes("--dev")) {
    console.log("Mirror test DB into development DB");
    devMirror.runMirror();
} else if(process.argv.includes("--stag")) {
    console.log("Mirror development DB into staging DB");
    stagMirror.runMirror();
} else if(process.argv.includes("--prod")) {
    console.log("Mirror staging DB into production DB");
    prodMirror.runMirror();
} else if(process.argv.includes("--fudge")) {
    console.log("Mirror test DB into fudge DB");
    fudgeMirror.runMirror();
} else {
    console.log("Mirror initialized");
}