require.def("davros/appui/components/main",
        [
            "antie/widgets/component",
            "antie/widgets/label",
            "antie/widgets/button",
            "antie/widgets/image",
            "antie/events/keyevent",
            "antie/videosource",
            "antie/widgets/media",
        ],
        function (Component, Label, Button, Image, KeyEvent, VideoSource, Media) {

            return Component.extend({
                init: function() {
                    var self, titleLabel, controlsLabel, dalekImage, remoteImage;

                    self = this;
                    
                    this._super("maincomponent");

                    titleLabel = new Label("titleLabel", "Dalek Video Remote Operating System");
                    this.appendChildWidget(new Image("dalek", "static/images/dalek.png", "100x200"));
                    this.appendChildWidget(titleLabel);

                    var back = new Button('back');
                    back.addEventListener('select', function(evt) {
                        self.getCurrentApplication().getDevice().loadURL("http://192.168.69.207/exterminate.html", {
                            onLoad: function(a) {
                                // We don't care
                                return;
                            },
                            onError: function(b) {
                                // We care even less
                                return;
                            }
                        });

                    });
                    back.addEventListener('keydown', function(evt) {
                        if (evt.keyCode == KeyEvent.VK_UP) {
                            self.getCurrentApplication().getDevice().loadURL("http://192.168.69.207/up.html", {
                                onLoad: function(a) {
                                    // We don't care
                                    return;
                                },
                                onError: function(b) {
                                    // We care even less
                                    return;
                                }
                            });
                        } else if (evt.keyCode == KeyEvent.VK_LEFT) {
                            self.getCurrentApplication().getDevice().loadURL("http://192.168.69.207/left.html", {
                                onLoad: function(a) {
                                    // We don't care
                                    return;
                                },
                                onError: function(b) {
                                    // We care even less
                                    return;
                                }
                            });
                        } else if (evt.keyCode == KeyEvent.VK_RIGHT) {
                            self.getCurrentApplication().getDevice().loadURL("http://192.168.69.207/right.html", {
                                onLoad: function(a) {
                                    // We don't care
                                    return;
                                },
                                onError: function(b) {
                                    // We care even less
                                    return;
                                }
                            });
                        } else if (evt.keyCode == KeyEvent.VK_BACK) {
                            self.getCurrentApplication().getDevice().exitToBroadcast();
                        }
                    });

                    this.appendChildWidget(back);
                    back.appendChildWidget(new Label('BACKLabel', "Back"));

                    controlsLabel = new Label("controlsLabel", "Use the navigation buttons for movement. Use the Select or Enter button to exterminate target");
                   this.appendChildWidget(controlsLabel);



                    this.addEventListener("beforerender", function (evt) {
                        self._onBeforeRender(evt);
                    });

                    this.addEventListener("aftershow", function appReady(evt) {
                        self.getCurrentApplication().ready();
                        self.removeEventListener('aftershow', appReady);
                    });
            },
            _onBeforeRender: function () {
                var videoUrl = "http://192.168.69.207/HackedIO/Dalek-TAL/video.mp4";
                var videoType = "video/mp4";

                // Create the device's video object, set the media sources and start loading the media
                var player = this.createVideoPlayer();
                player.setSources([new VideoSource(videoUrl, videoType)]);
                player.load();
            },
            getPlayer: function() {
                return this._player;
            },
            destroyPlayer: function() {
                this._player.destroy();
                this.removeChildWidget(this._player);
                this._player = null;
            },
            createVideoPlayer: function() {
                var self = this;

                // Create the player and append it to the component
                this._player = this.getCurrentApplication().getDevice().createPlayer('testPlayer', 'video');
                this.appendChildWidget(this._player);

                // Start playing the video as soon as the device fires an antie 'canplay' event
                this._player.addEventListener('canplay', function(evt) {
                    // Some devices have the player in the background behind the HTML page, we need to ensure the
                    // document body is transparent in order to see the video content
                    if (self.getCurrentApplication().getDevice().getPlayerEmbedMode() === Media.EMBED_MODE_BACKGROUND) {
                        self.hideBackground();
                    }

                    // Start playing the media
                    self._player.play();
                });
                return this._player;
           }
        });
    });
