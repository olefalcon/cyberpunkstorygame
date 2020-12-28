/* 
 * Copyright (C) 2020 olefa
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*global global*/
/*global lib*/


class Item {
    
    //Constructor
    constructor(tier) {
        
        //Generic Item Variables
        this._name = "";
        this._icon = "";
        this._tier = "";
        this._adj = "";
        this._fullname = "";
        
        let db;
        let item = this;
        db = lib.adj;

        //Choose a random weapon name to display based on rarity
        let entry = null;
        while (entry === null) {
            //Pick a random integer from 0 to the length of the db - 1
            let random = getRndInteger(0,db.length - 1);
            let dbEntry = db[random];
            //If selected entry matches requested tier use it
            if (dbEntry.tier === tier) {
                entry = dbEntry;
            } else { //If selected entry does not match requested tier remove it from the tempmorary array
                db.splice(db.indexOf(dbEntry),1);
            }
        }
        item._adj = entry.adj;
        item._tier = entry.tier;

    }
    
    //Get functions
    get name() {
        return this._name;
    }
    get icon() {
        return this._icon;
    }
    get tier() {
        return this._tier;
    }
    get adj() {
        return this._adj;
    }
    get fullname() {
        return this._adj + " " + this._name;
    }
    
    //Set Functions
    set name(x) {
        this._name = x;
    }
    set icon(x) {
        this._icon = x;
    }
    set tier(x) {
        this._tier = x;
    }
    set adj(x) {
        this._adj = x;
    }
    
    //Render methods
    combatBarRender() {
        let html = "<img src='"+this._icon+"' class='combat-button-icon'>";
        return html;
    }
    combatInfoRender() {
        let html = "<div>" + this._adj + " " + this._name + "</div>";
        return html;
    }
    
}

class Weapon extends Item {
    
    //Constructor
    constructor(tier) {
        //Call parent constructor
        super(tier);
        
        //Weapon specific variables
        this._damage = 0;
        this._accuracy = 0;
        this._range = 0;
        this._targets = 1;
        
    }
    
    //Getter Methods
    get damage() {
        return this._damage;
    }
    get accuracy() {
        return this._accuracy;
    }
    get range() {
        return this._range;
    }
    get targets() {
        return this._targets;
    }
    
    //Attack Method
    attack(target) {
        
        //Accuracy Check
        let random = getRndInteger(0,100);
        if (random > this._accuracy) {
            //Attack misses
            return false;
        }
        //Range Damage Modifier
        let modifiedDamage = damage;
        
        //Send damage to target
        target.takeDamage(modifiedDamage);
        
    }
    
}

class Melee extends Weapon {
    
    //Constructor
    constructor(tier) {
        super(tier);        
        generateWeaponEssentials(tier, "melees", this);
        //Melee specific variables
        this._counterDamage;
        this._counterChance;
    }
    
    //Getters
    get counterDamage() {
        return this._counterDamage;
    }
    get counterChance() {
        return this._counterChance;
    }
    //Setters
    set counterDamage(x) {
        this._counterDamage = x;
    }
    set counterChance(x) {
        this._counterChance = x;
    }
    
    //Attack Methods
    attack(attacker, target) {
        //Melee attacks always hit
        
        //Base damage
        let baseDamage = this._damage;
        let damage = baseDamage;
        //Check for attacker modifiers before passing the attack damage
        if (attacker === global.player) {
            //Check perk tree and cybernetics
        }
        target.takeDamage(damage);
        
        //Melee attacks proc a counter attack
        target.counter(attacker);
        
    }
    
    counter(attacker,target) {
        //Counter proc chance is already done in characters counter method
        
        //Base damage
        let baseDamage = this._damage;
        let damage = baseDamage;
        //Check for attacker modifiers before passing the attack damage
        if (attacker === global.player) {
            //Check perk tree and cybernetics
        }
        target.takeDamage(damage);
    }
    
}

class AmmoWeapon extends Weapon {
    
    //Constructor
    constructor(tier) {
        super(tier);
        //AmmoWeapon specific variables
        this._maxAmmo = 0;
        this._currentAmmo = 0;
    }
    
    //Getters
    get maxAmmo() {
        return this._maxAmmo;
    }
    get currentAmmo() {
        return this._currentAmmo;
    }
    //Setters
    set maxAmmo(x) {
        this._maxAmmo = x;
    }
    set currentAmmo(x) {
        this._currentAmmo = x;
    }
    
    //Attack method
    attack(attacker,target) {
        //Accuracy check
        if (getRndCheck(this._accuracy) === false) {
            //Attack misses
            return false;
        }
        //Base damage
        let baseDamage = this._damage;
        let damage = baseDamage;
        //Check for attacker modifiers before passing the attack damage
        if (attacker === global.player) {
            //Check perk tree and cybernetics
        }
        //Pass damage to target for their internal modifiers to handle
        target.takeDamage(damage);
        //Reduce ammo by 1
        this._currentAmmo -= 1;
    }
    
}

class Pistol extends AmmoWeapon {
    //Constructor
    constructor(tier) {
        super(tier);
        generateWeaponEssentials(tier, "pistols", this);
    }
}

class Throwable extends AmmoWeapon {
    //Constructor
    constructor(tier) {
        super(tier);
    }
    //Attack method
    attack(attacker,targets) {
        //Accuracy check
        if (getRndCheck(this._accuracy) === false) {
            //Attack misses
            return false;
        }
        //Base damage
        let baseDamage = this._damage;
        let damage = baseDamage;
        //Check for attacker modifiers before passing the attack damage
        if (attacker === global.player) {
            //Check perk tree and cybernetics
        }
        //Pass damage to target for their internal modifiers to handle
        let target;
        for (target in targets) {
           target.takeDamage(damage); 
        }
        //Reduce ammo by 1
        this._currentAmmo -= 1;
    }
}

class Stim extends Item {
    //Constructor
    constructor(tier) {
        super(tier);
        //Stim specific variables
        this._effect = "";
        this._effectDuration = 0;
    }
    
    //Getters
    get effect() {
        return this._effect;
    }
    get effectDuratoin() {
        return this._effectDuration;
    }
    //Setteres
    set effect(x) {
        this._effect = x;
    }
    set effectDuration(x) {
        this._effectDuration;
    }
}

function generateWeaponEssentials(tier, objLib, obj) {
    //Assign name and icon through a json grab
        let db;
        let item = obj;
        db = lib[objLib];
        console.log(lib);
                
        //Choose a random weapon name to display based on rarity
        let entry = null;
        while (entry === null) {
            //Pick a random integer from 0 to the length of the db - 1
            let random = getRndInteger(0,db.length - 1);
            let dbEntry = db[random];
            //If selected entry matches requested tier use it
            if (dbEntry.tier === tier) {
                entry = dbEntry;
            } else { //If selected entry does not match requested tier remove it from the tempmorary array
                db.splice(db.indexOf(dbEntry),1);
            }
        }
        item._name = entry.name;
        item._icon = entry.icon;
}