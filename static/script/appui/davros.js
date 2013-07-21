require.def('davros/appui/davros',
        [
            'antie/application',
            'antie/widgets/container'
        ],
        function(Application, Container) {

            return Application.extend({
                init: function(appDiv, styleDir, imgDir, callback) {
                        var self;
                        self = this;
                        self._super(appDiv, styleDir, imgDir, callback);

                        self._setRootContainer = function() {
                            var container = new Container();
                            container.outputElement = appDiv;
                            self.setRootWidget(container);
                        };
                },
                run: function() {
                    this._setRootContainer();
                    this.addComponentContainer("maincontainer", "davros/appui/components/main");
                }
        });
    }
);
 
