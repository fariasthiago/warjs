var warjs = function () {

    var scrollPosY = 0;
    var screenHeight = 0;
    var screenWidth = 0;
    var elements = {};
    var elements_size = {};
    var elements_shot = {};
    var elements_menu = {};
    var objid = 0;

    var $screenHeight = 0;
    var $screenWidth = 0;
    var $parentWidth = 0;
    var $parentHeight = 0;
    var $parentWidthIn = 0;
    var $parentHeightIn = 0;

    function warjs() {
        $(window).scroll(scrollMove);
        $(window).resize(screenResize);
        scrollMove();
        screenResize();
        render();
    }

    warjs();

    function scrollMove() {
        scrollPosY = $(document).scrollTop();
        render();
    }

    function screenResize() {
        $screenHeight = screenHeight = $(window).height();
        $screenWidth = screenWidth = $(window).width();

        for (obj in elements_size) {
            var objeto = elements_size[obj].obj;
            if (elements_size[obj].height) {

                var objH = parseInt(compileSintax(elements_size[obj].height));
                if(!objH){
                    if($(elements_size[obj].height).length){
                        objH = $(elements_size[obj].height).outerHeight(true);
                    }
                }

                var hend = objH;
                if (elements_size[obj].limitH && (elements_size[obj].limitH > objH)) {
                    hend = elements_size[obj].limitH;
                }
                objeto.height(hend);
            }
            if (elements_size[obj].width) {
                var objW = parseInt(compileSintax(elements_size[obj].width));
                var wend = objW;
                if (elements_size[obj].limitW && (elements_size[obj].limitW > objW)) {
                    wend = elements_size[obj].limitH;
                }
                objeto.width(hend);
            }
        }
        render();
    }


    function addShotClass(object, className, delay) {
        window.setTimeout(function () {
            object.obj.addClass(className);

        }, delay);
    }

    function removeShotClass(object, className, delay) {
        window.setTimeout(function () {
            object.obj.removeClass(className);

        }, delay);
    }

    function shotCallFunction(object, className, delay) {
        window.setTimeout(function () {

            if (typeof window[className] == "function") {
                window[className](object);
            }

        }, delay);
    }

    var activeMenu, activeMenuOld;

    function render() {

        var porctotal = (scrollPosY * 100) / ($(document).height() - $(window).height());

        for (objShot in elements_shot) {
            var point = 0;
            var shotDelay = parseInt(compileSintax(elements_shot[objShot].delay));
            var shotLimit = parseInt(compileSintax(elements_shot[objShot].limit));
            var objTemp = elements_shot[objShot];
            var objClass = objTemp.name;

            if (objTemp.point == 'self') {
                point = elements_shot[objShot].obj.offset().top;
            } else {
                point = parseInt(compileSintax(objTemp.point));
            }


            if (objTemp.type == 'pin') {

                if (scrollPosY >= point + shotLimit) {
                    if (!objTemp.obj.hasClass(objClass)) {
                        objTemp.obj.addClass(objClass)
                    }
                } else {
                    if (objTemp.obj.hasClass(objClass)) {
                        objTemp.obj.removeClass(objClass)
                    }
                }

            } else {
                if ((scrollPosY + $screenHeight) >= point + shotLimit) {

                    if (objTemp.type == 'addClass') {
                        addShotClass(objTemp, objClass, shotDelay);
                    } else if (objTemp.type == 'removeClass') {
                        removeShotClass(objTemp, objClass, shotDelay);
                    } else {
                        shotCallFunction(objTemp, objClass, shotDelay);
                    }

                    delete elements_shot[objShot];
                }
            }


        }

        activeMenu = null;
        for (objMenu in elements_menu) {
            var point = 0;
            var menuLimit = parseInt(compileSintax(elements_menu[objMenu].limit));
            point = $(elements_menu[objMenu].target).offset().top;
            if ((scrollPosY ) >= point - menuLimit) {
                activeMenu = elements_menu[objMenu];
            }
        }

        if (activeMenu) {
            if (activeMenu != activeMenuOld) {
                if (activeMenuOld) {
                    activeMenuOld.obj.removeClass(activeMenuOld.class);
                }
                activeMenu.obj.addClass(activeMenu.class);
                activeMenuOld = activeMenu;
                activeMenu = null
            }
        } else {
            if (activeMenuOld) {
                activeMenuOld.obj.removeClass(activeMenuOld.class);
                activeMenuOld = null;
            }
        }


        for (obj in elements) {

            var objeto = elements[obj].obj;
            var target = elements[obj].target;
            var porcIni = elements[obj].porc[0];
            var porcEnd = elements[obj].porc[1];
            var varElementInit = elements[obj].vars[0];
            var varElementEnd = elements[obj].vars[1];
            var variantIni = (compileSintax(varElementInit));
            var variantEnd = (compileSintax(varElementEnd));
            var prefix = elements[obj].prefix;
            var tipo = elements[obj].typevar;
            var topLimit = elements[obj].toplimit;
            var bottomLimit = elements[obj].bottomlimit;
            var debug = elements[obj].debug;
            var idObjeto = elements[obj].idobj;

            if (elements[obj].parent) {
                var parent = $(elements[obj].parent);
                $parentWidth = parent.width();
                $parentWidthIn = parent.innerWidth();
                $parentHeight = parent.height();
                $parentHeightIn = parent.innerHeight();
            };


            if (tipo == '') {
                if (varElementInit.indexOf("px") > 0) {
                    tipo = 'px';
                } else if (varElementInit.indexOf("%") > 0) {
                    tipo = '%';
                }
            }

            var objLimitTop = 0;
            if (topLimit != '') {
                if (!isNaN(topLimit)) {
                    objLimitTop = topLimit;
                } else {
                    if (topLimit == 'true') {
                        objLimitTop = screenHeight;
                    }
                }
            }
            ;

            var objLimitBottom = 0;
            if (bottomLimit != '') {
                if (!isNaN(bottomLimit)) {
                    objLimitBottom = bottomLimit;
                } else {
                    if (bottomLimit == 'true') {
                        objLimitBottom = screenHeight;
                    }
                }
            }
            ;


            var objHeight, objXinit, objXend, difInit, difEnd, porc;

            if (elements[obj].parent) {
                if (parent.offset()) {
                    objHeight = parent.outerHeight();
                    objXinit = parent.offset().top - objLimitTop;// screenHeight;

                    difInit = scrollPosY - objXinit;
                } else {
                    console.log('Não foi possível detectar o parent ' + elements[obj].parent);
                }


            } else {
                objHeight = objeto.outerHeight();
                objXinit = objeto.offset().top - objLimitTop;
                difInit = scrollPosY - objXinit;

            }
            difEnd = objHeight + Number(objLimitTop) - Number(objLimitBottom);
            porc = (difInit * 100) / difEnd;

            if (porc <= porcIni) {
                valorfinal = variantIni;
            }
            if (porc >= 0 && porc <= 100) {

                if ((porc >= porcIni) && (porc <= porcEnd)) {
                    var newporc = porc - porcIni;
                    var valorfinal = variantIni + (((variantEnd - variantIni) * newporc) / (porcEnd - porcIni));
                }


            }
            if (porc >= porcEnd) {
                valorfinal = variantEnd;
            }


            var itens = target.split(",");
            var sintaxCss = {};
            for (var x = 0; x < itens.length; x++) {


                if (objeto.css(itens[x]) != (valorfinal) + tipo) {
                    sintaxCss[itens[x]] = prefix + (valorfinal) + tipo;
                    objeto.css(itens[x], prefix + (valorfinal) + tipo);
                }
            }

            if (debug) {
                $('#debugtop_obj' + idObjeto).css('top', objXinit + 'px');
                $('#debugbottom_obj' + idObjeto).css('top', (objXinit + difEnd) + 'px');

            }


        }
    }


    this.mount = function () {


        $('[data-war-shot]').each(function () {
            var element = $(this);
            var dados = JSON.parse(Jsoncorrect(element.data('war-shot')));
            var limit = 0;
            var delay = 0;
            var type = 'addClass';

            if (dados.limit) {
                limit = dados.limit;
            }
            if (dados.type) {
                type = dados.type;
            }
            if (dados.delay) {
                delay = dados.delay;
            }

            var objeto = {};
            if(typeof type == 'object'){
                for(var item in type){
                    objeto = {
                        'obj': element,
                        'name': type[item],
                        'point': dados.point,
                        'limit': limit,
                        'delay': delay,
                        'type': item
                    };
                    elements_shot['obj' + objid] = objeto;
                    objid++;
                }

            } else {
                objeto = {
                    'obj': element,
                    'name': dados.name,
                    'point': dados.point,
                    'limit': limit,
                    'delay': delay,
                    'type': type
                };
                elements_shot['obj' + objid] = objeto;
                objid++;
            }

            screenResize();
        });


        $('[data-war-menu]').each(function () {
            var element = $(this);
            var dados = JSON.parse(Jsoncorrect(element.data('war-menu')));
            var limit = 0;
            var limitMove = 0;
            var classname = 'active';
            if (dados.limit) {
                limit = dados.limit;
            }
            if (dados.limitMove) {
                limitMove = dados.limitMove;
            }

            if (dados.class) {
                classname = dados.class;
            }
            var objeto = {
                'obj': element,
                'class': classname,
                'target': dados.target,
                'limit': limit,
                'limitMove': limitMove
            };
            if ($(this).attr("href")) {
                element.attr('href', 'javascript:void(0)');
            }
            element.on('click', function () {
                moveTo(dados.target, limitMove);
            })
            elements_menu['obj' + objid] = objeto;
            objid++;
            screenResize();


        });


        $('[data-war-size]').each(function () {
            var element = $(this);
            var dados = JSON.parse(Jsoncorrect(element.data('war-size')));
            var objeto = {
                'obj': element,
                'height': dados.height,
                'width': dados.width,
                'limitH': dados.limitH,
                'limitW': dados.limitW
            };
            elements_size['obj' + objid] = objeto;
            objid++;
            screenResize();
        });


        $('[data-war]').each(function () {

            var element = $(this);
            var dados = JSON.parse(Jsoncorrect(element.data('war')));
            var parent = dados.parent;
            var toplimit = false;
            var bottomlimit = false;
            var typvar = '';
            var prefix = '';
            var debug = false;


            if (dados.toplimit) {
                toplimit = dados.toplimit;
            }
            if (dados.bottomlimit) {
                bottomlimit = dados.bottomlimit;
            }

            if (dados.debug) {
                debug = dados.debug;
            }


            if ($.isArray(dados.animate[0])) {
                for (var i = 0; i < dados.animate.length; i++) {
                    if (dados.animate[i][3]) {
                        typvar = dados.animate[i][3];
                    }
                    if (dados.animate[i][4]) {
                        prefix = dados.animate[i][4];
                    }
                    addElementInArray(element, dados.animate[i][0], dados.animate[i][1], dados.animate[i][2], parent, toplimit, bottomlimit, typvar, prefix, debug);
                }
            } else {
                if (dados.animate[3]) {
                    typvar = dados.animate[3];
                }
                if (dados.animate[4]) {
                    prefix = dados.animate[4];
                }
                addElementInArray(element, dados.animate[0], dados.animate[1], dados.animate[2], parent, toplimit, bottomlimit, typvar, prefix, debug);
            }

            if (debug) {
                var objDataName = element.data('war-name');
                $('body').prepend('<div id="debugtop_' + objDataName + '" style="z-index:999; font-family:Arial;font-size: 12px; position: absolute; top: 10px; right: 10px;color: red;border-bottom: 1px solid red;    margin-top: -14px;">Limit Top - ' + objDataName + '</div>')
                //  $('body').prepend('<div id="debugtrigger_' + element.data('war-name') +'" style="z-index:999; font-family:Arial;font-size: 12px; position: absolute; top: 20px; right: 10px;color: blue;border-bottom: 1px solid blue;">Trigger</div>')
                $('body').prepend('<div id="debugbottom_' + objDataName + '" style="z-index:999; font-family:Arial;font-size: 12px; position: absolute; top: 30px; right: 10px;color: green;border-bottom: 1px solid green;    margin-top: -14px;">Limit Bottom - ' + objDataName + '</div>')
            }

        });
        render();
    };

    function addElementInArray(obj, target, porc, variant, parent, toplimit, bottomlimit, typevar, prefix, debug) {
        var objeto = {
            'obj': obj,
            'idobj': objid,
            'target': target,
            'porc': porc,
            'vars': variant,
            'parent': parent,
            'toplimit': toplimit,
            'bottomlimit': bottomlimit,
            'typevar': typevar,
            'prefix': prefix,
            'debug': debug
        };


        obj.attr('data-war-name', 'obj' + objid);
        elements['obj' + objid] = objeto;
        objid++;
    }


    function Jsoncorrect(str) {
        return str
            .replace(/([\$\w]+)\s*:/g, function (_, $1) {
                return '"' + $1 + '":'
            })
            .replace(/'([^']+)'/g, function (_, $1) {
                return '"' + $1 + '"'
            })
    }

    function compileSintax(sintax) {
        try {
            return eval(sintax);
        } catch (e) {
            return sintax;
        }
    }

    function moveTo(idpage, limitMove) {

        $('html, body').animate({scrollTop: $(idpage).offset().top - limitMove}, 1000);
    }

    this.moveTo = function (idpage, limitMove) {
        moveTo(idpage, limitMove);
    }

}