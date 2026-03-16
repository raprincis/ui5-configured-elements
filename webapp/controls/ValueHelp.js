sap.ui.define(
    [
        "sap/ui/comp/valuehelpdialog/ValueHelpDialog",
        "sap/ui/comp/filterbar/FilterBar",
        "sap/ui/comp/filterbar/FilterGroupItem",
        "sap/ui/table/Column",
        "sap/m/Label",
        "sap/m/Text",
        "sap/m/Input",
        'sap/ui/model/Filter',
        'sap/ui/model/FilterOperator',
    ],
    (ValueHelpDialog, FilterBar, FilterGroupItem, UIColumn, Label, Text, Input, Filter, FilterOperator) => {


        const oFilterUtils = {
            Contains: (path, value) => new Filter({ path, operator: FilterOperator.Contains, value1: value })
        }

        const oConfiguredVh = {
            metadata: {
                properties: {
                    configuration: {
                        type: "object",
                        defaultValue: {}
                    }
                }
            },

            _oBinding: null,

            init() {
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
                const { name, newValue } = oEvent.getParameters()

                if (name === 'configuration') {
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
             * @param {ValueHelpConfiguration} oConfiguration 
             */
            async _applyConfiguration(oConfiguration) {
                const oTable = await this.getTableAsync()
                const { binding, columns, ...oVhConfig } = oConfiguration

                //Vh
                this.applySettings(oVhConfig)

                // Filter Bar
                this.setFilterBar(this._createFilterBar(columns))

                if (oTable.bindRows) {
                    // Bind rows to the ODataModel and add columns
                    oTable.bindAggregation("rows", binding)

                    

                    columns.map(oVhColumnConfiguration => this._mapVhConfiguration2Column(oVhColumnConfiguration))
                        .forEach((oUiColumn) => {
                            oTable.addColumn(oUiColumn)
                        })
                }
            },

            /**
             * @param {ValueHelpColumnConfiguration} oVhColumnConfiguration 
             */
            _mapVhConfiguration2Column(oVhColumnConfiguration) {
                const { template, label, name : fieldName,width } = oVhColumnConfiguration

                const sTemplate = template ? template: `{${fieldName}}`

                const oColumn = new UIColumn({
                    label: new Label({ text: label }),
                    template: new Text({ wrapping: false, text: sTemplate })
                })

                if(width) {
                    oColumn.setWidth(width)
                }
                
                oColumn.data({ fieldName })

                return oColumn
                
            },

            /**
             * @param {ValueHelpColumnConfiguration[]} aVhColumnsConfiguration 
             */
            _createFilterBar(aVhColumnsConfiguration) {

                return new FilterBar({
                    filterGroupItems: aVhColumnsConfiguration.map(oConfig => {
                        const { name, label } = oConfig
                        return new FilterGroupItem({
                            groupName: "__$INTERNAL$",
                            name,
                            label,
                            visibleInFilterBar: true,
                            control: new Input({ name })
                        })
                    })
                }).attachSearch(this._onFilterbarSearch, this)

            },

            async _onFilterbarSearch(oEvent) {
                /** @type {{ selectionSet : Array<{ getValue : () => string, getName: () => string }>}} */
                const { selectionSet } = oEvent.getParameters()

                const aFilters = selectionSet
                    .map(oControl => ({
                        name: oControl.getName(),
                        value: oControl.getValue()
                    }))
                    .filter(oSearchCriteria => oSearchCriteria.value !== undefined && oSearchCriteria.value.length > 0)
                    .reduce((aFilters, oSearchCriteria) => {
                        return [...aFilters, oFilterUtils.Contains(oSearchCriteria.name, oSearchCriteria.value)]
                    }, [])
                
                const oTable = await this.getTableAsync()
                oTable.getBinding("rows").filter(aFilters)
            },

            renderer: {
                apiVarsion: 2
            }
        }

        return ValueHelpDialog.extend("com.raprincis.demo.controls.ValueHelp", oConfiguredVh)
    })