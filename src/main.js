(function(){  
    xtag.register('x-flashinfo', {
        lifecycle: {
            inserted: function inserted() {
                this.innerHTML = '<div id="flash" class="wrapped"><div class="alert-message"><a class="close cursor-pointer">x</a><span class="alert-message-content"></span></div></div>';
            },
            removed: function removed() {
                this.setAttribute('hidden', '');
            }
        },
        methods: {
            show: function(flashModel) {
                this._cancelHide = true;
                this.setAttribute('type', flashModel.type);
                this.querySelector('.alert-message').className = 'alert-message ' + flashModel.type;
                this.querySelector('.alert-message-content').innerHTML = flashModel.message;
                this.removeAttribute('hidden');
                this.removeAttribute('style');

                if (flashModel.isSuccess()) {
                    this.hide();
                }
            },
            hide: function(now) {
                this._cancelHide = false;
                if (now) {
                    this.setAttribute('hidden', '');
                    this.classList.remove(this.getAttribute('type'));
                } else {
                    this.animateHide();
                }
            },
            animateHide: function() {
                var flashInfo = this;
                setTimeout(function() {
                    flashInfo.style.opacity = 1;
                    // Animation sur 2s
                    var opacity = 1;
                    var interval = setInterval(function() {
                        if (flashInfo._cancelHide) {
                            clearInterval(interval);
                            flashInfo.style.opacity = 1;
                        } else {
                            opacity -= 0.12;
                            flashInfo.style.opacity = opacity;
                            if (opacity <= 0) {
                                clearInterval(interval);
                                flashInfo.setAttribute('hidden', '');
                                flashInfo.classList.remove(flashInfo.getAttribute('type'));
                            }
                        }
                    }, 250);
                }, 2000);
            }
        },
        events: {
            'click:delegate(.close)': function(e) {
                //BUGFIX Pour éviter le rechargement de la page (action par défaut du navigateur sur lien HTML)
                e.preventDefault();
                var flashInfo = this.parentNode.parentNode.parentNode;
                flashInfo.hide(true);
            }
        }
    });
})();
