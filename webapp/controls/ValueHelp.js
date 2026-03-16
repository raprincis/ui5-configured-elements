sap.ui.define(
    ["sap/ui/comp/valuehelpdialog/ValueHelpDialog"],
    (ValueHelpDialog) => {

        const oConfiguredVh = {
            renderer : {
                apiVarsion: 2
            }
        }

        return ValueHelpDialog.extend("com.raprincis.demo.controls.ValueHelp", oConfiguredVh)
    })