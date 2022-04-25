(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window.addEventListener("load", (function() {
        if (document.querySelector("body")) setTimeout((function() {
            document.querySelector("body").classList.add("_loaded");
        }), 200);
    }));
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".check")) document.querySelector(".check").textContent = sessionStorage.getItem("money");
    } else {
        sessionStorage.setItem("money", 5e3);
        if (document.querySelector(".check")) document.querySelector(".check").textContent = sessionStorage.getItem("money");
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    function add_remove_className(block, className) {
        if (document.querySelector(block).classList.contains(className)) document.querySelector(block).classList.remove(className); else document.querySelector(block).classList.add(className);
    }
    function remove_class(block, className) {
        document.querySelectorAll(block).forEach((el => {
            if (el.classList.contains(className)) el.classList.remove(className);
        }));
    }
    function delete_money(count, block) {
        let money = +sessionStorage.getItem("money");
        sessionStorage.setItem("money", money - count);
        setTimeout((() => {
            document.querySelector(block).classList.add("_delete-money");
            document.querySelector(block).textContent = sessionStorage.getItem("money");
        }), 500);
        setTimeout((() => {
            document.querySelector(block).classList.remove("_delete-money");
        }), 1500);
    }
    function no_money(block) {
        document.querySelector(block).classList.add("_no-money");
        setTimeout((() => {
            document.querySelector(block).classList.remove("_no-money");
        }), 1e3);
    }
    function get_random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function add_money(count, block, delay, delay_off) {
        setTimeout((() => {
            document.querySelector(block).textContent = +sessionStorage.getItem("money") + count;
            document.querySelector(block).classList.add("_anim-add-money");
            sessionStorage.setItem("money", +sessionStorage.getItem("money") + count);
        }), delay);
        setTimeout((() => {
            document.querySelector(block).classList.remove("_anim-add-money");
        }), delay_off);
    }
    function get_random_animate() {
        let number = get_random(0, 3);
        let arr = [ "jump", "scale", "rotate" ];
        let block_icon = document.querySelector(".bank__body img");
        if (block_icon.classList.contains("_anim-icon-jump")) block_icon.classList.remove("_anim-icon-jump"); else if (block_icon.classList.contains("_anim-icon-scale")) block_icon.classList.remove("_anim-icon-scale"); else if (block_icon.classList.contains("_anim-icon-rotate")) block_icon.classList.remove("_anim-icon-rotate");
        block_icon.classList.add(`_anim-icon-${arr[number]}`);
    }
    if (document.querySelector(".bank__body img")) setInterval((() => {
        get_random_animate();
    }), 2e4);
    if (document.querySelector(".main__body") && document.querySelector(".preloader").classList.contains("_hide")) {
        document.querySelector(".wrapper__bacgrounds").classList.add("_active");
        document.querySelector(".main").classList.add("_active");
    }
    if (document.querySelector(".shop")) {
        document.querySelector(".shop__body").classList.add("_active");
        if (sessionStorage.getItem("bonus-1")) document.querySelector(".box-bonus__count_1").textContent = sessionStorage.getItem("bonus-1"); else document.querySelector(".box-bonus__count_1").textContent = 0;
        if (sessionStorage.getItem("bonus-2")) document.querySelector(".box-bonus__count_2").textContent = sessionStorage.getItem("bonus-2"); else document.querySelector(".box-bonus__count_2").textContent = 0;
        if (sessionStorage.getItem("bonus-3")) document.querySelector(".box-bonus__count_3").textContent = sessionStorage.getItem("bonus-3"); else document.querySelector(".box-bonus__count_3").textContent = 0;
    }
    function write_bonus(num_bonus) {
        if (sessionStorage.getItem(`bonus-${num_bonus}`)) sessionStorage.setItem(`bonus-${num_bonus}`, +sessionStorage.getItem(`bonus-${num_bonus}`) + 1); else sessionStorage.setItem(`bonus-${num_bonus}`, 1);
        document.querySelector(`.box-bonus__count_${num_bonus}`).textContent = sessionStorage.getItem(`bonus-${num_bonus}`);
    }
    function read_write_bonus(num_bonus) {
        if (sessionStorage.getItem(`bonus-${num_bonus}`)) sessionStorage.setItem(`bonus-${num_bonus}`, +sessionStorage.getItem(`bonus-${num_bonus}`)); else sessionStorage.setItem(`bonus-${num_bonus}`, 0);
        document.querySelector(`.box-bonus__count_${num_bonus}`).textContent = sessionStorage.getItem(`bonus-${num_bonus}`);
    }
    let config_game = {
        coord_item_left: 0
    };
    let arr_game = [];
    let arr_current_level = [];
    if (document.querySelector(".game")) {
        document.querySelector(".game__body").classList.add("_active");
        sessionStorage.setItem("current-bet", 50);
        document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        document.querySelector(".header__text").textContent = sessionStorage.getItem("current-level");
        read_write_bonus(1);
        read_write_bonus(2);
        read_write_bonus(3);
        if ("ease" == sessionStorage.getItem("current-level")) {
            create_wires_ease();
            arr_game = [ "correctly", "correctly", "bang", "bang", "neutral" ];
            sessionStorage.setItem("current-x", 4);
        } else if ("normal" == sessionStorage.getItem("current-level")) {
            create_wires_normal();
            arr_game = [ "correctly", "correctly", "correctly", "bang", "bang", "bang", "neutral", "neutral" ];
            sessionStorage.setItem("current-x", 6);
            document.querySelector(".footer-game__button-random").classList.remove("_hide");
        } else if ("hard" == sessionStorage.getItem("current-level")) {
            create_wires_hard();
            arr_game = [ "correctly", "correctly", "correctly", "correctly", "bang", "bang", "bang", "bang" ];
            document.querySelector(".footer-game__button-random").classList.remove("_hide");
            sessionStorage.setItem("current-x", 8);
        }
        document.querySelector(".field-game__multiple p").textContent = `x${sessionStorage.getItem("current-x")}`;
        create_start_game();
    }
    function create_start_game() {
        arr_current_level = shuffle(arr_game);
        write_data_wire();
        create_storrage_bang_correctly_items();
    }
    function create_wires_ease() {
        let wire_1 = document.createElement("div");
        wire_1.classList.add("wires__wire");
        wire_1.classList.add("wires__wire_red");
        let wire_2 = document.createElement("div");
        wire_2.classList.add("wires__wire");
        wire_2.classList.add("wires__wire_yellow");
        let wire_3 = document.createElement("div");
        wire_3.classList.add("wires__wire");
        wire_3.classList.add("wires__wire_green");
        let wire_4 = document.createElement("div");
        wire_4.classList.add("wires__wire");
        wire_4.classList.add("wires__wire_sky");
        let wire_5 = document.createElement("div");
        wire_5.classList.add("wires__wire");
        wire_5.classList.add("wires__wire_blue");
        document.querySelector(".wires").append(wire_1, wire_2, wire_3, wire_4, wire_5);
    }
    function create_wires_normal() {
        let wire_1 = document.createElement("div");
        wire_1.classList.add("wires__wire");
        wire_1.classList.add("wires__wire_red");
        let wire_2 = document.createElement("div");
        wire_2.classList.add("wires__wire");
        wire_2.classList.add("wires__wire_red");
        let wire_3 = document.createElement("div");
        wire_3.classList.add("wires__wire");
        wire_3.classList.add("wires__wire_yellow");
        let wire_4 = document.createElement("div");
        wire_4.classList.add("wires__wire");
        wire_4.classList.add("wires__wire_green");
        let wire_5 = document.createElement("div");
        wire_5.classList.add("wires__wire");
        wire_5.classList.add("wires__wire_sky");
        let wire_6 = document.createElement("div");
        wire_6.classList.add("wires__wire");
        wire_6.classList.add("wires__wire_blue");
        let wire_7 = document.createElement("div");
        wire_7.classList.add("wires__wire");
        wire_7.classList.add("wires__wire_red");
        let wire_8 = document.createElement("div");
        wire_8.classList.add("wires__wire");
        wire_8.classList.add("wires__wire_green");
        document.querySelector(".wires").append(wire_1, wire_2, wire_3, wire_4, wire_5, wire_6, wire_7, wire_8);
    }
    function create_wires_hard() {
        let wire_1 = document.createElement("div");
        wire_1.classList.add("wires__wire");
        wire_1.classList.add("wires__wire_sky");
        let wire_2 = document.createElement("div");
        wire_2.classList.add("wires__wire");
        wire_2.classList.add("wires__wire_sky");
        let wire_3 = document.createElement("div");
        wire_3.classList.add("wires__wire");
        wire_3.classList.add("wires__wire_green");
        let wire_4 = document.createElement("div");
        wire_4.classList.add("wires__wire");
        wire_4.classList.add("wires__wire_yellow");
        let wire_5 = document.createElement("div");
        wire_5.classList.add("wires__wire");
        wire_5.classList.add("wires__wire_green");
        let wire_6 = document.createElement("div");
        wire_6.classList.add("wires__wire");
        wire_6.classList.add("wires__wire_sky");
        let wire_7 = document.createElement("div");
        wire_7.classList.add("wires__wire");
        wire_7.classList.add("wires__wire_sky");
        let wire_8 = document.createElement("div");
        wire_8.classList.add("wires__wire");
        wire_8.classList.add("wires__wire_green");
        document.querySelector(".wires").append(wire_1, wire_2, wire_3, wire_4, wire_5, wire_6, wire_7, wire_8);
    }
    function write_data_wire() {
        document.querySelectorAll(".wires__wire").forEach(((el, i) => {
            el.dataset.value = arr_current_level[i];
        }));
    }
    function create_storrage_bang_correctly_items() {
        sessionStorage.setItem("correctly-items", 0);
        sessionStorage.setItem("bang-items", 0);
        document.querySelectorAll(".wires__wire").forEach((el => {
            if ("correctly" == el.dataset.value) sessionStorage.setItem("correctly-items", +sessionStorage.getItem("correctly-items") + 1); else if ("bang" == el.dataset.value) sessionStorage.setItem("bang-items", +sessionStorage.getItem("bang-items") + 1);
        }));
    }
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [ array[j], array[i] ];
        }
        return array;
    }
    function create__remove_bang() {
        let item = document.createElement("div");
        item.classList.add("field-game__fire");
        let image = document.createElement("img");
        image.setAttribute("src", "img/icons/bang.gif");
        image.setAttribute("alt", "gif-bang");
        item.append(image);
        setTimeout((() => {
            document.querySelector(".field-game__bomb").append(item);
        }), 1e3);
        setTimeout((() => {
            item.remove();
        }), 2300);
    }
    function check_game_over(targetElement) {
        setTimeout((() => {
            create_line(targetElement);
        }), 1500);
        if ("bang" == targetElement.dataset.value) {
            create__remove_bang();
            bang_clipper();
            setTimeout((() => {
                document.querySelector(".loose").classList.add("_active");
            }), 2e3);
        } else if ("correctly" == targetElement.dataset.value) {
            targetElement.dataset.value = "empty";
            sessionStorage.setItem("correctly-items", +sessionStorage.getItem("correctly-items") - 1);
            add_money(50, ".check", 1500, 2500);
            setTimeout((() => {
                create_pin(targetElement);
            }), 1500);
            check_win();
        }
    }
    function check_win() {
        if (+sessionStorage.getItem("correctly-items") <= 0) {
            let win_count = +sessionStorage.getItem("current-x") * +sessionStorage.getItem("current-bet");
            add_money(win_count, ".check", 1500, 2500);
            document.querySelector(".win__text").textContent = win_count;
            setTimeout((() => {
                document.querySelector(".win").classList.add("_active");
            }), 2e3);
        }
    }
    function bang_clipper() {
        setTimeout((() => {
            document.querySelector(".field-game__clipper").classList.add("_bang");
        }), 1e3);
    }
    function get_coord_wire(elem) {
        config_game.coord_item_left = elem.getBoundingClientRect().left;
    }
    function remove_screen_win_or_loose() {
        if (document.querySelector(".win").classList.contains("_active")) document.querySelector(".win").classList.remove("_active"); else document.querySelector(".loose").classList.remove("_active");
    }
    function moove_clipper() {
        if (document.querySelector(".field-game__clipper")) {
            document.querySelector(".field-game__clipper").style.left = `${config_game.coord_item_left - 20}px`;
            document.querySelector(".field-game__clipper").style.bottom = "60%";
            setTimeout((() => {
                document.querySelector(".field-game__clipper").style.left = "80%";
                document.querySelector(".field-game__clipper").style.bottom = "0";
            }), 1500);
        }
    }
    function anim_clipper() {
        moove_clipper();
        document.querySelector(".field-game__clipper").classList.add("_active");
        setTimeout((() => {
            document.querySelector(".field-game__clipper").classList.remove("_active");
        }), 1500);
    }
    function get_x2_bonus() {
        sessionStorage.setItem("bonus-1", +sessionStorage.getItem("bonus-1") - 1);
        sessionStorage.setItem("current-x", 2 * +sessionStorage.getItem("current-x"));
        document.querySelector(".box-bonus__count_1").textContent = sessionStorage.getItem("bonus-1");
        document.querySelector(".field-game__multiple p").textContent = `x${sessionStorage.getItem("current-x")}`;
    }
    function get_half_bonus() {
        sessionStorage.setItem("bonus-2", +sessionStorage.getItem("bonus-2") - 1);
        document.querySelector(".box-bonus__count_2").textContent = sessionStorage.getItem("bonus-2");
        let items_correctly = [];
        document.querySelectorAll(".wires__wire").forEach((el => {
            if ("correctly" == el.dataset.value) items_correctly.push(el);
        }));
        items_correctly[0].classList.add("_prompt");
    }
    function get_rest_wires() {
        sessionStorage.setItem("bonus-3", +sessionStorage.getItem("bonus-3") - 1);
        document.querySelector(".box-bonus__count_3").textContent = sessionStorage.getItem("bonus-3");
        let arr1 = [];
        let arr_indexs = [];
        document.querySelectorAll(".wires__wire").forEach(((el, i) => {
            if (!el.classList.contains("_active")) {
                arr1.push(el);
                arr_indexs.push(i);
            }
        }));
        let num = Math.ceil(arr1.length / 2);
        let new_array = shuffle(arr1);
        change_data_bonus_3(new_array, num);
        create_storrage_bang_correctly_items();
        check_win();
    }
    function change_data_bonus_3(arr, num) {
        arr.forEach(((el, i) => {
            if (i < num) {
                el.classList.add("_hide");
                el.dataset.value = "empty";
            }
        }));
    }
    function write_current_xBet() {
        if ("ease" == sessionStorage.getItem("current-level")) sessionStorage.setItem("current-x", 4); else if ("normal" == sessionStorage.getItem("current-level")) sessionStorage.setItem("current-x", 6); else if ("hard" == sessionStorage.getItem("current-level")) sessionStorage.setItem("current-x", 8);
        document.querySelector(".field-game__multiple p").textContent = `x${sessionStorage.getItem("current-x")}`;
    }
    function create_pin(block) {
        let item = document.createElement("div");
        item.classList.add("wires__pin");
        let image = document.createElement("img");
        image.setAttribute("src", "img/icons/check-mark.png");
        item.append(image);
        block.append(item);
    }
    function create_line(block) {
        let item = document.createElement("div");
        item.classList.add("wires__line");
        let image = document.createElement("img");
        image.setAttribute("src", "img/icons/pin.jpg");
        item.append(image);
        block.append(item);
    }
    function check_current_bet() {
        if (+sessionStorage.getItem("current-bet") > +sessionStorage.getItem("money")) {
            sessionStorage.setItem("current-bet", 0);
            document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
        }
    }
    function get_random_bet() {
        let num = get_random(0, +sessionStorage.getItem("money"));
        let num1 = 50 * Math.ceil(num / 50);
        sessionStorage.setItem("current-bet", num1);
        document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".preloader__button")) {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main__body") && document.querySelector(".preloader").classList.contains("_hide")) {
                document.querySelector(".wrapper__bacgrounds").classList.add("_active");
                document.querySelector(".main").classList.add("_active");
            }
        }
        if (targetElement.closest(".item-shop__button-buy_double")) if (+sessionStorage.getItem("money") >= 1e3) {
            delete_money(1e3, ".check");
            write_bonus(1);
        } else no_money(".check");
        if (targetElement.closest(".item-shop__button-buy_lamp")) if (+sessionStorage.getItem("money") >= 5e3) {
            delete_money(5e3, ".check");
            write_bonus(2);
        } else no_money(".check");
        if (targetElement.closest(".item-shop__button-buy_half")) if (+sessionStorage.getItem("money") >= 2500) {
            delete_money(2500, ".check");
            write_bonus(3);
        } else no_money(".check");
        if (targetElement.closest(".block-bet__minus")) {
            let current_bet = +sessionStorage.getItem("current-bet");
            if (current_bet >= 50) {
                sessionStorage.setItem("current-bet", current_bet - 50);
                document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
            }
        }
        if (targetElement.closest(".block-bet__plus")) {
            let current_bet = +sessionStorage.getItem("current-bet");
            let current_bank = +sessionStorage.getItem("money");
            if (current_bank - 49 > current_bet) {
                sessionStorage.setItem("current-bet", current_bet + 50);
                document.querySelector(".block-bet__coins").textContent = sessionStorage.getItem("current-bet");
            } else no_money(".check");
        }
        if (targetElement.closest(".main__button_easy")) sessionStorage.setItem("current-level", "ease");
        if (targetElement.closest(".main__button_normal")) sessionStorage.setItem("current-level", "normal");
        if (targetElement.closest(".main__button_hard")) sessionStorage.setItem("current-level", "hard");
        if (targetElement.closest(".wires")) if (targetElement.closest(".wires__wire") && !targetElement.closest(".wires__wire").classList.contains("_active")) {
            targetElement.closest(".wires__wire").classList.add("_active");
            get_coord_wire(targetElement.closest(".wires__wire"));
            anim_clipper();
            check_game_over(targetElement.closest(".wires__wire"));
            add_remove_className(".wires", "_hold");
            setTimeout((() => {
                add_remove_className(".wires", "_hold");
            }), 2e3);
            remove_class(".wires__wire", "_prompt");
            add_remove_className(".footer-game__bonuses", "_not-active");
        }
        if (targetElement.closest(".loose__button_play") || targetElement.closest(".win__button_play")) {
            create_start_game();
            remove_screen_win_or_loose();
            write_current_xBet();
            document.querySelectorAll(".wires__wire").forEach((el => el.classList.remove("_active")));
            document.querySelector(".field-game__clipper").classList.remove("_bang");
            add_remove_className(".block-bet", "_hold");
            add_remove_className(".footer-game__buttons", "_hold");
            add_remove_className(".footer-game__bonuses", "_hold");
            remove_class(".wires__wire", "_hide");
            add_remove_className(".wires", "_hold");
            check_current_bet();
            if (document.querySelector(".wires__pin")) document.querySelectorAll(".wires__pin").forEach((el => el.remove()));
            if (document.querySelector(".wires__line")) document.querySelectorAll(".wires__line").forEach((el => el.remove()));
        }
        if (targetElement.closest(".footer-game__button-bet")) {
            document.querySelector(".wires").classList.remove("_hold");
            delete_money(+sessionStorage.getItem("current-bet"), ".check");
            add_remove_className(".block-bet", "_hold");
            add_remove_className(".footer-game__buttons", "_hold");
            add_remove_className(".footer-game__bonuses", "_hold");
        }
        if (targetElement.closest(".box-bonus_1") && document.querySelector(".game") && +sessionStorage.getItem("bonus-1") > 0) {
            get_x2_bonus();
            setTimeout((() => {
                add_remove_className(".footer-game__bonuses", "_not-active");
            }), 1e3);
        }
        if (targetElement.closest(".box-bonus_2") && document.querySelector(".game") && +sessionStorage.getItem("bonus-2") > 0) {
            get_half_bonus();
            add_remove_className(".footer-game__bonuses", "_not-active");
        }
        if (targetElement.closest(".box-bonus_3") && document.querySelector(".game") && +sessionStorage.getItem("bonus-3") > 0) {
            get_rest_wires();
            add_remove_className(".footer-game__bonuses", "_not-active");
            setTimeout((() => {
                add_remove_className(".footer-game__bonuses", "_not-active");
            }), 1e3);
        }
        if (targetElement.closest(".footer-game__button-random") && !document.querySelector(".footer-game__button-random").classList.contains("_hide")) {
            get_random_bet();
            document.querySelector(".wires").classList.remove("_hold");
            delete_money(+sessionStorage.getItem("current-bet"), ".check");
            add_remove_className(".block-bet", "_hold");
            add_remove_className(".footer-game__buttons", "_hold");
            add_remove_className(".footer-game__bonuses", "_hold");
        }
    }));
    window["FLS"] = true;
    isWebp();
})();