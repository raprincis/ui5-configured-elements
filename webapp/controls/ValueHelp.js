sap.ui.define(
    ["sap/ui/comp/valuehelpdialog/ValueHelpDialog"],
    (ValueHelpDialog) => {

        /**
         * @type {ValueHelpConfiguration}
         */
        const oDefaultConfiguration = {}

        const oConfiguredVh = {
            metadata: {
                properties: {
                    configuration: {
                        type: "object",
                        defaultValue: {}
                    }
                }
            },

            init() {
                this.applySettings({
                    configuration: oDefaultConfiguration
                })
                ValueHelpDialog.prototype.init.apply(this, arguments)
                this
                    .attachEvent("_change", this._onPropertyChange, this)
                .attachOk(this._onOk, this)
                .attachCancel(this._onCancel, this)
            },

            /**
             * 
             * @param {sap.ui.base.Event} oEvent 
             */
            _onPropertyChange(oEvent) {
                /** @type {{ name : 'configuration'}} */
                const {name, newValue} = oEvent.getParameters()

                if(name === 'configuration') {
                    this._applyConfiguration(newValue)
                }
            },

            _onOk() {
                this.close()
            },

            _onCancel() {
                this.close()
            },

            /**
             * 
             * @param {ValueHelpConfiguration} oConfiguration 
             */
            async _applyConfiguration(oConfiguration) {

            },

            renderer: {
                apiVarsion: 2
            }
        }

        return ValueHelpDialog.extend("com.raprincis.demo.controls.ValueHelp", oConfiguredVh)
    })