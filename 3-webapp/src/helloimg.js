const img = "iVBORw0KGgoAAAANSUhEUgAAAJYAAAAyBAMAAABMoj8pAAAAG1BMVEX/AAD/////Hx//v7//39//f3//X1//Pz//n59WTf5vAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAkUlEQVRIiWNgGAWjYBSMglEwCpgEIDSjgtDwNUvI0IghxA1sFpCizCyRMGMOt8ACoFlsYoEFlJklxlCiWMDaADSLJYGjgTKzhBgUSxjYHYBmMSqwO1BmlgCDYqKgoADQLEV4RFBgVoqSkgK13FWowNZAlfACmsVsFhJAlXgEmsXU4spAjfQ1CkbBKBgFo4BUAAD0thLOE0NVLQAAAABJRU5ErkJggg=="

function main(args) {
    return {
        "body": img,
        "headers": {
            "Content-Type": "image/png"
        }
    }
}