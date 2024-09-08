class MY_Gallery {

    constructor(options) {
        this.options = options;
        this.gallery = document.getElementById(options.galleryId);
        this.w = window.innerWidth;
        this.h = window.innerHeight;
        this.modalShow = false;
        this.numberOfPage = options.noInEachPage;
        this.currentPage = 1;
        this.totalPage = Math.ceil(this.options.data.length / options.noInEachPage);
        this.shareBtnShow = false;


        this.modifyDiv();
        this.createInsideDiv();
        for (let i = 1; i <= this.totalPage; i++) {
            this.createPages(i);
        }
        this.createModalShow();
        this.fadeOtherPage();
    }

    modifyDiv() {

        this.gallery.style.width = "100%";
        this.gallery.style.height = this.h + "px";
        this.gallery.style.position = "relative";
        this.gallery.style.top = "0"
        this.gallery.style.left = "0"


    }
    createInsideDiv() {
        this.insideDiv = document.createElement("div")
        this.insideDiv.style.position = "absolute";
        this.insideDiv.style.top = "50%";
        this.insideDiv.style.left = "50%";
        this.insideDiv.style.transform = "translate(-50%, -50%)";
        this.insideDiv.style.width = (this.w * 0.9) + "px";
        this.insideDiv.style.height = (this.h * 0.9) + "px";
        this.insideDiv.style.background = "rgba(0,0,0,0.5)";
        this.insideDiv.style.overflow = "hidden";
        this.insideDiv.style.borderRadius = "15px";

        this.bubble = document.createElement("div");
        this.bubble.style.width = (this.w - 20) + "px";
        this.bubble.style.height = "20px";
        this.bubble.style.position = "absolute";
        this.bubble.style.bottom = "0";
        this.bubble.style.left = "50%";
        this.bubble.style.transform = "translate(-50%, -50%)";
        this.bubble.style.display = "flex";

        this.bubble.style.flexDirection = "row";
        this.bubble.style.alignContent = "center";
        this.bubble.style.alignItems = "center";
        this.bubble.style.justifyContent = "center";
        this.bubble.style.zIndex = 99;
        this.refreshBubble();
        this.gallery.appendChild(this.bubble);
        this.gallery.appendChild(this.insideDiv);
    }

    createPages(i) {

        var page = document.createElement("div");
        page.style.position = "absolute";
        page.style.top = "50%";
        page.style.left = "50%";
        page.style.transform = "translate(-50%, -50%)";
        page.style.width = (this.w * 0.9) + "px";
        page.style.height = (this.h * 0.9) + "px";
        page.style.display = "flex";
        page.style.flexDirection = "row";
        page.style.justifyContent = "around";
        page.style.flexWrap = "wrap";
        page.style.alignItems = "center";
        page.style.background = "rgba(0,0,0,0.5)";
        page.style.borderRadius = "15px";

        page.style.zIndex = 99;

        page.id = "MY_Gallery_page_" + i;
        page.setAttribute("pageNumber", i)

        this.insideDiv.appendChild(page);
        for (let j = i * this.options.noInEachPage - this.options.noInEachPage; j < i * this.options.noInEachPage; j++) {
            if (j < this.options.data.length) {
                var pic = this.createPic(j);
                page.appendChild(pic);
            }


        }


    }
    createPic(i) {
        var self = this;
        var pic = document.createElement("img");
        pic.src = this.options.data[i].tempSrc;
        pic.style.width = ((this.w * 0.9 / this.options.columnNo) - 20) + "px";
        pic.style.height = ((this.h * 0.9 / this.options.rowNo) - 20) + "px";
        pic.style.margin = "10px";
        pic.style.borderRadius = "10px";
        pic.style.cursor = "pointer";

        pic.onclick = function(e) {
            self.modalShow = true;
            self.myModal.style.display = "";
            self.modalPic.src = self.options.data[i].src;
            self.myModal.animate([
                { opacity: 0, transform: "scale(0)", },
                { opacity: 1, transform: "scale(1)", }
            ], {
                duration: 500,
                fill: "forwards"

            });

            document.getElementById("Gallery_Show_A_1").href = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(self.options.data[i].src)}`
            document.getElementById("Gallery_Show_A_2").href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(self.options.data[i].src)}`
            document.getElementById("Gallery_Show_A_4").href = `https://twitter.com/share?url=${encodeURIComponent(self.options.data[i].src)}`
            document.getElementById("Gallery_Show_A_5").href = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(self.options.data[i].src)}`
            document.getElementById("Gallery_Show_A_3").href = `https://api.whatsapp.com/send?text=${encodeURIComponent(self.options.data[i].src)}`
            document.getElementById("Gallery_Show_A_6").href = self.options.data[i].src
            document.getElementById("Gallery_Show_A_6").setAttribute("download", "true")


        }

        return pic;
    }

    fadeOtherPage() {

        for (let i = 1; i <= this.totalPage; i++) {

            if (i == this.currentPage) {
                document.getElementById("MY_Gallery_page_" + i).style.opacity = 1;
                document.getElementById("MY_Gallery_page_" + i).style.display = "flex";

            } else {
                var page = document.getElementById("MY_Gallery_page_" + i);
                page.style.opacity = 0;
                page.style.display = "none";
            }

        }
    }
    refreshBubble() {
        this.bubble.innerHTML = "";
        for (let i = 1; i <= this.totalPage; i++) {
            var self = this;
            if (i == this.currentPage) {
                var span = document.createElement("span");
                span.style.width = "15px";
                span.style.height = "15px";
                span.style.borderRadius = "50%";
                span.style.background = "#fff";
                span.style.margin = "3px";
                span.setAttribute("PageNumberSpan", i);

                this.bubble.appendChild(span);

            } else {
                var span = document.createElement("span");
                span.style.width = "12px";
                span.style.height = "12px";
                span.style.borderRadius = "50%";
                span.style.border = "solid 3px #fff";
                span.style.margin = "3px";
                span.setAttribute("PageNumberSpan", i);
                span.onclick = function() {
                    self.spanOnClick(i);

                }
                span.style.cursor = "pointer"
                this.bubble.appendChild(span);
            }



        }
    }

    spanOnClick(i) {
        var lastPage = this.currentPage;
        this.currentPage = i;
        this.refreshBubble();
        var self = this;

        if (lastPage < i) {

            document.getElementById("MY_Gallery_page_" + (lastPage)).animate([
                { opacity: 1, transform: "translate( -50%,-50% )", display: "flex" },
                { opacity: 0, transform: "translate( -150%, -50%) scale(0.7)", display: "none" }
            ], {
                duration: 1000,
                iterations: 1,
                fill: "forwards",

            })

            document.getElementById("MY_Gallery_page_" + (i)).animate([
                { opacity: 0, transform: "translate( 150%, -50%) scale(1.2)", display: "none" },
                { opacity: 1, transform: "translate( -50%,-50% )", display: "flex" }

            ], {
                duration: 1000,
                iterations: 1,
                fill: "forwards",

            })
        } else {
            document.getElementById("MY_Gallery_page_" + (lastPage)).animate([
                { opacity: 1, transform: "translate( -50%,-50% )" },
                { opacity: 0, transform: "translate( 150%, -50%) scale(1.2) ", display: "none" }
            ], {
                duration: 1000,
                iterations: 1,
                fill: "forwards",

            })

            document.getElementById("MY_Gallery_page_" + (i)).animate([
                { opacity: 0, transform: "translate( -150%, -50%) scale(0.7) " },
                { opacity: 1, transform: "translate( -50%,-50% )", display: "flex" }

            ], {
                duration: 1000,
                iterations: 1,
                fill: "forwards",

            })
        }
        setTimeout(() => {
            self.fadeOtherPage();
        }, 1000);
    }

    createModalShow() {
        var self = this;

        this.myModal = document.createElement("div");
        this.myModal.id = "Gallery_Show_Modal";
        this.myModal.style.position = "fixed";
        this.myModal.style.top = "0";
        this.myModal.style.left = "0";
        this.myModal.style.width = this.w + "px";
        this.myModal.style.height = this.h + "px";
        this.myModal.style.background = "rgba(0,0,0,0.6)";
        this.myModal.style.display = "none";
        this.myModal.style.zIndex = 1000;

        this.divInsideModal = document.createElement("div");
        this.divInsideModal.id = "Gallery_Show_Modal_Content";
        this.divInsideModal.style.position = "absolute";
        this.divInsideModal.style.top = "50%";
        this.divInsideModal.style.left = "50%";
        this.divInsideModal.style.transform = "translate(-50%,-50%)";
        this.divInsideModal.style.width = "80%";
        this.divInsideModal.style.height = (this.h * 0.8) + "px";
        this.divInsideModal.style.borderRadius = "15px";
        this.divInsideModal.style.zIndex = "101";
        this.divInsideModal.style.background = "rgba(0,0,0,0.85)";
        this.divInsideModal.style.border = "solid 1px rgb(255,255,255) ";


        this.modalPic = document.createElement("img");
        this.modalPic.id = "Gallery_Show_Modal_Img";
        this.modalPic.src = "";
        if (this.w < 540) {
            this.modalPic.style.maxHeight = (this.h * 0.95) + "px";
            this.modalPic.style.width = "95%";
        } else {
            this.modalPic.style.height = "95%";
            this.modalPic.style.maxWidth = (this.w * 0.95) + "px";
        }

        this.modalPic.style.position = "absolute";
        this.modalPic.style.left = "50%";
        this.modalPic.style.top = "50%";
        this.modalPic.style.transform = "translate(-50%,-50%)";
        this.modalPic.style.zIndex = "102";
        this.modalPic.style.borderRadius = "15px";


        var closBtn = document.createElement("span");
        closBtn.innerHTML = "&times;";
        closBtn.style.position = "absolute";
        closBtn.style.right = "0";
        closBtn.style.top = "0";
        closBtn.style.margin = "10px";
        closBtn.style.color = "#fff";
        closBtn.style.fontWeight = "bold";
        closBtn.style.fontSize = "25px";
        closBtn.style.cursor = "pointer";
        closBtn.style.zIndex = 1001;
        closBtn.style.textShadow = "1px 1px 2px #000, 2px 2px 3px #fff,-1px -1px 2px #000, -2px -2px 3px #fff";
        closBtn.onclick = function(e) {
            self.modalShow = false;
            self.myModal.animate([
                { opacity: 1, transform: "scale(1)" },
                { opacity: 0, transform: "scale(0)" }
            ], {
                duration: 500,
                fill: "forwards"

            })
        }


        var shareBtn = document.createElement("i");
        shareBtn.className = "fas fa-share"
        shareBtn.style.position = "absolute";
        shareBtn.style.right = "20px";
        shareBtn.style.bottom = "20px";
        shareBtn.style.cursor = "pointer";
        shareBtn.style.color = "#FFF";
        shareBtn.style.zIndex = "200";

        var shareDiv = document.createElement("div");
        shareDiv.style.position = "absolute";
        shareDiv.style.bottom = "20px";
        shareDiv.style.right = "20px";


        var a1 = document.createElement("a");
        a1.id = "Gallery_Show_A_1";
        a1.innerHTML = "<i class='fab fa-linkedin' ></i>"

        var a2 = document.createElement("a");
        a2.id = "Gallery_Show_A_2";
        a2.innerHTML = "<i class='fab fa-facebook' ></i>"

        var a3 = document.createElement("a");
        a3.id = "Gallery_Show_A_3";
        a3.innerHTML = "<i class='fab fa-whatsapp' ></i>"

        var a4 = document.createElement("a");
        a4.id = "Gallery_Show_A_4";
        a4.innerHTML = "<i class='fab fa-twitter' ></i>"

        var a5 = document.createElement("a");
        a5.id = "Gallery_Show_A_5";
        a5.innerHTML = "<i class='fab fa-pinterest' ></i>"

        var a6 = document.createElement("a");
        a6.id = "Gallery_Show_A_6";
        a6.innerHTML = "<i class='fas fa-download' ></i>"


        shareDiv.appendChild(a1);
        shareDiv.appendChild(a2);
        shareDiv.appendChild(a3);
        shareDiv.appendChild(a4);
        shareDiv.appendChild(a5);
        shareDiv.appendChild(a6);

        this.divInsideModal.appendChild(this.modalPic);
        this.divInsideModal.appendChild(closBtn);
        this.divInsideModal.appendChild(shareBtn);
        this.divInsideModal.appendChild(shareDiv);

        this.myModal.appendChild(this.divInsideModal);

        this.gallery.appendChild(this.myModal);



        for (let i = 1; i <= 6; i++) {
            var el = document.getElementById("Gallery_Show_A_" + i);
            el.style.color = "#fff";
            el.style.fontSize = "24px";
            el.style.position = "absolute";
            el.style.bottom = "0";
            el.style.right = "0";
            el.style.opacity = "0";
            el.style.textShadow = "1px 1px 2px #000, -1px -1px 2px #000";
            el.style.zIndex = 199;
            el.setAttribute("target", "_blank");

        }

        shareBtn.onclick = function(e) {

            var animationOption = {
                duration: 1000,
                fill: "forwards",
                easing: "ease-in",
            }

            if (!self.shareBtnShow) {
                for (let i = 1; i <= 6; i++) {
                    document.getElementById("Gallery_Show_A_" + i).animate([
                        { transform: "translateY(0px) rotateZ(0deg)", opacity: 0 },
                        { transform: "translateY(-" + (35 * i) + "px) rotateZ(360deg)", opacity: 1 }
                    ], animationOption)

                }

                self.shareBtnShow = true;
            } else {
                for (let i = 1; i <= 6; i++) {
                    document.getElementById("Gallery_Show_A_" + i).animate([

                        { transform: "translateY(-" + (35 * i) + "px) rotateZ(360deg)", opacity: 1 },
                        { transform: "translateY(0px) rotateZ(0deg)", opacity: 0 },
                    ], animationOption)

                }
                self.shareBtnShow = false;
            }


        }

    }


}