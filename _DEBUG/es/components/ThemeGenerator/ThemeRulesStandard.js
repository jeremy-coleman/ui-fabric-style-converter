import { Shade } from '../../utilities/color/shades';
import { getColorFromString } from '../../utilities/color/colors';
import { mapEnumByName } from '../../Utilities';
export var BaseSlots;
(function (BaseSlots) {
    BaseSlots[BaseSlots["primaryColor"] = 0] = "primaryColor";
    BaseSlots[BaseSlots["backgroundColor"] = 1] = "backgroundColor";
    BaseSlots[BaseSlots["foregroundColor"] = 2] = "foregroundColor";
})(BaseSlots || (BaseSlots = {}));
export var FabricSlots;
(function (FabricSlots) {
    FabricSlots[FabricSlots["themePrimary"] = 0] = "themePrimary";
    FabricSlots[FabricSlots["themeLighterAlt"] = 1] = "themeLighterAlt";
    FabricSlots[FabricSlots["themeLighter"] = 2] = "themeLighter";
    FabricSlots[FabricSlots["themeLight"] = 3] = "themeLight";
    FabricSlots[FabricSlots["themeTertiary"] = 4] = "themeTertiary";
    FabricSlots[FabricSlots["themeSecondary"] = 5] = "themeSecondary";
    FabricSlots[FabricSlots["themeDarkAlt"] = 6] = "themeDarkAlt";
    FabricSlots[FabricSlots["themeDark"] = 7] = "themeDark";
    FabricSlots[FabricSlots["themeDarker"] = 8] = "themeDarker";
    FabricSlots[FabricSlots["neutralLighterAlt"] = 9] = "neutralLighterAlt";
    FabricSlots[FabricSlots["neutralLighter"] = 10] = "neutralLighter";
    FabricSlots[FabricSlots["neutralLight"] = 11] = "neutralLight";
    FabricSlots[FabricSlots["neutralQuaternaryAlt"] = 12] = "neutralQuaternaryAlt";
    FabricSlots[FabricSlots["neutralQuaternary"] = 13] = "neutralQuaternary";
    FabricSlots[FabricSlots["neutralTertiaryAlt"] = 14] = "neutralTertiaryAlt";
    FabricSlots[FabricSlots["neutralTertiary"] = 15] = "neutralTertiary";
    FabricSlots[FabricSlots["neutralSecondary"] = 16] = "neutralSecondary";
    FabricSlots[FabricSlots["neutralPrimaryAlt"] = 17] = "neutralPrimaryAlt";
    FabricSlots[FabricSlots["neutralPrimary"] = 18] = "neutralPrimary";
    FabricSlots[FabricSlots["neutralDark"] = 19] = "neutralDark";
    FabricSlots[FabricSlots["black"] = 20] = "black";
    FabricSlots[FabricSlots["white"] = 21] = "white";
})(FabricSlots || (FabricSlots = {}));
export var SemanticColorSlots;
(function (SemanticColorSlots) {
    SemanticColorSlots[SemanticColorSlots["bodyBackground"] = 0] = "bodyBackground";
    SemanticColorSlots[SemanticColorSlots["bodyText"] = 1] = "bodyText";
    SemanticColorSlots[SemanticColorSlots["disabledBackground"] = 2] = "disabledBackground";
    SemanticColorSlots[SemanticColorSlots["disabledText"] = 3] = "disabledText";
})(SemanticColorSlots || (SemanticColorSlots = {}));
export function themeRulesStandardCreator() {
    const slotRules = {};
    mapEnumByName(BaseSlots, (baseSlot) => {
        slotRules[baseSlot] = {
            name: baseSlot,
            isCustomized: true,
            dependentRules: []
        };
        mapEnumByName(Shade, (shadeName, shadeValue) => {
            if (shadeName === Shade[Shade.Unshaded]) {
                return;
            }
            const inherits = slotRules[baseSlot];
            const thisSlotRule = {
                name: baseSlot + shadeName,
                inherits: slotRules[baseSlot],
                asShade: shadeValue,
                isCustomized: false,
                isBackgroundShade: baseSlot === BaseSlots[BaseSlots.backgroundColor] ? true : false,
                dependentRules: []
            };
            slotRules[baseSlot + shadeName] = thisSlotRule;
            inherits.dependentRules.push(thisSlotRule);
            return void 0;
        });
        return void 0;
    });
    slotRules[BaseSlots[BaseSlots.primaryColor]].color = getColorFromString('#0078d4');
    slotRules[BaseSlots[BaseSlots.backgroundColor]].color = getColorFromString('#fff');
    slotRules[BaseSlots[BaseSlots.foregroundColor]].color = getColorFromString('#333');
    slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade1]].color = getColorFromString('#eff6fc');
    slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade2]].color = getColorFromString('#deecf9');
    slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade3]].color = getColorFromString('#c7e0f4');
    slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade4]].color = getColorFromString('#71afe5');
    slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade5]].color = getColorFromString('#2b88d8');
    slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade6]].color = getColorFromString('#106ebe');
    slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade7]].color = getColorFromString('#005a9e');
    slotRules[BaseSlots[BaseSlots.primaryColor] + Shade[Shade.Shade8]].color = getColorFromString('#004578');
    slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade1]].color = getColorFromString('#eaeaea');
    slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade2]].color = getColorFromString('#c8c8c8');
    slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade3]].color = getColorFromString('#a6a6a6');
    slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade4]].color = getColorFromString('#767676');
    slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade5]].color = getColorFromString('#666666');
    slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade6]].color = getColorFromString('#3c3c3c');
    slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade7]].color = getColorFromString('#212121');
    slotRules[BaseSlots[BaseSlots.foregroundColor] + Shade[Shade.Shade8]].color = getColorFromString('#000000');
    function _makeFabricSlotRule(slotName, inheritedBase, inheritedShade, isBackgroundShade = false) {
        const inherits = slotRules[BaseSlots[inheritedBase]];
        const thisSlotRule = {
            name: slotName,
            inherits: inherits,
            asShade: inheritedShade,
            isCustomized: false,
            isBackgroundShade: isBackgroundShade,
            dependentRules: []
        };
        slotRules[slotName] = thisSlotRule;
        inherits.dependentRules.push(thisSlotRule);
    }
    _makeFabricSlotRule(FabricSlots[FabricSlots.themePrimary], BaseSlots.primaryColor, Shade.Unshaded);
    _makeFabricSlotRule(FabricSlots[FabricSlots.themeLighterAlt], BaseSlots.primaryColor, Shade.Shade1);
    _makeFabricSlotRule(FabricSlots[FabricSlots.themeLighter], BaseSlots.primaryColor, Shade.Shade2);
    _makeFabricSlotRule(FabricSlots[FabricSlots.themeLight], BaseSlots.primaryColor, Shade.Shade3);
    _makeFabricSlotRule(FabricSlots[FabricSlots.themeTertiary], BaseSlots.primaryColor, Shade.Shade4);
    _makeFabricSlotRule(FabricSlots[FabricSlots.themeSecondary], BaseSlots.primaryColor, Shade.Shade5);
    _makeFabricSlotRule(FabricSlots[FabricSlots.themeDarkAlt], BaseSlots.primaryColor, Shade.Shade6);
    _makeFabricSlotRule(FabricSlots[FabricSlots.themeDark], BaseSlots.primaryColor, Shade.Shade7);
    _makeFabricSlotRule(FabricSlots[FabricSlots.themeDarker], BaseSlots.primaryColor, Shade.Shade8);
    _makeFabricSlotRule(FabricSlots[FabricSlots.neutralLighterAlt], BaseSlots.backgroundColor, Shade.Shade1, true);
    _makeFabricSlotRule(FabricSlots[FabricSlots.neutralLighter], BaseSlots.backgroundColor, Shade.Shade2, true);
    _makeFabricSlotRule(FabricSlots[FabricSlots.neutralLight], BaseSlots.backgroundColor, Shade.Shade3, true);
    _makeFabricSlotRule(FabricSlots[FabricSlots.neutralQuaternaryAlt], BaseSlots.backgroundColor, Shade.Shade4, true);
    _makeFabricSlotRule(FabricSlots[FabricSlots.neutralQuaternary], BaseSlots.backgroundColor, Shade.Shade5, true);
    _makeFabricSlotRule(FabricSlots[FabricSlots.neutralTertiaryAlt], BaseSlots.backgroundColor, Shade.Shade6, true);
    _makeFabricSlotRule(FabricSlots[FabricSlots.neutralTertiary], BaseSlots.foregroundColor, Shade.Shade3);
    _makeFabricSlotRule(FabricSlots[FabricSlots.neutralSecondary], BaseSlots.foregroundColor, Shade.Shade4);
    _makeFabricSlotRule(FabricSlots[FabricSlots.neutralPrimaryAlt], BaseSlots.foregroundColor, Shade.Shade5);
    _makeFabricSlotRule(FabricSlots[FabricSlots.neutralPrimary], BaseSlots.foregroundColor, Shade.Unshaded);
    _makeFabricSlotRule(FabricSlots[FabricSlots.neutralDark], BaseSlots.foregroundColor, Shade.Shade7);
    _makeFabricSlotRule(FabricSlots[FabricSlots.black], BaseSlots.foregroundColor, Shade.Shade8);
    _makeFabricSlotRule(FabricSlots[FabricSlots.white], BaseSlots.backgroundColor, Shade.Unshaded, true);
    slotRules[FabricSlots[FabricSlots.themeLighterAlt]].color = getColorFromString('#eff6fc');
    slotRules[FabricSlots[FabricSlots.themeLighter]].color = getColorFromString('#deecf9');
    slotRules[FabricSlots[FabricSlots.themeLight]].color = getColorFromString('#c7e0f4');
    slotRules[FabricSlots[FabricSlots.themeTertiary]].color = getColorFromString('#71afe5');
    slotRules[FabricSlots[FabricSlots.themeSecondary]].color = getColorFromString('#2b88d8');
    slotRules[FabricSlots[FabricSlots.themeDarkAlt]].color = getColorFromString('#106ebe');
    slotRules[FabricSlots[FabricSlots.themeDark]].color = getColorFromString('#005a9e');
    slotRules[FabricSlots[FabricSlots.themeDarker]].color = getColorFromString('#004578');
    slotRules[FabricSlots[FabricSlots.themeLighterAlt]].isCustomized = true;
    slotRules[FabricSlots[FabricSlots.themeLighter]].isCustomized = true;
    slotRules[FabricSlots[FabricSlots.themeLight]].isCustomized = true;
    slotRules[FabricSlots[FabricSlots.themeTertiary]].isCustomized = true;
    slotRules[FabricSlots[FabricSlots.themeSecondary]].isCustomized = true;
    slotRules[FabricSlots[FabricSlots.themeDarkAlt]].isCustomized = true;
    slotRules[FabricSlots[FabricSlots.themeDark]].isCustomized = true;
    slotRules[FabricSlots[FabricSlots.themeDarker]].isCustomized = true;
    return slotRules;
}
