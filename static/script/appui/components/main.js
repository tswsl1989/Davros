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
	function (Component, Label, Button, Image, KeyEvent, VideoSource, Media) { return Component.extend({
		init: function () {
			var self, titleLabel, controlsLabel, dalekImage, remoteImage;
			var server = "http://192.168.69.191:81/";

			self = this;
			this._super("maincomponent");
			titleLabel = new Label("titleLabel", "Dalek Video Remote Operating System");
			var dalek = new Image("dalek", "static/images/dalek.png", "100x200");
			this.appendChildWidget(dalek);
			this.appendChildWidget(titleLabel);
			var back = new Button('back');
			back.addEventListener('select', function (evt) {
				dalek.setSrc('static/images/dalek-glow.png');
				window.setTimeout(function () {
					dalek.setSrc('static/images/dalek.png');
					}, 500);
				self.getCurrentApplication().getDevice().loadURL(server + "exterminate", {
					onLoad:	function (a) {
						// We don't care about the response
						return;
					},
					onError: function (b) {
						// We care even less
						return;
					}
				});
			});
			back.addEventListener('keydown', function (evt) {
				if (evt.keyCode == KeyEvent. VK_UP) {
					dalek.setSrc('static/images/dalek-glow.png');
					window.setTimeout(function () {
						dalek.setSrc('static/images/dalek.png');
					}, 500);
					self.getCurrentApplication().getDevice ().loadURL (server + "forward", {
						onLoad:	function (a) {
							// We don't care
							return;
						},
						onError: function (b) {
							// We care even less
							return;
						}
					});
				} else if (evt.keyCode == KeyEvent.VK_LEFT) {
					dalek.setSrc('static/images/dalek-glow.png');
					window.setTimeout(function () {
						dalek.setSrc('static/images/dalek.png');
					}, 500);
					self.getCurrentApplication().getDevice().loadURL(server + "left", {
						onLoad:	function (a) {
							return;
						},
						onError: function (b){
							return;
						}
					});
				} else if (evt.keyCode == KeyEvent.VK_RIGHT) {
					dalek.setSrc('static/images/dalek-glow.png');
					window.setTimeout(function () {
						dalek.setSrc('static/images/dalek.png');
					}, 500);
					self.getCurrentApplication().getDevice().loadURL(server + "right", {
						onLoad:	function (a) {
							return;
						},
						onError: function (b){
							return;
						}
					});
				} else if (evt.keyCode == KeyEvent.VK_DOWN) {
					dalek.setSrc('static/images/dalek-glow.png');
					window.setTimeout(function () {
						dalek.setSrc('static/images/dalek.png');
					}, 500);
					self.getCurrentApplication().getDevice().loadURL (server + "180", {
						onLoad: function (a) {
							return;
						},
						onError: function (b) {
							return;
						}
					});
				} else if (evt.keyCode == KeyEvent.VK_BACK) {
					self.getCurrentApplication().getDevice().exitToBroadcast();
				}
			});
			this.appendChildWidget(back);
			back.appendChildWidget(new Label ('BACKLabel', "Back"));
			this.addEventListener ("beforerender", function (evt) {
				self._onBeforeRender(evt);
			});
			var tpIm = new Image ("testPlayer", server + "grab.jpeg", "768x576");
			this.appendChildWidget (tpIm);
			window.setInterval (function () {
				tpIm.setSrc (server + "grab.jpeg?" + Date.now ());
			}, 1000);
			this.addEventListener ("aftershow", function appReady(evt) {
				self.getCurrentApplication().ready();
				self.removeEventListener('aftershow', appReady);}
			);
		},
		_onBeforeRender: function () {
			return;
		},
	});
});
