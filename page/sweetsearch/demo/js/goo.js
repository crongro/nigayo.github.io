            if (!(b.indexOf("key") || a.ctrlKey || a.altKey || a.shiftKey || a.metaKey))
                a: if (a = a.keyCode,
                "keypress" != b) {
                    var c = 38 == a || 40 == a, d;
                    if ("keydown" == b) {
                        d = this.ma;
                        var e = 229 == a;
                        (d.Ua = e) && d.Na.add(4);
                        if (c)
                            break a
                    } else if (d = a != this.pb,
                    this.pb = -1,
                    !c || d)
                        break a;
                    switch (a) {
                    case 27:
                        a = this.ma;
                        a.Aa.jI ? a.search(5) : (a.oa.Af() ? a.oa.hf() : a.Ga(),
                        QS_Oxa(a));
                        break;
                    case 37:
                        QS_Qxa(this.ma, "rtl");
                        break;
                    case 39:
                        QS_Qxa(this.ma, "ltr");
                        break;
                    case 38:
                        this.ma.oa.kea();
                        break;
                    case 40:
                        a = this.ma;
                        c = this.ra;
                        QS_IL(a.oa) ? a.oa.jea() : QS_Lxa(a.oa, c);
                        break;
                    case 46:
                        a = this.ma;
                        a.$ && this.ra.Lw() == a.$.length && (a.Hb && a.Hb.clear(),
                        a.Aa.zq && a.search(2),
                        a.wa.xo(a.$));
                        break;
                    case 8:
                        a = this.ma,
                        a.Pa && 0 == this.ra.getPosition() && a.Pa.Gu()
                    }
                }

                //
                e.keyCode as well as e.which works with keypress
                //or
                var keycode = (event.keyCode ? event.keyCode : event.which);
                if(keycode == '13') { 

