sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/raprincis/demo/controls/ValueHelp"
], (Controller, ConfiguredValueHelp) => {
    "use strict";

    /** @type {ValueHelpConfiguration} */
    const CustomerVhConfiguration = {
        "binding" : {
            "path": "/Customers"
        }
    }

    const oHomeController = {



        _oCustomerValueHelp : null,

        onInit() {
            this._oCustomerValueHelp = new ConfiguredValueHelp({
                configuration : CustomerVhConfiguration
            })
        },

        onValueHelpRequested() {
            this._oCustomerValueHelp.open()
        }
    };
    return Controller.extend("com.raprincis.demo.controller.Home", oHomeController);
});