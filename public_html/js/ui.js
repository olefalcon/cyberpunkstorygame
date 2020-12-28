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
$(document).ready(function(){
    $('#combat-bar').mouseenter(function() {
        $('#combat-info-section').slideDown(400); 
    });
    $('#combat-bar').mouseleave(function() {
        $('#combat-info-section').slideUp(400);
    });
    $('.combat-buttons').mouseenter(function() {
        //Case for each combat button        
        let html = "";
        switch($(this).attr('id')) {
            case 'combat-melee':
                html = global.player.melee.combatInfoRender();
                break;
            case 'combat-pistol':
                html = global.player.pistol.combatInfoRender();
                break;
        }
        $('#combat-info-section').html(html);
    });
});


