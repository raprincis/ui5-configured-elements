sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/raprincis/demo/controls/ValueHelp",
    "sap/ui/model/json/JSONModel"
], (Controller, ConfiguredValueHelp, JSONModel) => {
    "use strict";

    
    const MODEL_NAME = {
        ORDER: "order",
        CONFIGURATIONS: "configurations"
    }

    const oHomeController = {



        _oCustomerValueHelp: null,

        onInit() {
            this._createViewModel(MODEL_NAME.ORDER, {
                CustomerId: ''
            })
            this.getView().bindElement({ model : MODEL_NAME.CONFIGURATIONS, path : '/' })
        },

        onCustomerIdSelected(oEvent) {
            this._setViewModelData(MODEL_NAME.ORDER, oOrder => ({
                ...oOrder,
                CustomerId: oEvent.getParameter("tokens")[0].getProperty("key")
            }))
        },

        onCustomerHelpRequested() {
            this.byId("idVhCustomerId").open()
        },

        onEmployeeHelpRequested() {
            this.byId("idVhEmployeeId").open()
        },

        _createViewModel(sName, oDefaultData) {
            const oModel = new JSONModel(oDefaultData)
            this.getView().setModel(oModel, sName)
            this.getView().bindElement({
                model: sName,
                path: '/'
            })
            return oModel
        },

        _setViewModelData(sName, oModifier) {
            const oModel = this.getView().getModel(sName)
            return oModel.setData(typeof oModifier === 'function' ? oModifier(oModel.getData()) : oModifier)
        }
    };
    return Controller.extend("com.raprincis.demo.controller.Home", oHomeController);
});