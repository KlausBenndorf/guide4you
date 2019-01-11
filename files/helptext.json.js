// As the webpack loader's exec method is broken we need to do plain ES5 here

module.exports = {
  'de': {
    'arrowButtons': {
      'img': 'arrowbuttons.png',
      'descr': [
        'Mit diesem Element verschieben Sie die Karte in Richtung der Spitze des jeweiligen Drei&shy;ecks.',
        'Mit der mittleren Schalt&shy;fl&auml;che kehren Sie zur Ausgangs&shy;position der Karte zur&uuml;ck.',
        'Sie k&ouml;nnen die Karte auch verschieben, indem Sie sie bei gedr&uuml;ckter Maus&shy;taste ziehen.',
        'Dar&uuml;ber hinaus k&ouml;nnen Sie die Karte mit den Pfeiltasten der Tastatur verschieben.'
      ]
    },
    'zoom': {
      'img': 'zoom.png',
      'descr': [
        'Mit diesem Element &auml;ndern Sie den Ma&szlig;&shy;stab der Karte. Klicken Sie auf "+" zum Vergr&ouml;&szlig;ern und auf "-" zum Verkleinern.',
        'Sie k&ouml;nnen alternativ den Regler in die entsprechende Richtung verschieben oder (sofern vorhanden) das Scroll&shy;rad der Maus benutzen. Dar&uuml;ber hinaus kann die Karte mit einem Doppel&shy;klick vergr&ouml;&szlig;ert werden.',
        'Dar&uuml;ber hinaus k&ouml;nnen Sie auf der Tastatur "+" zum Vergr&ouml;&szlig;ern und "-" zum Verkleinern verwenden.'
      ]
    },
    'layerMenu': {
      'img': [
        'layerselector-de.png',
        'layermenu-mobile.png'
      ],
      'joinWith': ' &nbsp; ',
      'descr': [
        'Mit diesem Element w&auml;hlen Sie die das anzuzeigende Kartenmaterial aus.',
        'Unter <strong>Karten</strong> w&auml;hlen Sie die Basis&shy;karte aus, indem Sie den Namen der gew&uuml;nschten Karte anklicken.',
        'Unter <strong>Infos</strong> w&auml;hlen Sie zus&auml;tzlich anzuzeigende Informationen aus. Klicken Sie auf den Namen der jeweiligen Information, um sie anzuzeigen oder auszublenden.',
        'Die aktive Basis&shy;karte und die aktiven Zusatz&shy;informationen werden farblich hervorgehoben.',
        'Klicken Sie auf das Dreiecks&shy;symbol vor <strong>Karten</strong> oder <strong>Infos,</strong> um die entsprechenden Men&uuml;s ein- oder auszuklappen.'
      ]
    },
    'linkGeneratorButton': {
      'img': ['button-link.png'],
      'descr': ['Mit dieser Schalt&shy;fl&auml;che zeigen Sie einen Link (Verweis) auf die aktuell dargestellte Karten&shy;ansicht an.']
    },
    'geolocationButton': {
      'img': [
        'button-geolocation-inactive.png',
        'button-geolocation-active.png'
      ],
      'joinWith': ' &nbsp; ',
      'descr': [
        'Mit dieser Schalt&shy;fl&auml;che zeigen Sie Ihre aktuelle Position an.',
        'Diese Funktion setzt voraus, dass Ihr Browser das Auslesen der Position unterst&uuml;tzt und zul&auml;sst (pr&uuml;fen Sie gegebenen&shy;falls die Sicherheits&shy;einstellungen).',
        'Die linke Abbildung zeigt die Schalt&shy;f&auml;che bei deaktivierter, die rechte Abbildung bei aktivierter Positions&shy;anzeige.'
      ]
    },
    'printButton': {
      'img': 'button-print.png',
      'descr': [
        'Mit dieser Schalt&shy;fl&auml;che drucken Sie die aktuell dargestellte Karten&shy;ansicht aus.',
        'Bitte beachten Sie, dass in diesem Fall ausschlie&szlig;lich die Karte gedruckt wird, w&auml;hrend Sie mit der Druck&shy;funktion Ihres Browsers (meist Strg+P, Ctrl+P, oder Apfel+P) die vollst&auml;ndige Seite drucken.'
      ]
    },
    'languageSwitcherButton': {
      'img': 'button-lang-de.png',
      'descr': 'Mit dieser Schalt&shy;fl&auml;che schalten Sie die Sprache auf Englisch um.'
    },
    'helpButton': {
      'img': 'button-documentation.png',
      'descr': 'Mit dieser Schalt&shy;fl&auml;che zeigen Sie die Onlinehilfe an.'
    },
    'infoButton': {
      'img': 'button-info.png',
      'descr': 'Mit dieser Schalt&shy;fl&auml;che zeigen Sie eine Infoseite an.'
    },
    'linkButton': {
      'img': 'button-home.png',
      'descr': 'Mit dieser Schalt&shy;fl&auml;che zeigen Sie die Startseite an.'
    },
    'distanceMeasurementButton': {
      'img': 'button-line.png',
      'descr': [
        'Mit dieser Schalt&shy;fl&auml;che messen Sie Entfernungen.',
        'Entfernungen werden durch Zeichnen eine Linienzugs gemessen. Durch einen Klick fügen Sie dem Linienzug einen Punkt hinzu, mit einem Doppelklick setzen Sie seinen letzten Punkt.'
      ]
    },
    'areaMeasurementButton': {
      'img': 'button-area.png',
      'descr': [
        'Mit dieser Schalt&shy;fl&auml;che messen Sie Fl&auml;chen.',
        'Fl&auml;chen werden durch Zeichnen eines Polygons gemessen. Durch einen Klick fügen Sie dem Polygon einen Punkt hinzu, mit einem Doppelklick setzen Sie seinen letzten Punkt.'
      ]
    },
    'overviewMap': {
      'img': [
        'overviewmap.png',
        'overviewmap-collapsed.png'
      ],
      'joinWith': '<br>&nbsp;<br>',
      'descr': [
        'Dieses Element zeigt eine &Uuml;bersichts&shy;karte an. Das schwarze Recht&shy;eck stellt den aktuell angezeigten Karten&shy;ausschnitt dar.',
        'Klicken Sie auf das Dreiecks&shy;symbol um die &Uuml;bersichts&shy;karte einzuklappen oder auf die stilisierte Welt&shy;kugel, um die &Uuml;bersicht&shy;skarte auszuklappen.',
        'Die obere Abbildung zeigt die &Uuml;bersichts&shy;karte in ausgeklapptem Zustand, die untere in eingeklapptem Zustand.'
      ]
    },
    'scaleLine': {
      'img': 'scaleline.png',
      'descr': 'Dieses Element zeigt den Ma&szlig;&shy;stab der Karte an.'
    },
    'attribution': {
      'img': [
        'attribution-expanded-de.png',
        'attribution-collapsed.png'
      ],
      'joinWith': '<br>&nbsp;<br>',
      'descr': [
        'Dieses Element zeigt die Quellen&shy;angabe des Karten&shy;materials an. Durch Klicken auf das Info&shy;symbol klappen Sie die Quellen&shy;angabe aus, durch Klicken auf das Dreiecks&shy;symbols klappen Sie sie ein.',
        'Die obere Abbildung zeigt die Quellen&shy;angabe in ausgeklapptem, die untere in eingeklapptem Zustand.'
      ]
    },
    'searchControl': {
      'img': [
        'search-inactive-de.png',
        'search-active.png'
      ],
      'joinWith': '<br>&nbsp;<br>',
      'descr': [
        'Mit diesem Element suchen Sie nach Adressen, Orten, und &Auml;hnlichem. Tippen Sie den Such&shy;begriff in das Such&shy;feld ein.',
        'W&auml;hlen Sie mit der Maus oder den Pfeil&shy;tasten aus den angezeigten Vorschl&auml;gen aus oder geben Sie den Such&shy;begriff vollst&auml;ndig ein. F&uuml;hren Sie die Suche aus, indem Sie die Enter-Taste bet&auml;tigen oder auf das Lupen&shy;symbol klicken.',
        'Die obere Abbildung zeigt die Suche im inaktiven Zustand, die untere mit Vorschl&auml;gen.'
      ]
    }
  },
  // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  'en': {
    'arrowButtons': {
      'img': 'arrowbuttons.png',
      'descr': [
        "Use this button to move the map in the direction indicated by the tip of the triangle you click. Use the central button to return to the map's initial position.",
        'You may also move the map by dragging it while keeping the mouse button pushed.',
        "In addition you can pan the map using the keyboard's arrow keys."
      ]
    },
    'zoom': {
      'img': 'zoom.png',
      'descr': [
        'Use this element to change the map scale. Click "+" to zoom in and "-" to zoom out.',
        'You may alternatively shift the slider in the corresponding direction or (if present) use the mouse wheel. In addition to this you can double-click the map to zoom in.',
        'You can also use the keyboard to zoom in using "+" and to zoom out using "-".'
      ]
    },
    'layerMenu': {
      'img': [
        'layerselector-en.png',
        'layermenu-mobile.png'
      ],
      'descr': [
        'Use this element to select the map to be displayed.',
        'Using the <strong>Maps</strong> section you switch the base map by clicking the name of the map you want.',
        'In the <strong>Information</strong> section you choose additional information to be displayed. Click the name of the information to display or hide it.',
        'The active base map and additional information are being highlighted by means of color.',
        'Click the triangle symbol in front of <strong>Maps</strong> or <strong>Information</strong> to collapse or expand the corresponding menu.'
      ]
    },
    'linkGeneratorButton': {
      'img': ['button-link.png'],
      'descr': ['Use this button to display a link to the current view of the map.']
    },
    'geolocationButton': {
      'img': [
        'button-geolocation-inactive.png',
        'button-geolocation-active.png'
      ],
      'joinWith': ' &nbsp; ',
      'descr': [
        'Use this button to display your current position.',
        'Note that for this to function your browser needs to support and allow fetching your current position (it may be necessary to check the security settings).',
        'The left image shows the button with position display in inactive state, the right one in active state.'
      ]
    },
    'printButton': {
      'img': 'button-print.png',
      'descr': [
        'Use this button to print the current view of the map.',
        "Note that when you use this button, the print solely displays the actual map while the browser's built-in print function (usually available via Strg+P, Ctrl+P, or Apple+P) prints the whole page."
      ]
    },
    'languageSwitcherButton': {
      'img': 'button-lang-en.png',
      'descr': 'Use this button to switch the language to German.'
    },
    'helpButton': {
      'img': 'button-documentation.png',
      'descr': 'Use this button to display the online documentation you are currently reading.'
    },
    'infoButton': {
      'img': 'button-info.png',
      'descr': 'Use this button to display an info page.'
    },
    'linkButton': {
      'img': 'button-home.png',
      'descr': 'Use this button to display the home page.'
    },
    'distanceMeasurementButton': {
      'img': 'button-line.png',
      'descr': [
        'Use this button to measure distances.',
        'You measure distances by drawing a chain of straight lines. A click adds a point to this chain, a double click marks its final point.'
      ]
    },
    'areaMeasurementButton': {
      'img': 'button-area.png',
      'descr': [
        'Use this button to measure areas.',
        'You measure areas by drawing a polygon. A click adds a point to this polygon, a double click marks its final point.'
      ]
    },
    'overviewMap': {
      'img': [
        'overviewmap.png',
        'overviewmap-collapsed.png'
      ],
      'joinWith': '<br>&nbsp;<br>',
      'descr': [
        'This element displays an overview map. The black rectangle indicates the current map section.',
        'Click the triangle symbol to collapse the overview map or the stylized globe to expand the overview map.',
        'The upper image shows the overview map in expanded state, the lower image in collapsed state.'
      ]
    },
    'scaleLine': {
      'img': 'scaleline.png',
      'descr': 'This element displays the map scale.'
    },
    'attribution': {
      'img': [
        'attribution-expanded-en.png',
        'attribution-collapsed.png'
      ],
      'joinWith': '<br>&nbsp;<br>',
      'descr': [
        'This element shows the attribution information of the current map. By clicking the triangle symbol you collapse the attribution, by clicking the info symbol you expand it.',
        'The upper image shows the attribution in expanded state, the lower image in collapsed state.'
      ]
    },
    'searchControl': {
      'img': [
        'search-inactive-en.png',
        'search-active.png'
      ],
      'joinWith': '<br>&nbsp;<br>',
      'descr': [
        'Use this element to search for addresses, places and the like.',
        'Type a search term into the search field. Choose among the suggestions using the mouse or the arrow buttons or enter the full search term. Execute the search by pressing the Enter button or clicking the magnifying glass symbol.',
        'The upper image shows the search in inactive state, the lower image with suggestions being displayed.'
      ]
    }
  },
  'ar': {
    'arrowButtons': {
      'img': 'arrowbuttons.png',
      'descr': [
        'مع هذا العنصر يمكنك نقل البطاقة نحو الأعلى  ',
        'بالضغط على الزر الأوسط تستطيع  العودة إلى نقطة الإِنطلاق من المخطط ',
        'تستطيع  ايضاً تمرير المخطط عن طريق سحبهُ بالماوس',
        'بالأضافة إلى ذلك,يمكنك تحريك المخطط باستخدام مفاتيح الأسهم على لوحة المفاتيح'
      ]
    },
    'zoom': {
      'img': 'zoom.png',
      'descr': [
        'مع هذا العنصر يمكنك تغيير مقياس الخريطة. انقر على "+" للتكبير وعلى "-" للتصغير',
        ".وتستطيع بدلاً من ذلك ايضاً, تحريك شريط التمرير إلى الإِتجاه المطلوب أو (إن وجد) عجلة التمرير ' الماوس ' يمكنك استخدامه ايضاً. وبالإضافة إلى ذلك يمكنك تكبير المخطط بالنقر المزدوج عليه ",
        'وعلاوة على ذلك يمكنك الضغط على الزر "+" للتكبير واستخدام الزر "-" للتصغير'
      ]
    },
    'layerMenu': {
      'img': [
        'layerselector-en.png',
        'layermenu-mobile.png'
      ],
      'descr': [
        'هذا العنصر يتيح لك اختيار الصورة لعرض المخططات ',
        'اسفل <strong>خريطة</strong> اختر حضرتك من فضلك خريطة الاساس, من  خلال النقر على اسم الخريطة المطلوبة ',
        'اسفل <strong>معلومات</strong> ااختر حضرتك لعرض معلومات اضافية. انقر على اسم المعلومات, لإخفائها أو إظهارها',
        'وسيتم إبراز الخريطة الأساسية الفعالة والمعلومات التكميلية',
        ' انقر على رمز المثلت امام <strong>المخطط</strong> او <strong>المعلومات</strong> الى القوائم المقابلة او للاكتشاف '
      ]
    },
    'linkGeneratorButton': {
      'img': ['button-link.png'],
      'descr': ['استخدم هذا الزر لعرض رابط إلى العرض الحالي للخريطة']
    },
    'geolocationButton': {
      'img': [
        'button-geolocation-inactive.png',
        'button-geolocation-active.png'
      ],
      'joinWith': ' &nbsp; ',
      'descr': [
        'مع هذا الزر تستطيع حضرتك عرض موقعك الحالي',
        'تتطلب هذه الميزة أن يكون متصفحك يدعم قراءة الموقف والسماح له (تحقق إذا لزم الأمر من إعدادات الأمان)',
        'الرسم التوضيحي الايسر يظهر لك الزر عند تعطيله, والرسم التوضيحي الايمن يظهر لك موضع المؤشر عند تنشيطه '
      ]
    },
    'printButton': {
      'img': 'button-print.png',
      'descr': [
        'بالنقر على هذا الزر يمكنك طباعة الخريطة المعروضة حاليا',
        'يرجى ملاحظة أنه في هذه الحالة يتم طباعة المخطط فقط أثناء استخدام وظيفة الطباعة من المتصفح (في الحالة Strg + P, Ctrl + P أو ⌘ + P) لطباعة الصفحة كاملة'
      ]
    },
    'languageSwitcherButton': {
      'img': 'button-lang-de.png',
      'descr': ' بالنقر على هذا الزر يمكنك تغيير اللغة '
    },
    'helpButton': {
      'img': 'button-documentation.png',
      'descr': ' بالنقر على هذا الزر يمكنك عرض التعليمات على الانترنت'
    },
    'infoButton': {
      'img': 'button-info.png',
      'descr': '  بالنقر على هذا الزر يمكنك عرض شريط المعلومات'
    },
    'linkButton': {
      'img': 'button-home.png',
      'descr': '  بالنقر على الزر يمكنك عرض الشاشة الرئيسية'
    },
    'distanceMeasurementButton': {
      'img': 'button-line.png',
      'descr': [' قم بالنقر على هذا الزر لقياس المسافات ',
        ' يتم قياس المسافات عن طريق رسم شكل متعدد الخطوط. بالنقر على الوظيفة تتبع بندا ينص، مع مجموعة مزدوجة للنقطة الاخيرة لها '
      ]
    },
    'areaMeasurementButton': {
      'img': 'button-area.png',
      'descr': [
        ' بالنقر على هذا الزر يمكنك قياس المساحة ',
        ' يتم قياس المجالات عن طريق رسم مضلع. بواسطة النقر فوق إضافة نقطة المضلع، انقر نقراً مزدوجاً فوق تعيين له النقطة الأخيرة له'
      ]
    },
    'overviewMap': {
      'img': [
        'overviewmap.png',
        'overviewmap-collapsed.png'
      ],
      'joinWith': '<br>&nbsp;<br>',
      'descr': [
        'يعرض هذا العنصر على بطاقة ملخص. ويمثل مربع أسود في منطقة الخريطة المعروضة حاليا',
        ' انقرعلى رمز المثلث لتشغيل الخريطة أو على شكل الكرة الارضية لاغلاقها ',
        'ويوضح الشكل العلوي للخريطة المصغرة في حالتها غير المطوية، وانخفاضها عند طيها'
      ]
    },
    'scaleLine': {
      'img': 'scaleline.png',
      'descr': ' هذا العنصر يعرض لك حجم الخريطة'

    },
    'attribution': {
      'img': [
        'attribution-expanded-de.png',
        'attribution-collapsed.png'
      ],
      'joinWith': '<br>&nbsp;<br>',
      'descr': [
        ' هذا الملف يظهر لك ذكر مصادر الإقتباس للمخطط عندما تريدين فتحه يجب عليك الضغط على اشارة التعجب . وعندما تقومين بالضغط على رمز المثلث يتم حفظها ',
        ' الرسوم التوضيحية تظهر لك ذكر مصادر الاقتباس او كيفية اغلاقه وفتحه '
      ]
    },
    'searchControl': {
      'img': [
        'search-inactive-ar.png',
        'search-active.png'
      ],
      'joinWith': '<br>&nbsp;<br>',
      'descr': [
        'استخدم هذا العنصر للبحث عن العناوين والأماكن وما شابه ذلك',
        'اكتب عبارة بحث في حقل البحث. اختر من بين الاقتراحات باستخدام الماوس أو أزرار الأسهم أو أدخل عبارة البحث بالكامل. قم بتنفيذ البحث عن طريق الضغط على زر إنتر أو النقر فوق رمز العدسة المكبرة.',
        'تظهر الصورة العليا البحث في حالة غير نشطة، الصورة السفلى مع الاقتراحات التي يتم عرضها.'
      ]
    }
  }
}
