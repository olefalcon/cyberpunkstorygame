/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//GLOBAL VARIABLES
global = {};
global.player = {};
global.perkTree = {};
global.base = {};
//Lib is for JSON data
lib = {};

//Call the start function when the document is fully loaded
$(document).ready(function(){
   start(); 
});

//All functions to call to start the game
function start() {
    compileAllJSON();
}

//Function to save data
function save() {
    
}

//Function to recall data
function load() {
    //if no data is located on local storage then initialize values
    init();
}

//Function to init variables to starting values
function init() {
    global.player.melee = new Melee(1);
    global.player.pistol = null;
    global.player.stim = null;
    global.player.elemental = null;
    global.player.throwable = null;
    global.player.sniper = null;
    global.player.mg = null;
}

//Functions to call when game is in run state (compiling and loading/initialization is done)
function run() {
    testWeaponSpawn();
    renderCombatBar();
}


//Function to compile all json files
let compileCount = 0;
let filesToCompile = 8;
function compileAllJSON() {
    compileJSON("lib/adj.json", "adj");
    compileJSON("lib/weapons/melees.json", "melees");
    compileJSON("lib/weapons/pistols.json", "pistols");
    compileJSON("lib/weapons/stims.json", "stims");
    compileJSON("lib/weapons/elementals.json", "elementals");
    compileJSON("lib/weapons/throwables.json", "throwables");
    compileJSON("lib/weapons/snipers.json", "snipers");
    compileJSON("lib/weapons/mgs.json", "mgs");
}

//Generic function used to compile all JSON data into the global lib object
function compileJSON(JSONfile, obj) {
    $.ajax({
        type: "Get",
        url: JSONfile,
        dataType: "json",
        success: function(data) {
            lib[obj] = data[obj];
            compileCount ++;
            //If all compiles are done then call run function
            if (compileCount === filesToCompile) {
                load();
                run();
            }
            return true;
        },
        error: function(){
            alert("Cannot connect to server's json library!");
            return false;
        }
    });
}

let weapon1;
//TEST FUNCTIONS
function testWeaponSpawn() {
    weapon1 = new Melee(1);
    console.log(weapon1);
}